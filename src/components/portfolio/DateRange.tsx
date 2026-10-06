export default function DateRange({ start, end }: { start?: string; end?: string }) {
  if (!start && !end) return null;
  return <p className="text-sm text-slate-400">
    {start && <time dateTime={start}>{start}</time>}
    {start && " – "}
    {end ? <time dateTime={end}>{end}</time> : start && "Hiện tại"}
  </p>;
}
