document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("privateGallery");

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("private-")) {
      const img = document.createElement("img");
      img.src = localStorage.getItem(key);
      gallery.appendChild(img);
    }
  });
});
