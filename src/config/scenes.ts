export type Point3 = readonly [number, number, number];

export const SCENES = [
  { id: "hero", label: "Giới thiệu", progress: 0, cameraPosition: [4.6, 3.1, 6.5], cameraTarget: [0, -0.2, -0.35] },
  { id: "experience", label: "Kinh nghiệm", progress: 0.25, cameraPosition: [1.15, 1.45, 2.5], cameraTarget: [-0.9, 0.08, -0.35] },
  { id: "projects", label: "Dự án", progress: 0.5, cameraPosition: [3.4, 1.8, 1.65], cameraTarget: [0.4, -0.15, 0] },
  { id: "skills", label: "Kỹ năng", progress: 0.75, cameraPosition: [1.0, 1.35, 2.7], cameraTarget: [0.4, -0.32, 0.54] },
  { id: "contact", label: "Liên hệ", progress: 1, cameraPosition: [-3.2, 2.5, 5.2], cameraTarget: [0, -0.25, -0.3] },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  progress: number;
  cameraPosition: Point3;
  cameraTarget: Point3;
}>;

export type SceneId = (typeof SCENES)[number]["id"];
export type CameraPose = { position: Point3; target: Point3 };

const clamp = (value: number) => Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
const interpolate = (a: Point3, b: Point3, t: number): Point3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export function sceneAt(progress: number): (typeof SCENES)[number] {
  const value = clamp(progress);
  return SCENES.reduce<(typeof SCENES)[number]>((nearest, scene) =>
    Math.abs(scene.progress - value) < Math.abs(nearest.progress - value) ? scene : nearest, SCENES[0]);
}

export function cameraPoseAt(progress: number): CameraPose {
  const value = clamp(progress);
  const exact = SCENES.find((scene) => scene.progress === value);
  if (exact) return { position: exact.cameraPosition, target: exact.cameraTarget };
  const nextIndex = SCENES.findIndex((scene) => scene.progress >= value);
  if (nextIndex <= 0) return { position: SCENES[0].cameraPosition, target: SCENES[0].cameraTarget };
  const current = SCENES[nextIndex - 1];
  const next = SCENES[nextIndex];
  const linear = (value - current.progress) / (next.progress - current.progress);
  const eased = linear * linear * (3 - 2 * linear);
  return {
    position: interpolate(current.cameraPosition, next.cameraPosition, eased),
    target: interpolate(current.cameraTarget, next.cameraTarget, eased),
  };
}
