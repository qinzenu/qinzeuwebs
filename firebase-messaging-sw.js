importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyAKWNgNv0GJxdiuEywB9HWpIv6Sj4ZgM14",
    projectId: "notif-183a8",
    messagingSenderId: "103670602072",
    appId: "1:103670602072:web:ee0350cb900530bbc7ad2d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Gunakan URL Absolut (https://domain.com/path/ke/icon.png) 
    // daripada relatif (../) untuk menghindari error di HP
    const notificationTitle = payload.notification.title || "NEWBIEFAMS";
    const notificationOptions = {
        body: payload.notification.body || "Ada update baru!",
        icon: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png', // GUNAKAN URL FULL
        badge: 'https://i.ibb.co.com/xt3gG1v8/iconnotif.png',
        data: { url: payload.fcmOptions?.link || '/' }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
