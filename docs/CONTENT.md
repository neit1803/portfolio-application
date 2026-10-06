# Cập nhật nội dung portfolio

Dữ liệu CV được sửa trong các bảng Supabase ở [SUPABASE.md](./SUPABASE.md). Không sửa component React hay file JSON/LaTeX để cập nhật CV.

- Sửa tên, chức danh, giới thiệu, email, vị trí trong `profiles`.
- Thêm nhiều công việc trong `experiences`; thêm từng trách nhiệm trong `experience_responsibilities` với `experience_id`. Công nghệ là mảng `text[]` trong `experiences.technologies`.
- Thêm dự án trong `projects`. Dự án không có dòng `project_images` vẫn hiển thị bình thường. Ảnh dùng đường dẫn Storage tương đối trong bucket `project-images`.
- Thêm kỹ năng trong `skills`; `keyboard_key` là ký tự trên bàn phím 3D (ví dụ `J`, `1`, `/`), không phân biệt chữ hoa/thường. Kỹ năng có phím hợp lệ được ưu tiên theo `sort_order`; nếu trùng phím, phím không hợp lệ hoặc để trống, hệ thống gán phím còn trống theo thứ tự các hàng. Nếu hết phím, kỹ năng vẫn xuất hiện và chọn được trong danh sách HTML. Dùng `sort_order` để sắp xếp.
- Thêm link trong `social_links`; URL link phải dùng HTTPS.
- Upload PDF vào bucket `resumes`, sau đó đặt `resumes.storage_path`. Không có đường dẫn thì nút tải CV không xuất hiện.

Sau khi sửa DB, tải lại trang để xem thay đổi. Site đọc dữ liệu ở mỗi request. Endpoint cập nhật CV có thể thêm sau, nhưng phải ghi vào chính các bảng này với xác thực và RLS.
