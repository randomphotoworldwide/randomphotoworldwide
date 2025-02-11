document.getElementById("uploadButton").addEventListener("click", () => {
  const photoInput = document.getElementById("photo");
  if (!photoInput.files[0]) {
    alert("Please select a photo to upload.");
    return;
  }
  document.getElementById("consentDialog").style.display = "block";
});

document.getElementById("consentYes").addEventListener("click", () => {
  handleUpload(true);
});

document.getElementById("consentNo").addEventListener("click", () => {
  handleUpload(false);
});

function handleUpload(consent) {
  const photoInput = document.getElementById("photo");
  if (consent) {
    const gallery = document.getElementById("gallery");
    const img = document.createElement("img");
    const objectURL = URL.createObjectURL(photoInput.files[0]);
    img.src = objectURL;
    img.onload = () => {
      URL.revokeObjectURL(objectURL);
    };
    gallery.appendChild(img);
    alert("Photo uploaded and added to the archive!");
    window.location.href = "archive.html"; // Redirect to the archive page
  } else {
    alert("Photo uploaded but not included in the archive.");
  }

  document.getElementById("uploadForm").reset();
  document.getElementById("consentDialog").style.display = "none";
}