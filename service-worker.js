// Service worker tối thiểu — chỉ để trình duyệt cho phép "Cài đặt ứng dụng".
// Không cache dữ liệu nhạy cảm, luôn ưu tiên lấy bản mới nhất từ mạng.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
