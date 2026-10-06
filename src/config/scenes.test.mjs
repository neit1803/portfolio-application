import assert from "node:assert/strict";
import test from "node:test";
import { SCENES, cameraPoseAt, sceneAt } from "./scenes.ts";

test("camera poses match every configured scene and clamp out-of-range progress", () => {
  for (const scene of SCENES) {
    assert.deepEqual(cameraPoseAt(scene.progress), {
      position: scene.cameraPosition,
      target: scene.cameraTarget,
    });
  }
  assert.deepEqual(cameraPoseAt(-1), cameraPoseAt(0));
  assert.deepEqual(cameraPoseAt(2), cameraPoseAt(1));
});

test("camera and active scene advance across the five scroll frames", () => {
  const midpoint = cameraPoseAt(0.125);
  assert.equal(midpoint.position[0], (SCENES[0].cameraPosition[0] + SCENES[1].cameraPosition[0]) / 2);
  assert.equal(sceneAt(0.52).id, "projects");
  assert.equal(sceneAt(0.78).id, "skills");
  assert.equal(sceneAt(1).id, "contact");
});
