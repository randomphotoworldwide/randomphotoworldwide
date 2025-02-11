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
    const gallery = document.getElementById("gallery");
    const img = document.createElement("img");
    const objectURL = URL.createObjectURL(photoInput.files[0]);
    img.src = objectURL;
    img.onload = () => {
      URL.revokeObjectURL(objectURL);
    };
  
    if (consent) {
      gallery.appendChild(img);
      alert("Photo uploaded and added to the public archive!");
    } else {
      const privateGallery = document.getElementById("privateGallery");
      privateGallery.appendChild(img);
      alert("Photo uploaded but added to the private archive.");
    }
  
    document.getElementById("uploadForm").reset();
    document.getElementById("consentDialog").style.display = "none";
    window.location.href = "archive.html"; // Redirect to the public archive page
  }
