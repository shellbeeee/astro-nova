import { Component, Suspense, useEffect, useMemo, useRef, useState, type ComponentRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Spherical } from "three";
import { prepareRoverModel } from "@/lib/rover-model";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

class ViewerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  override render() {
    return this.state.failed
      ? <p role="status" className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">The 3D rover could not load. Please reopen this popup to try again.</p>
      : this.props.children;
  }
}

function RoverModel({ url, onReady }: { url: string; onReady: () => void }) {
  const invalidate = useThree((state) => state.invalidate);
  const { scene, animations } = useGLTF(url);
  const { model } = useMemo(() => prepareRoverModel(scene, animations), [scene, animations]);
  useEffect(() => {
    invalidate();
    const nodes: { name: string; type: string; parent: string }[] = [];
    scene.traverse((node) => nodes.push({ name: node.name || "(unnamed)", type: node.type, parent: node.parent?.name || "(scene)" }));
    console.group("Rover GLB inspection");
    console.log("All node names", nodes);
    console.table(nodes);
    console.log("Animation clips", animations.map((clip) => ({ name: clip.name, duration: clip.duration, tracks: clip.tracks.map((track) => track.name) })));
    console.table(animations.map((clip) => ({ name: clip.name, duration: clip.duration })));
    console.log("White box meshes hidden", (() => { const hidden: string[] = []; model.traverse((node) => { if (!node.visible) hidden.push(node.name); }); return hidden; })());
    console.groupEnd();
  }, [scene, animations, model, invalidate]);
  const drawn = useRef(false);
  useFrame(() => {
    if (!drawn.current) {
      drawn.current = true;
      onReady();
    }
  });
  return <primitive object={model} />;
}

function ViewerControls() {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, gl, invalidate } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const onKey = (event: KeyboardEvent) => {
      const orbit = controls.current;
      if (!orbit || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-"].includes(event.key)) return;
      event.preventDefault();
      const spherical = new Spherical().setFromVector3(camera.position.clone().sub(orbit.target));
      if (event.key === "ArrowLeft") spherical.theta -= 0.15;
      if (event.key === "ArrowRight") spherical.theta += 0.15;
      if (event.key === "ArrowUp") spherical.phi -= 0.15;
      if (event.key === "ArrowDown") spherical.phi += 0.15;
      if (event.key === "+" || event.key === "=") spherical.radius *= 0.9;
      if (event.key === "-") spherical.radius /= 0.9;
      spherical.radius = Math.max(2.1, Math.min(9, spherical.radius));
      spherical.makeSafe();
      camera.position.setFromSpherical(spherical).add(orbit.target);
      orbit.update();
      invalidate();
    };
    canvas.addEventListener("keydown", onKey);
    return () => canvas.removeEventListener("keydown", onKey);
  }, [camera, gl, invalidate]);
  return <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={2.1} maxDistance={9} zoomSpeed={0.6} onChange={() => {
    gl.domElement.dataset["cameraPosition"] = camera.position.toArray().join(",");
  }} />;
}

export default function RoverViewer({ url, name }: { url: string; name: string }) {
  const [ready, setReady] = useState(false);
  const [version, setVersion] = useState(0);
  return (
    <div className="relative h-64 min-w-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-80" data-scene-ready={ready || undefined} aria-label={`${name} interactive 3D model`}>
      <ViewerBoundary key={version}>
        <Canvas frameloop={ready ? "demand" : "always"} dpr={[1, 1.5]} camera={{ position: [3, 2.4, 3.5], fov: 40 }} fallback={<p className="p-6 text-muted-foreground">3D viewing is not available in this browser.</p>} onCreated={({ gl }) => {
          gl.domElement.tabIndex = 0;
          gl.domElement.setAttribute("aria-label", `${name} 3D rover. Drag to rotate, scroll or pinch to zoom. Keyboard: arrow keys rotate, plus and minus zoom.`);
        }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 4]} intensity={2} />
          <Environment resolution={128}>
            <Lightformer intensity={2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} />
            <Lightformer intensity={1.5} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[10, 10, 1]} />
          </Environment>
          <Suspense fallback={null}><RoverModel url={url} onReady={() => setReady(true)} /></Suspense>
          <ViewerControls />
        </Canvas>
      </ViewerBoundary>
      {!ready && <p className="pointer-events-none absolute bottom-3 left-3 text-sm text-muted-foreground" role="status">Loading rover…</p>}
      <Button variant="secondary" size="icon" title="Reset 3D view" aria-label="Reset 3D view" className="absolute right-3 top-3" onClick={() => { setReady(false); setVersion((value) => value + 1); }}><RotateCcw className="size-4" /></Button>
    </div>
  );
}