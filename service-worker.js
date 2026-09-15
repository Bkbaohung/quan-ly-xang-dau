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
    fetch(event.request).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      // Không có mạng và cũng không có bản cache -> trả về lỗi rõ ràng
      // thay vì undefined (undefined làm trình duyệt báo lỗi khó hiểu).
      return new Response(
        'Mất kết nối mạng, vui lòng thử lại.',
        { status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' } }
      );
    })
  );
});
