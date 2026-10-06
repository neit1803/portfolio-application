# Supabase V1

Schema: [`supabase/migrations/202610060001_portfolio.sql`](../supabase/migrations/202610060001_portfolio.sql). CV được lưu trong các bảng quan hệ; ứng dụng không đọc JSON/LaTeX.

## Tạo và kết nối dự án

1. Tạo Supabase project và một tài khoản chủ sở hữu trong Authentication. Ghi UUID của user này.
2. Chạy migration SQL trong Supabase SQL Editor (hoặc dùng Supabase CLI với môi trường đã liên kết).
3. Điền Project URL và public/publishable key vào `.env.local` theo `.env.example`. Không dùng service role key trong `NEXT_PUBLIC_`.
4. Tạo một dòng `profiles` với `owner_id` là UUID ở bước 1, `full_name`, `title`, `summary`. Nhập các bảng con bằng `profile_id` của dòng này. Cuối cùng đặt `is_published = true`.

Migration giới hạn một profile được xuất bản tại một thời điểm. Profile chưa xuất bản chỉ chủ sở hữu đã xác thực mới đọc được. Website dùng public key và chỉ đọc profile đã xuất bản. Với profile trống, trang hiện trạng thái chưa xuất bản.

## Các bảng và liên kết

| Bảng | Liên kết | Nội dung |
| --- | --- | --- |
| `profiles` | `owner_id → auth.users.id` | Thông tin chính và trạng thái xuất bản |
| `educations` | `profile_id → profiles.id` | Học vấn |
| `experiences` | `profile_id → profiles.id` | Công việc, công nghệ dạng `text[]` |
| `experience_responsibilities` | `experience_id → experiences.id` | Các trách nhiệm theo thứ tự |
| `projects` | `profile_id → profiles.id` | Dự án, công nghệ dạng `text[]` |
| `project_images` | `project_id → projects.id` | Đường dẫn ảnh trong Storage |
| `skills` | `profile_id → profiles.id` | Kỹ năng và mã phím |
| `social_links` | `profile_id → profiles.id` | Liên kết xã hội |
| `resumes` | `profile_id → profiles.id`, unique | Đường dẫn PDF trong Storage |

`sort_order` tăng dần; các dòng cùng giá trị có thể không ổn định thứ tự, nên đặt giá trị khác nhau nếu thứ tự quan trọng. Không cần `site_settings` ở V1 vì chưa có cấu hình site nào cần sửa trong DB.

## Storage và quyền

Migration tạo hai bucket public: `project-images` và `resumes`. Upload file trong Storage, rồi lưu đường dẫn **bên trong bucket** vào `project_images.storage_path` hoặc `resumes.storage_path`, ví dụ `my-project/screen-1.webp` và `cv.pdf`. File trong bucket public có thể được xem bởi bất kỳ ai biết URL; chỉ đặt tài liệu muốn công khai ở đây. Chủ sở hữu đã đăng nhập được upload/update/delete qua chính sách Storage.

RLS cho phép đọc công khai các dòng thuộc profile đã xuất bản. Chỉ `owner_id = auth.uid()` được sửa profile và các dòng con. Có thể dùng Table Editor/SQL Editor trong Supabase Dashboard để sửa nội dung. Endpoint cập nhật sau này phải xác thực user, dùng key phù hợp ở server và giữ nguyên RLS; không nhận `owner_id` tùy ý từ client.

## Kiểm tra

Đặt `is_published = true`, mở trang và xác nhận nội dung xuất hiện. Sửa `title` hoặc thêm một project trong DB, tải lại trang và xác nhận giao diện cập nhật. Tắt xuất bản để xem trạng thái trống. Khi URL/key sai hoặc Supabase lỗi, trang hiển thị trạng thái tạm thời không khả dụng; lỗi chi tiết chỉ ghi ở server.
