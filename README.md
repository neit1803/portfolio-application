# Developer Portfolio

Portfolio 3D xây bằng Next.js App Router, TypeScript, Tailwind CSS, React Three Fiber và Supabase. Phase 2 đã có trang HTML đọc CV từ các bảng Supabase; scene 3D sẽ được thêm ở các phase sau.

## Chạy local

Yêu cầu Node.js và npm. Cài dependencies rồi chạy:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Trang vẫn chạy khi chưa cấu hình Supabase và hiển thị trạng thái dữ liệu chưa khả dụng. Các biến trong `.env.local` dùng để đọc CV:

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

Đọc [Implementation Plan](docs/IMPLEMENTATION_PLAN.md) và các file phase trong `docs/`. Model và audio chưa cần để chạy trang HTML hiện tại.

## Dữ liệu Supabase (Phase 2)

Chạy migration trong `supabase/migrations/`, tạo tài khoản chủ sở hữu và nhập CV theo [Supabase guide](docs/SUPABASE.md) và [Content guide](docs/CONTENT.md). Khi chưa có profile công khai hoặc Supabase chưa cấu hình, trang vẫn hiển thị trạng thái phù hợp. Ảnh dự án và PDF được lưu trong Supabase Storage; không dùng CV JSON/LaTeX.
