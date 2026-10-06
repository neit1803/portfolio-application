"use client";

import { useFrame } from "@react-three/fiber";
import { memo, useRef } from "react";
import { Quaternion, Vector3, type Group } from "three";
import type { SkillKeyAssignment } from "@/src/config/keyboard";
import type { Skill } from "@/src/lib/portfolio/portfolio.types";
import Keyboard from "./Keyboard";

const wall = "#1b2b3d";
const steel = "#31465c";
const wood = "#685345";
const trim = "#9db4c4";

function Room() {
  return <group>
    <mesh position={[0, -1.55, 0]} receiveShadow>
      <boxGeometry args={[8.5, 0.18, 7]} />
      <meshStandardMaterial color="#263545" roughness={0.85} />
    </mesh>
    <mesh position={[0, 0.68, -3.55]} receiveShadow>
      <boxGeometry args={[8.5, 4.3, 0.16]} />
      <meshStandardMaterial color={wall} roughness={0.95} />
    </mesh>
    <mesh position={[-4.18, 0.68, 0]} receiveShadow>
      <boxGeometry args={[0.16, 4.3, 7]} />
      <meshStandardMaterial color="#172737" roughness={0.95} />
    </mesh>
    <mesh position={[0, -1.36, -3.43]}>
      <boxGeometry args={[8.3, 0.1, 0.1]} />
      <meshStandardMaterial color={trim} />
    </mesh>
    <mesh position={[-4.04, -1.36, 0]}>
      <boxGeometry args={[0.1, 0.1, 6.8]} />
      <meshStandardMaterial color={trim} />
    </mesh>
  </group>;
}

function Desk() {
  return <group>
    <mesh position={[0, -0.48, 0.15]} castShadow receiveShadow>
      <boxGeometry args={[4.1, 0.16, 1.9]} />
      <meshStandardMaterial color={wood} roughness={0.7} />
    </mesh>
    {[-1.75, 1.75].flatMap((x) => [-0.55, 0.85].map((z) => <mesh key={`${x}-${z}`} position={[x, -1.05, z]} castShadow>
      <boxGeometry args={[0.13, 1.04, 0.13]} />
      <meshStandardMaterial color={steel} metalness={0.45} roughness={0.45} />
    </mesh>))}
  </group>;
}

function Monitor() {
  return <group position={[-0.9, 0.17, -0.35]}>
    <mesh castShadow>
      <boxGeometry args={[1.8, 1.08, 0.1]} />
      <meshStandardMaterial color="#0b111b" metalness={0.25} />
    </mesh>
    <mesh position={[0, 0, 0.057]}>
      <planeGeometry args={[1.65, 0.91]} />
      <meshStandardMaterial color="#0b2636" emissive="#0b5962" emissiveIntensity={0.55} toneMapped={false} />
    </mesh>
    {[0.29, 0.12, -0.05, -0.22].map((y, index) => <mesh key={y} position={[-0.18, y, 0.061]}>
      <planeGeometry args={[index === 2 ? 0.95 : 1.12, 0.035]} />
      <meshBasicMaterial color={index === 2 ? "#f1b76b" : "#42d4b0"} />
    </mesh>)}
    <mesh position={[0, -0.7, -0.04]} castShadow>
      <boxGeometry args={[0.11, 0.38, 0.1]} />
      <meshStandardMaterial color={steel} metalness={0.5} />
    </mesh>
    <mesh position={[0, -0.91, 0.03]}>
      <boxGeometry args={[0.55, 0.04, 0.38]} />
      <meshStandardMaterial color={steel} metalness={0.5} />
    </mesh>
    <pointLight color="#31d6ca" intensity={1.2} distance={3.2} position={[0, 0, 0.55]} />
  </group>;
}

function Chair() {
  return <group position={[0.65, -0.99, -1.13]}>
    <mesh castShadow>
      <boxGeometry args={[0.9, 0.16, 0.75]} />
      <meshStandardMaterial color="#183241" />
    </mesh>
    <mesh position={[0, 0.5, -0.4]} castShadow>
      <boxGeometry args={[0.92, 1.13, 0.15]} />
      <meshStandardMaterial color="#183241" />
    </mesh>
    <mesh position={[0, -0.31, 0]}>
      <cylinderGeometry args={[0.07, 0.07, 0.5, 8]} />
      <meshStandardMaterial color={steel} />
    </mesh>
  </group>;
}

