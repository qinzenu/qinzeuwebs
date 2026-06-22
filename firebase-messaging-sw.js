// Harus menggunakan versi compat agar bisa berjalan di service worker
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAKWNgNv0GJxdiuEywB9HWpIv6Sj4ZgM14",
    projectId: "notif-183a8",
    messagingSenderId: "103670602072",
    appId: "1:103670602072:web:ee0350cb900530bbc7ad2d"
});

const messaging = firebase.messaging();

// Menangani pesan saat web tertutup/di background
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '../vd/iconnotif.png',
        badge: '../vd/iconnotif.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});