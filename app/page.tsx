const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16 sm:px-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-400">
          Developer portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Workspace đang được xây dựng
        </h1>
        <p className="max-w-xl text-lg leading-8 text-slate-300">
          Nền tảng ứng dụng đã sẵn sàng. Nội dung portfolio sẽ được tải từ
          Supabase sau khi hoàn thành lớp dữ liệu ở Phase 2.
        </p>
      </div>
      <p className="rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-4 text-sm text-slate-300">
        {hasSupabaseConfig
          ? "Cấu hình Supabase đã được cung cấp."
          : "Chưa có cấu hình Supabase. Xem .env.example để thiết lập khi triển khai Phase 2."}
      </p>
    </main>
  );
}
