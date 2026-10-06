"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { SCENES, type SceneId } from "@/src/config/scenes";
import CameraRig from "./CameraRig";
import DeveloperRoom from "./DeveloperRoom";

export default function PortfolioCanvas({ progress, activeScene }: { progress: RefObject<number>; activeScene: SceneId }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return <Canvas
    frameloop={reduceMotion ? "demand" : "always"}
    dpr={[1, 1.5]}
    camera={{ position: [...SCENES[0].cameraPosition], fov: 42, near: 0.1, far: 60 }}
    gl={{ antialias: true, powerPreference: "low-power" }}
    shadows={false}
    aria-hidden="true"
    onCreated={({ camera }) => camera.lookAt(...SCENES[0].cameraTarget)}
  >
    <color attach="background" args={["#0c1927"]} />
    <ambientLight intensity={1.5} />
    <hemisphereLight args={["#9fd4e4", "#162636", 1.7]} />
    <directionalLight position={[4, 7, 5]} intensity={2.2} />
    <DeveloperRoom animate={!reduceMotion} />
    <CameraRig progress={progress} activeScene={activeScene} reduceMotion={reduceMotion} />
  </Canvas>;
}
