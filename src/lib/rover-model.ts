import { AnimationMixer, Box3, Group, LoopOnce, Mesh, Vector3, type AnimationClip, type Object3D } from "three";

// Exact decoded helper mesh names from the uploaded GLB, not its animated pivot groups.
export function isRoverHelperBox(name: string) {
  return /^(Cube000_1|Cube022_1|Cube014|Cube025_1_instance_\d+|Cube062_instance_\d+|Cube057_instance_\d+)$/.test(name);
}

export function prepareRoverModel(scene: Object3D, animations: AnimationClip[]) {
  const copy = scene.clone(true);
  const mixer = new AnimationMixer(copy);
  const actions = animations.map((clip) => {
    const action = mixer.clipAction(clip);
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();
    action.time = clip.duration;
    return action;
  });
  // Apply every part's final keyframe before pausing; clips animate separate pivots.
  mixer.update(0);
  actions.forEach((action) => { action.paused = true; });
  copy.traverse((node) => {
    if (node instanceof Mesh && isRoverHelperBox(node.name)) node.visible = false;
  });
  copy.updateMatrixWorld(true);
  const bounds = new Box3();
  copy.traverseVisible((node) => {
    if (node instanceof Mesh) bounds.expandByObject(node);
  });
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const scale = 2.6 / Math.max(size.x, size.y, size.z, 0.001);
  // Normalize on a wrapper so the animated root's final transform stays intact.
  const model = new Group();
  model.add(copy);
  model.scale.setScalar(scale);
  model.position.copy(center).multiplyScalar(-scale);
  return { model, mixer, actions };
}