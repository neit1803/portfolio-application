"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const DEFAULT_MODEL_URL = "/models/programmer_desk_setup__stylized_3d_room.glb";
const DESKTOP_BREAKPOINT = 900;
const DESKTOP_MODEL_OFFSET = 0.2;
const DESKTOP_MODEL_VERTICAL_OFFSET = 0.33;

type RoomSceneProps = {
  modelUrl?: string;
  label?: string;
};

export default function RoomScene({
  modelUrl = DEFAULT_MODEL_URL,
  label = "Model 3D phòng làm việc",
}: RoomSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("Đang tải không gian 3D...");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 1000);
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      queueMicrotask(() => setStatus("Trình duyệt không hỗ trợ hiển thị model 3D."));
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.75;

    const controls = new OrbitControls(camera, canvas);
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
      0.45,
      0.45,
      0.72,
    );
    bloomPass.blendMaterial.fragmentShader = /* glsl */ `
      uniform float opacity;
      uniform sampler2D tDiffuse;

      varying vec2 vUv;

      void main() {
        vec4 bloom = texture2D(tDiffuse, vUv);
        float bloomAlpha = clamp(max(max(bloom.r, bloom.g), bloom.b), 0.0, 1.0);
        gl_FragColor = vec4(bloom.rgb * opacity, bloomAlpha * opacity);
      }
    `;
    bloomPass.blendMaterial.needsUpdate = true;
    composer.addPass(bloomPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x62617a, 2.3));
    const keyLight = new THREE.DirectionalLight(0xffe6c4, 3);
    keyLight.position.set(8, 12, 10);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xb8ceff, 1.5);
    fillLight.position.set(-8, 4, -6);
    scene.add(fillLight);

    let model: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let animationFrameId: number | null = null;
    let disposed = false;
    const navigationHitboxes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>[] = [];
    const clock = new THREE.Clock(false);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const pointerStart = new THREE.Vector2();
    let pointerIsDown = false;

    const getNavigationTarget = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return undefined;

      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);

      const hit = raycaster.intersectObjects(navigationHitboxes, false)[0];
      return hit?.object.userData.sectionId as string | undefined;
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerStart.set(event.clientX, event.clientY);
      pointerIsDown = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || pointerIsDown) return;
      canvas.style.cursor = getNavigationTarget(event) ? "pointer" : "grab";
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!pointerIsDown) return;
      pointerIsDown = false;

      const movement = Math.hypot(
        event.clientX - pointerStart.x,
        event.clientY - pointerStart.y,
      );
      if (movement > 6) return;

      const sectionId = getNavigationTarget(event);
      if (!sectionId) return;

      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const resetPointer = () => {
      pointerIsDown = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", resetPointer);
    canvas.addEventListener("pointerleave", resetPointer);

    const animate = () => {
      if (disposed) return;

      animationFrameId = window.requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      mixer?.update(delta);
      composer.render(delta);
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.zoom = Math.min(1, camera.aspect);
      camera.clearViewOffset();
      if (width > DESKTOP_BREAKPOINT) {
        camera.setViewOffset(
          width,
          height,
          -width * DESKTOP_MODEL_OFFSET,
          height * DESKTOP_MODEL_VERTICAL_OFFSET,
          width,
          height,
        );
      }
      camera.updateProjectionMatrix();
      composer.render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    new GLTFLoader().load(
      modelUrl,
      ({ scene: loadedScene, animations }) => {
        if (disposed) return;
        model = loadedScene;
        scene.add(model);

        const emissiveMaterials = new Set<THREE.MeshStandardMaterial>();
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if (
              material instanceof THREE.MeshStandardMaterial
              && material.emissive.getHex() !== 0
            ) {
              emissiveMaterials.add(material);
            }
          });
        });
        emissiveMaterials.forEach((material) => {
          material.emissiveIntensity = 0.8;
        });

        const navigationNodes = [
          { nodeName: "Text.002_334", sectionId: "home" },
          { nodeName: "Text.001_333", sectionId: "tech-stack" },
          { nodeName: "Text.003_335", sectionId: "projects" },
          { nodeName: "Text.004_336", sectionId: "contact" },
        ];

        navigationNodes.forEach(({ nodeName, sectionId }) => {
          const navigationNode = model?.getObjectByName(nodeName);
          if (!navigationNode) return;

          const bounds = new THREE.Box3().setFromObject(navigationNode);
          const size = bounds.getSize(new THREE.Vector3());
          const center = bounds.getCenter(new THREE.Vector3());
          const hitbox = new THREE.Mesh(
            new THREE.BoxGeometry(
              Math.max(size.x * 1.3, 0.25),
              Math.max(size.y * 1.4, 0.25),
              Math.max(size.z * 1.6, 0.25),
            ),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
          );

          hitbox.position.copy(center);
          hitbox.userData.sectionId = sectionId;
          scene.add(hitbox);
          navigationHitboxes.push(hitbox);
        });

        if (animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          animations.forEach((clip) => mixer?.clipAction(clip).play());
        }

        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const radius = Math.max(bounds.getSize(new THREE.Vector3()).length() / 2, 1);
        const distance = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2));
        camera.position.copy(center).add(
          new THREE.Vector3(0.8, 0.25, -1.4).normalize().multiplyScalar(distance * 0.72),
        );
        camera.near = Math.max(radius / 100, 0.01);
        camera.far = Math.max(distance * 8, 100);
        camera.lookAt(center);
        camera.updateProjectionMatrix();
        controls.target.copy(center);
        controls.minDistance = radius * 0.75;
        controls.maxDistance = distance * 1.8;
        controls.update();
        clock.start();
        animate();
        setReady(true);
      },
      (event) => {
        if (disposed || !event.total) return;
        setStatus(`Đang tải không gian 3D... ${Math.round((event.loaded / event.total) * 100)}%`);
      },
      () => {
        if (!disposed) setStatus("Không thể tải model 3D.");
      },
    );

    return () => {
      disposed = true;
      observer.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", resetPointer);
      canvas.removeEventListener("pointerleave", resetPointer);
      if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
      mixer?.stopAllAction();
      if (mixer && model) mixer.uncacheRoot(model);
      navigationHitboxes.forEach((hitbox) => {
        scene.remove(hitbox);
        hitbox.geometry.dispose();
        hitbox.material.dispose();
      });
      if (model) {
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        });
      }
      controls.dispose();
      bloomPass.dispose();
      outputPass.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <div className="room-scene" role="img" aria-label={label}>
      <canvas ref={canvasRef} className="room-canvas" aria-hidden="true" />
      {!ready && <span className="scene-status" role="status">{status}</span>}
    </div>
  );
}
