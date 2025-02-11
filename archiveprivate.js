const correctPassword = "yourSecretPassword";  // 🔥 Change this to your own password

function checkPassword() {
  const enteredPassword = document.getElementById("passwordInput").value;
  
  if (enteredPassword === correctPassword) {
    document.getElementById("passwordPrompt").style.display = "none";
    document.getElementById("privateGallery").style.display = "block";
    loadPrivateImages();
  } else {
    alert("Incorrect password. Access denied.");
  }
}

function loadPrivateImages() {
  const gallery = document.getElementById("privateGallery");

  Object.keys(localStorage).forEach(key => {
    if (key.startsWith("private-")) {
      const img = document.createElement("img");
      img.src = localStorage.getItem(key);
      gallery.appendChild(img);
    }
  });
}
