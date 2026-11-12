const CACHE_NAME = "militech-static-v1";

const STATIC_ASSETS = [
    "/manifest.webmanifest",
    "/offline",
    "/icon-192.png",
    "/icon-512.png",
];

// Instalación
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        }),
    );

    event.waitUntil(self.skipWaiting());
});

// Activación
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key)),
                ),
            ),
    );

    event.waitUntil(self.clients.claim());
});

// Peticiones
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Solo peticiones GET del mismo origen.
    if (request.method !== "GET" || url.origin !== self.location.origin) {
        return;
    }

    // No almacenar páginas ni respuestas dinámicas de Next.js.
    if (
        url.pathname.startsWith("/api/") ||
        url.pathname.startsWith("/_next/")
    ) {
        return;
    }

    // Fallback para navegación sin conexión.
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(async () => {
                return (await caches.match("/offline")) || Response.error();
            }),
        );
    }
});
