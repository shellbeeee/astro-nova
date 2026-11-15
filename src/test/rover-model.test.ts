import { describe, expect, it } from "vitest";
import { AnimationClip, BoxGeometry, Group, Mesh, VectorKeyframeTrack } from "three";
import { prepareRoverModel } from "@/lib/rover-model";

describe("uploaded rover preparation", () => {
  it("applies each animation's last frame and pauses without changing the cached model", () => {
    const scene = new Group();
    const body = new Mesh(new BoxGeometry());
    body.name = "body";
    scene.add(body);
    const clip = new AnimationClip("deployment", 2, [new VectorKeyframeTrack("body.position", [0, 2], [0, 0, 0, 0, 3, 0])]);
    const { model, mixer, actions } = prepareRoverModel(scene, [clip]);
    expect(model.getObjectByName("body")?.position.y).toBe(3);
    expect(actions[0]?.time).toBe(2);
    expect(actions[0]?.paused).toBe(true);
    mixer.update(5);
    expect(model.getObjectByName("body")?.position.y).toBe(3);
    expect(body.position.y).toBe(0);
  });

  it("hides the white helper meshes but preserves animated cube pivots and equipment", () => {
    const scene = new Group();
    for (const name of ["Cube000_1", "Cube025_1_instance_0", "Cube014", "Cube000", "mast_cam"]) {
      const node = name === "Cube000" ? new Group() : new Mesh(new BoxGeometry());
      node.name = name;
      scene.add(node);
    }
    const { model } = prepareRoverModel(scene, []);
    expect(model.getObjectByName("Cube000_1")?.visible).toBe(false);
    expect(model.getObjectByName("Cube025_1_instance_0")?.visible).toBe(false);
    expect(model.getObjectByName("Cube014")?.visible).toBe(false);
    expect(model.getObjectByName("Cube000")?.visible).toBe(true);
    expect(model.getObjectByName("mast_cam")?.visible).toBe(true);
    expect(scene.getObjectByName("Cube000_1")?.visible).toBe(true);
  });
});