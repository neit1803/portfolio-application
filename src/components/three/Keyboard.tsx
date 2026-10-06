"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, MathUtils, SRGBColorSpace, type Mesh } from "three";
import { KEYBOARD_KEYS, type SkillKeyAssignment } from "@/src/config/keyboard";
import type { Skill } from "@/src/lib/portfolio/portfolio.types";

function KeyLabel({ label }: { label: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, 64, 64);
      context.fillStyle = "#20343d";
      context.font = "bold 34px Arial, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, 32, 35);
    }
    const result = new CanvasTexture(canvas);
    result.colorSpace = SRGBColorSpace;
    return result;
  }, [label]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={[0, 0.029, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[0.075, 0.075]} />
    <meshBasicMaterial map={texture} transparent depthWrite={false} />
  </mesh>;
}

export default function Keyboard({ assignments, selectedSkillId, interactive, reduceMotion, onHoverSkill, onSelectSkill }: {
  assignments: readonly SkillKeyAssignment[];
  selectedSkillId: string | null;
  interactive: boolean;
  reduceMotion: boolean;
  onHoverSkill: (skill: Skill | null) => void;
  onSelectSkill: (id: string) => void;
}) {
  const [hoveredKeyId, setHoveredKeyId] = useState<string | null>(null);
  const keyMeshes = useRef(new Map<string, Mesh>());
  const assigned = useMemo(() => new Map(assignments.map(({ keyId, skill }) => [keyId, skill])), [assignments]);
  const selectedKeyId = assignments.find(({ skill }) => skill.id === selectedSkillId)?.keyId;

  useFrame((_, delta) => {
    for (const key of KEYBOARD_KEYS) {
      const mesh = keyMeshes.current.get(key.id);
      if (!mesh) continue;
      const raised = interactive && (key.id === hoveredKeyId || key.id === selectedKeyId);
      const target = raised ? 0.105 : 0.075;
      mesh.position.y = reduceMotion ? target : MathUtils.damp(mesh.position.y, target, 15, delta);
    }
  });

  return <group position={[0.4, -0.35, 0.54]}>
    <mesh castShadow>
      <boxGeometry args={[1.65, 0.085, 0.66]} />
      <meshStandardMaterial color="#151e2b" metalness={0.35} roughness={0.5} />
    </mesh>
    {KEYBOARD_KEYS.map((key) => {
      const skill = assigned.get(key.id);
      const raised = interactive && (key.id === hoveredKeyId || key.id === selectedKeyId);
      const color = skill ? (raised ? "#9cf5d8" : "#66cbbb") : "#d0d9dc";
      return <mesh key={key.id} name={`Key_${key.row}_${key.column}`}
        ref={(mesh) => { if (mesh) keyMeshes.current.set(key.id, mesh); else keyMeshes.current.delete(key.id); }}
        userData={{ keyboardKey: key.id, skillId: skill?.id }}
        position={[key.x, 0.075, key.z]} castShadow
        onPointerOver={(event) => {
          if (!interactive || !skill) return;
          event.stopPropagation();
          setHoveredKeyId(key.id);
          onHoverSkill(skill);
        }}
        onPointerOut={(event) => {
          if (!interactive || !skill) return;
          event.stopPropagation();
          setHoveredKeyId(null);
          onHoverSkill(null);
        }}
        onClick={(event) => {
          if (!interactive || !skill) return;
          event.stopPropagation();
          onSelectSkill(skill.id);
        }}>
        <boxGeometry args={[0.105, 0.055, 0.108]} />
        <meshStandardMaterial color={color} roughness={0.45} emissive={raised ? "#1a8a73" : "#000000"} emissiveIntensity={raised ? 0.18 : 0} />
        <KeyLabel label={key.label} />
      </mesh>;
    })}
  </group>;
}
