"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  depth: number;
};

const STAR_COUNT = 180;

function createStars(): Star[] {
  let seed = 1803;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: STAR_COUNT }, () => ({
    x: random(),
    y: random(),
    radius: random() > 0.9 ? random() * 1.4 + 1.05 : random() * 0.7 + 0.35,
    alpha: random() * 0.45 + 0.3,
    depth: random() * 0.85 + 0.15,
  }));
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const stars = createStars();
    const targetPointer = { x: 0, y: 0 };
    const pointer = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let disposed = false;

    const resize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resetPointer = () => {
      targetPointer.x = 0;
      targetPointer.y = 0;
    };

    const render = () => {
      if (disposed) return;
      animationFrameId = window.requestAnimationFrame(render);

      pointer.x += (targetPointer.x - pointer.x) * 0.055;
      pointer.y += (targetPointer.y - pointer.y) * 0.055;
      context.clearRect(0, 0, width, height);

      const angle = pointer.x * 0.105 + pointer.y * 0.035;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach((star) => {
        const parallaxX = pointer.x * star.depth * width * 0.018;
        const parallaxY = pointer.y * star.depth * height * 0.012;
        const x = (star.x - 0.5) * width + parallaxX;
        const y = (star.y - 0.5) * height + parallaxY;
        const rotatedX = x * cos - y * sin;
        const rotatedY = x * sin + y * cos;
        const alpha = star.alpha;

        context.beginPath();
        context.fillStyle = `rgba(211, 220, 246, ${alpha})`;
        context.arc(
          centerX + rotatedX,
          centerY + rotatedY,
          star.radius,
          0,
          Math.PI * 2,
        );
        context.fill();

        if (star.radius > 1.4) {
          context.beginPath();
          context.fillStyle = `rgba(157, 177, 255, ${alpha * 0.16})`;
          context.arc(
            centerX + rotatedX,
            centerY + rotatedY,
            star.radius * 4,
            0,
            Math.PI * 2,
          );
          context.fill();
        }
      });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  return (
    <div className="starfield-background" aria-hidden="true">
      <canvas ref={canvasRef} className="starfield-canvas" />
    </div>
  );
}
