const staticAssets = [
    './',
    './app.js',
    './app.css',
    './fallback.json',
    './images/cat.jpg'
];

// 缓存静态资源
self.addEventListener('install', async event => {
    const cache = await caches.open('news-static');
    cache.addAll(staticAssets);
});

// fetch事件时触发
self.addEventListener('fetch', event => {
    const request = event.request,
        url = new URL(request.url);


    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else if ((request.url.indexOf('http') !== -1)) {
        event.respondWith(networkFirst(request));
    }
});

// 缓存优先
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    // 有数据就用缓存数据，否则fetch请求新的数据
    return cachedResponse || fetch(request);
}

// 网络请求优先
async function networkFirst(request) {
    const cache = await caches.open('news-dynamic');

    try {
        const res = await fetch(request);
        cache.put(request, res.clone()); // 更新缓存
        return res;
    } catch (err) {
        const cachedResponse = await cache.match(request);
        // 报错则使用缓存，若当前没有该请求的缓存数据，则使用fallback数据
        return cachedResponse || await caches.match('./fallback.json');
    }
}