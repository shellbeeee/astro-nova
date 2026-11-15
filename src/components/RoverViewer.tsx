import { Component, Suspense, useEffect, useMemo, useRef, useState, type ComponentRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Spherical, Vector3 } from "three";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

class ViewerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <p role="status" className="flex h-full items-center justify-center p-6 text-center text-muted-foreground">The 3D rover could not load. Please reopen this popup to try again.</p>
      : this.props.children;
  }
}

function RoverModel({ url, onReady }: { url: string; onReady: () => void }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => {
    const copy = scene.clone(true);
    const bounds = new Box3().setFromObject(copy);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = 2.6 / Math.max(size.x, size.y, size.z, 0.001);
    copy.scale.multiplyScalar(scale);
    copy.position.addScaledVector(center, -scale);
    return copy;
  }, [scene]);
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
    gl.domElement.dataset.cameraPosition = camera.position.toArray().join(",");
  }} />;
}

export default function RoverViewer({ url, name }: { url: string; name: string }) {
  const [ready, setReady] = useState(false);
  const [version, setVersion] = useState(0);
  return (
    <div className="relative h-64 min-w-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-80" data-scene-ready={ready || undefined} aria-label={`${name} interactive 3D model`}>
      <ViewerBoundary key={version}>
        <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [3, 2.4, 3.5], fov: 40 }} fallback={<p className="p-6 text-muted-foreground">3D viewing is not available in this browser.</p>} onCreated={({ gl }) => {
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