// sw.js
self.addEventListener('push', function(event) {
    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            console.error("Gagal memproses data JSON:", e);
            return;
        }
    }

    const title = data.title || "NEWBIEFAMS";
    const options = {
        body: data.body || "Ada informasi baru untuk Anda!",
        icon: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png',
        badge: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png',
        vibrate: [200, 100, 200, 100, 200],
        data: {
            url: data.url || '/'
        },
        actions: [
            { action: 'open', title: 'Buka Sekarang' }
        ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const targetUrl = event.notification.data.url || '/';
    event.waitUntil(clients.openWindow(targetUrl));
});