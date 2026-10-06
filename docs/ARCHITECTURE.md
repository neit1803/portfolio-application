# Kiến trúc portfolio (đến Phase 4)

```text
Supabase tables → Portfolio Repository → Portfolio Mapper → PortfolioData
                                                 ├→ HTML sections (Server Component)
                                                 └→ skill data for later 3D interaction

HTML section positions → ScrollExperience → progress / active scene
                                            └→ CameraRig → one Canvas / one DeveloperRoom
SCENES config ───────────────────────────────────┘

Future model registry → GLB loader → GLB or procedural fallback → same R3F scene
```

## Dữ liệu và giao diện

`app/page.tsx` tải portfolio trên server theo mỗi request, rồi truyền HTML đã render vào `ScrollExperience`. Repository đọc các bảng Supabase; mapper tạo `PortfolioData`. Giao diện không đọc trực tiếp hàng dữ liệu hay file CV JSON/LaTeX. Nếu DB lỗi/trống, trang vẫn có nội dung trạng thái; nếu WebGL lỗi, cột scene được bỏ và HTML chiếm chiều rộng phù hợp.

Các component trong `src/components/portfolio/` nhận `PortfolioData` đã chuẩn hóa. Hero hiển thị tóm tắt học vấn, liên kết xã hội và resume nếu có; các phần còn lại dùng heading/list/link semantic. `ScrollExperience` chỉ đặt `data-active-scene`, còn CSS nhấn section tương ứng; không ẩn CV text theo tiến độ scroll.

## Scroll và camera

`src/config/scenes.ts` là nơi duy nhất định nghĩa năm mốc `hero`, `experience`, `projects`, `skills`, `contact`, camera position và target. `education` nằm trong đoạn Hero. ScrollExperience dùng vị trí section trong DOM để tính progress liên tục từ 0 đến 1 và scene đang hoạt động. CameraRig nội suy position/target trong `useFrame`; nav dùng cùng active scene. Khi chọn giảm chuyển động, camera cắt sang scene gần nhất và Canvas chỉ render khi cần.

V1 dùng sự kiện scroll native và `requestAnimationFrame`, không thêm GSAP/ScrollTrigger. Năm section cố định và một camera rig đủ đơn giản để tính progress trực tiếp; không cần thêm runtime hoặc timeline phụ. Nếu sau này có nhiều hiệu ứng đồng bộ phức tạp, có thể thay bộ điều khiển scroll mà không đổi `SCENES` hoặc scene 3D.

Desktop đặt Canvas sticky ở cột trái, HTML ở cột phải. Mobile giữ Canvas sticky ở phần đầu viewport và nội dung tiếp tục cuộn bên dưới. Camera chuyển động nhẹ bằng easing và damping; phần CV luôn đọc được bằng HTML, kể cả khi không có WebGL.

## Tài nguyên 3D

Phase 3 dựng room bằng geometry nên không cần GLB. [MODELS.md](./MODELS.md) liệt kê model dự kiến và fallback. Phase 7 sẽ thêm registry và loader; bàn phím procedural hiện đã có từng key mesh riêng để dùng ở Phase 6.
