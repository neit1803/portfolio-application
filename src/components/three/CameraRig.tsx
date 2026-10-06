"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Vector3 } from "three";
import { cameraPoseAt, SCENES, type SceneId } from "@/src/config/scenes";

export default function CameraRig({ progress, activeScene, reduceMotion }: {
  progress: RefObject<number>;
  activeScene: SceneId;
  reduceMotion: boolean;
}) {
  const { invalidate } = useThree();
  const target = useRef(new Vector3(...SCENES[0].cameraTarget));
  const desiredPosition = useRef(new Vector3());
  const desiredTarget = useRef(new Vector3());

  useEffect(() => {
    if (reduceMotion) invalidate();
  }, [activeScene, reduceMotion, invalidate]);

  useFrame(({ camera }, delta) => {
    const pose = reduceMotion
      ? cameraPoseAt(SCENES.find((scene) => scene.id === activeScene)?.progress ?? 0)
      : cameraPoseAt(progress.current);
    desiredPosition.current.set(...pose.position);
    desiredTarget.current.set(...pose.target);
    if (reduceMotion) {
      camera.position.copy(desiredPosition.current);
      target.current.copy(desiredTarget.current);
    } else {
      const blend = 1 - Math.exp(-Math.min(delta, 0.05) * 4);
      camera.position.lerp(desiredPosition.current, blend);
      target.current.lerp(desiredTarget.current, blend);
    }
    camera.lookAt(target.current);
  });
  return null;
}
