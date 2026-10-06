# Phase 2 — Data Layer

## Mục tiêu

Thiết lập hợp đồng `PortfolioData`; hiển thị portfolio HTML tạm thời từ các bảng Supabase trước khi thêm 3D.

## Công việc

- Tạo `src/lib/portfolio/portfolio.types.ts`: `Profile`, `Education`, `Experience`, `Project`, `Skill`, `SocialLink`, `Resume`, `PortfolioData` theo mục 10 của [docs.md](./docs.md). Mảng luôn tồn tại; `Project.images` có thể rỗng.
- Viết migration cho `profiles`, `educations`, `experiences`, `experience_responsibilities`, `projects`, `project_images`, `skills`, `social_links`, `resumes`; thêm `site_settings` khi cần. Đặt khóa ngoại, thứ tự hiển thị, ràng buộc URL/giá trị phù hợp và RLS: công khai chỉ đọc dữ liệu xuất bản, chủ sở hữu mới được ghi. Ghi cách nhập/sửa từng bảng trong `docs/SUPABASE.md`.
- Tạo Supabase client ở server, repository đọc các bảng, mapper kiểm tra/chuẩn hóa dữ liệu và service trả `PortfolioData`. Không đọc JSON hoặc LaTeX để lấy CV.
- Khi DB trống hoặc lỗi, giữ trang và điều hướng hoạt động, hiện trạng thái dữ liệu chưa có/tạm thời không khả dụng; log lỗi ở server, không hardcode CV giả trong React.
- Lưu ảnh dự án và resume PDF trong Supabase Storage; bảng tương ứng lưu URL hoặc đường dẫn được repository chuyển thành URL dùng được.
- Render tạm profile, education, experiences, projects, skills, social links và resume bằng HTML; xử lý mục thiếu/rỗng.
- Tạo `docs/CONTENT.md` mô tả các bảng, cách cập nhật nội dung trực tiếp trong DB, URL ảnh và resume. Ghi hướng mở rộng endpoint cập nhật CV với xác thực và quyền ghi ở server; chưa cần xây endpoint trong phase này.

## Hoàn thành khi

- Sửa bản ghi trong các bảng Supabase rồi tải lại trang sẽ đổi nội dung mà không sửa component.
- Supabase không khả dụng vẫn hiển thị trang và thông báo phù hợp; mảng rỗng/field tùy chọn không gây crash.
- URL resume thiếu thì không có nút tải; lỗi đọc dữ liệu có log phát triển hữu ích.
- `npm run lint`, test mapper/repository ở các nhánh lỗi quan trọng, và `npm run build` thành công.

Commit gợi ý: `feat: add relational portfolio data layer`.
