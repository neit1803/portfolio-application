# Danh sách 3D assets

Phase 3 chạy hoàn toàn bằng procedural geometry trong `DeveloperRoom.tsx`; thư mục `public/models/` có thể rỗng. Tên file dưới đây là hợp đồng dự kiến cho Phase 7. Model chỉ thay hình học, không được chứa CV text.

| Asset | File dự kiến | Mức độ | Fallback hiện có |
| --- | --- | --- | --- |
| Room | `room.glb` | Required cho cảnh | Sàn và hai tường bằng box geometry |
| Developer | `developer.glb` | Required cho cảnh | Nhân vật bằng capsule/sphere, cử động tay nhẹ |
| Desk | `desk.glb` | Required cho cảnh | Mặt bàn và chân bằng box geometry |
| Chair | `chair.glb` | Required cho cảnh | Ghế bằng box/cylinder geometry |
| Monitor | `monitor.glb` | Required cho cảnh | Khung, màn hình phát sáng và chân đế |
| Keyboard | `keyboard.glb` | Required cho tương tác | Bàn phím procedural với từng key mesh riêng |
| Mouse | `mouse.glb` | Required cho cảnh | Sphere geometry thu nhỏ |
| Laptop | `laptop.glb` | Optional | Không hiển thị |
| Bookshelf | `bookshelf.glb` | Optional | Không hiển thị |
| Lamp | `lamp.glb` | Optional | Không hiển thị |
| Coffee mug | `coffee-mug.glb` | Optional | Không hiển thị |
| Plant | `plant.glb` | Optional | Không hiển thị |
| Speakers | `speakers.glb` | Optional | Không hiển thị |
| Wall decoration | `wall-decoration.glb` | Optional | Không hiển thị |

"Required" là vật thể cần xuất hiện trong trải nghiệm, không có nghĩa file GLB phải tồn tại. Tất cả vật thể bắt buộc đều có fallback nên trang chạy được khi không có model thật.

Có thể dùng `developer-room.glb` gộp room, desk, chair, developer, monitor, keyboard, mouse để giảm số request. Bàn phím trong model gộp phải có node nhận diện riêng và các key truy cập được để tương tác. Phase 7 sẽ thêm `MODEL_REGISTRY`, loader, kiểm tra node và `MODEL_CONTRACT.md`; không đặt đường dẫn model trực tiếp trong scene component.

Quy ước: model ở `public/models/`, texture ở `public/textures/`, âm thanh ở `public/audio/`, icon ở `public/icons/`. Tên file dùng kebab-case.
