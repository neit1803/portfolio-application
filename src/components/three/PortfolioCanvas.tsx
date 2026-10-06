"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import DeveloperRoom from "./DeveloperRoom";

export default function PortfolioCanvas() {
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
    camera={{ position: [4.6, 3.1, 6.5], fov: 42, near: 0.1, far: 60 }}
    gl={{ antialias: true, powerPreference: "low-power" }}
    shadows={false}
    aria-hidden="true"
    onCreated={({ camera }) => camera.lookAt(0, -0.2, -0.35)}
  >
    <color attach="background" args={["#0c1927"]} />
    <ambientLight intensity={1.5} />
    <hemisphereLight args={["#9fd4e4", "#162636", 1.7]} />
    <directionalLight position={[4, 7, 5]} intensity={2.2} />
    <DeveloperRoom animate={!reduceMotion} />
  </Canvas>;
}
