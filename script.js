document.getElementById("uploadButton").addEventListener("click", () => {
  const photoInput = document.getElementById("photo");
  if (!photoInput.files[0]) {
    alert("Please select a photo to upload.");
    return;
  }

  // Show consent dialog
  document.getElementById("consentDialog").style.display = "block";
});

document.getElementById("consentYes").addEventListener("click", () => {
  handleUpload("public");
});

document.getElementById("consentNo").addEventListener("click", () => {
  handleUpload("private");
});

function handleUpload(destination) {
  const photoInput = document.getElementById("photo");
  const file = photoInput.files[0];

  if (!file) {
    alert("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageData = event.target.result;
    
    if (destination === "public") {
      localStorage.setItem(`public-${Date.now()}`, imageData);
      setTimeout(() => {
        window.location.href = "archive.html";  // 🔥 Fixed: Delay ensures image is stored first
      }, 500);
    } else {
      localStorage.setItem(`private-${Date.now()}`, imageData);
      setTimeout(() => {
        window.location.href = "index.html";
      }, 500);
    }
  };
  
  reader.readAsDataURL(file);
}
