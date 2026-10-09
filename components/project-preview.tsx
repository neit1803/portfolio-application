"use client";

import { useEffect, useRef, useState } from "react";

const PAN_SPEED = 120;

export default function ProjectPreview({
  src,
  background,
  title,
}: {
  src: string;
  background: string;
  title: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const image = new window.Image();

    const measure = () => {
      const viewport = viewportRef.current;
      if (!viewport || !image.naturalWidth) return;
      const displayedHeight = viewport.clientWidth * (image.naturalHeight / image.naturalWidth);
      const nextOverflow = displayedHeight - viewport.clientHeight;
      setOverflow(nextOverflow > viewport.clientHeight * 0.2 ? nextOverflow : 0);
    };

    image.addEventListener("load", measure);
    image.src = src;
    window.addEventListener("resize", measure);
    if (image.complete) measure();

    return () => {
      image.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, [src]);

  const duration = Math.max(overflow / PAN_SPEED, 0.7);

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="img"
      aria-label={`${title} preview`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `linear-gradient(#08101b24, #08101b35), url(${background})` }}
      />
      <div
        ref={viewportRef}
        className="absolute inset-x-[18px] bottom-0 top-[16px] overflow-hidden rounded-[10px] border border-white/20 bg-slate-950 shadow-[0_24px_50px_-12px_rgba(8,20,55,.72)]"
      >
        <div
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: overflow ? `50% ${hovered ? "100%" : "0%"}` : "50% 50%",
            backgroundSize: overflow ? "100% auto" : "cover",
            transition: `background-position ${hovered ? duration : Math.min(duration * 0.35, 0.75)}s ${hovered ? "linear" : "cubic-bezier(.25,1,.5,1)"}`,
          }}
        />
      </div>
    </div>
  );
}
