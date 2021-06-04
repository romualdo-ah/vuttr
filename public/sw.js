// const staticCacheName = "vuttr_frontend-v1";
// const dynamicCacheName = "vuttr_frontend-v2";

// const assets = [
//   "/",
//   "index.html",
//   "sw.js",
//   "Dark_Close_2px.svg",
//   "Red_Close_2px.svg",
//   "White_Close_2px.svg",
//   "Icon-Search-2px.svg",
//   "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap",
// ];

// // install event
// self.addEventListener("install", (evt) => {
//   //console.log('service worker installed');
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       cache.addAll(assets);
//     })
//   );
// });

// // activate event
// self.addEventListener("activate", (evt) => {
//   evt.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });

// // fetch event
// self.addEventListener("fetch", (evt) => {
//   //console.log('fetch event', evt);
//   evt.respondWith(
//     caches.match(evt.request).then((cacheRes) => {
//       return (
//         cacheRes ||
//         fetch(evt.request).then((fetchRes) => {
//           return caches.open(dynamicCacheName).then((cache) => {
//             cache.put(evt.request.url, fetchRes.clone());
//             return fetchRes;
//           });
//         })
//       );
//     })
//   );
// });
