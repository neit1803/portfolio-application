# Developer Portfolio

Portfolio 3D xây bằng Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber và Supabase. Dự án đang ở Phase 1; trang hiện tại là màn hình nền tảng, chưa hiển thị CV hay scene 3D.

## Chạy local

Yêu cầu Node.js và npm. Cài dependencies rồi chạy:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Phase 1 chạy được khi chưa cấu hình Supabase. Các biến trong `.env.local` sẽ được dùng từ Phase 2:

| Biến | Mục đích |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL dự án Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Khóa công khai để đọc dữ liệu theo RLS |

Không đặt service role key hoặc bí mật vào biến `NEXT_PUBLIC_`. `.env.local` được Git bỏ qua; `.env.example` chỉ chứa tên biến.

## Kiểm tra

```bash
npm run lint
npm run build
```

## Kế hoạch

Đọc [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) và các file phase trong `docs/`. Phase 2 sẽ tạo migration bảng quan hệ và hướng dẫn nhập CV trực tiếp trên Supabase. Model, audio và ảnh chưa cần để chạy Phase 1.
