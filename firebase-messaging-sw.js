// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAKWNgNv0GJxdiuEywB9HWpIv6Sj4ZgM14",
    projectId: "notif-183a8",
    messagingSenderId: "103670602072",
    appId: "1:103670602072:web:ee0350cb900530bbc7ad2d"
});

const messaging = firebase.messaging();

// Menggunakan event listener standar untuk memastikan event tertangkap
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification?.title || "NEWBIEFAMS";
    const notificationOptions = {
        body: payload.notification?.body || "Ada informasi baru untuk Anda!",
        icon: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png',
        badge: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png',
        data: {
            url: payload.notification?.click_action || payload.fcmOptions?.link || '/'
        }
    };

    // Gunakan waitUntil agar browser menunggu proses selesai sebelum menutup thread
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Tambahkan listener untuk klik notifikasi (WAJIB ADA agar bisa membuka link)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const targetUrl = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Jika sudah ada tab terbuka, fokus ke sana
            for (const client of clientList) {
                if (client.url === targetUrl && 'focus' in client) return client.focus();
            }
            // Jika tidak ada, buka window baru
            return clients.openWindow(targetUrl);
        })
    );
});