function Limb({ from, to, color, radius }: { from: [number, number, number]; to: [number, number, number]; color: string; radius: number }) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const direction = end.clone().sub(start);
  const midpoint = start.clone().add(end).multiplyScalar(0.5);
  const rotation = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
  return <mesh position={midpoint} quaternion={rotation} castShadow>
    <capsuleGeometry args={[radius, Math.max(0, direction.length() - radius * 2), 4, 8]} />
    <meshStandardMaterial color={color} roughness={0.85} />
  </mesh>;
}

function Developer({ animate }: { animate: boolean }) {
  const leftForearm = useRef<Group>(null);
  const rightForearm = useRef<Group>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!animate) {
      if (leftForearm.current) leftForearm.current.rotation.x = 0;
      if (rightForearm.current) rightForearm.current.rotation.x = 0;
      return;
    }
    elapsed.current += delta;
    const beat = Math.sin(elapsed.current * 7) * 0.045;
    if (leftForearm.current) leftForearm.current.rotation.x = beat;
    if (rightForearm.current) rightForearm.current.rotation.x = -beat;
  });
  return <group position={[0.65, -0.15, -1.17]}>
    <mesh position={[0, 0.22, 0]} castShadow>
      <capsuleGeometry args={[0.31, 0.55, 5, 10]} />
      <meshStandardMaterial color="#54798b" roughness={0.9} />
    </mesh>
    <mesh position={[0, 0.91, 0.02]} castShadow>
      <sphereGeometry args={[0.25, 16, 12]} />
      <meshStandardMaterial color="#b78e74" roughness={0.95} />
    </mesh>
    <mesh position={[0, 1.07, -0.02]} castShadow>
      <sphereGeometry args={[0.252, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
      <meshStandardMaterial color="#18222e" />
    </mesh>
    {[-0.35, 0.35].map((x, i) => <group key={x}>
      <Limb from={[x * 0.8, 0.5, 0.08]} to={[x, 0.25, 0.64]} color="#54798b" radius={0.11} />
      <group ref={i === 0 ? leftForearm : rightForearm} position={[x, 0.25, 0.64]}>
        <Limb from={[0, 0, 0]} to={[0, -0.29, 0.8]} color="#b78e74" radius={0.08} />
        <mesh position={[0, -0.29, 0.8]} castShadow>
          <sphereGeometry args={[0.09, 10, 8]} />
          <meshStandardMaterial color="#b78e74" roughness={0.85} />
        </mesh>
      </group>
    </group>)}
    {[-0.2, 0.2].map((x) => <mesh key={x} position={[x, -0.72, 0.34]} rotation={[1.25, 0, 0]} castShadow>
      <capsuleGeometry args={[0.13, 0.52, 4, 8]} />
      <meshStandardMaterial color="#263546" />
    </mesh>)}
  </group>;
}

function Mouse() {
  return <mesh position={[1.57, -0.33, 0.55]} scale={[0.13, 0.055, 0.22]} castShadow>
    <sphereGeometry args={[1, 12, 8]} />
    <meshStandardMaterial color="#c9d3d8" />
  </mesh>;
}

const StaticWorkspace = memo(function StaticWorkspace({ animate }: { animate: boolean }) {
  return <group>
    <Room /><Desk /><Chair /><Developer animate={animate} /><Monitor /><Mouse />
    <mesh position={[2.35, -1.39, -2.5]}>
      <cylinderGeometry args={[0.28, 0.28, 0.22, 12]} />
      <meshStandardMaterial color="#4c6653" />
    </mesh>
  </group>;
});

export default function DeveloperRoom({ animate = true, assignments, selectedSkillId, interactive, onHoverSkill, onSelectSkill }: {
  animate?: boolean;
  assignments: readonly SkillKeyAssignment[];
  selectedSkillId: string | null;
  interactive: boolean;
  onHoverSkill: (skill: Skill | null) => void;
  onSelectSkill: (id: string) => void;
}) {
  return <group>
    <StaticWorkspace animate={animate} />
    <Keyboard assignments={assignments} selectedSkillId={selectedSkillId} interactive={interactive} reduceMotion={!animate}
      onHoverSkill={onHoverSkill} onSelectSkill={onSelectSkill} />
  </group>;
}
