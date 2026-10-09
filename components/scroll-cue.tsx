export default function ScrollCue() {
  return (
    <div
      className="pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      aria-hidden="true"
    >
      <span className="block min-h-[50px] w-fit rounded-full border-2 border-white p-1">
        <span className="scroll-cue-dot block size-3 rounded-full bg-white" />
      </span>
    </div>
  );
}
