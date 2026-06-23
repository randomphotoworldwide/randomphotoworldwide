function loadGallery(endpoint, containerId, folder) {
fetch(endpoint)
.then(res => res.json())
.then(files => {
const c = document.getElementById(containerId);
if (!c) return;
files.forEach(f => {
const el = f.endsWith('.mp4') ? document.createElement('video') : document.createElement('img');
el.src = `/uploads/${folder}/${f}`;
if (el.tagName === 'VIDEO') el.controls = true;
c.appendChild(el);
});
});
}

loadGallery('/api/archive', 'gallery', 'archive');
loadGallery('/api/portfolio', 'portfolio', 'portfolio');
