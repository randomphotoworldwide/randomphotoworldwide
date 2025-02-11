document.getElementById("uploadForm").addEventListener("submit", (event) => {
  event.preventDefault();
  handleUpload("agree");
});

document.getElementById("disagree").addEventListener("click", () => handleUpload("disagree"));

function handleUpload(consent) {
  const photoInput = document.getElementById("photo");
  if (!photoInput.files[0]) {
    alert("Please select a photo to upload.");
    return;
  }

  if (consent === "agree") {
    const gallery = document.getElementById("gallery");
    const img = document.createElement("img");
    const objectURL = URL.createObjectURL(photoInput.files[0]);
    img.src = objectURL;
    img.onload = () => {
      URL.revokeObjectURL(objectURL);
    };
    gallery.appendChild(img);
    alert("Photo uploaded and added to the archive!");
  } else {
    alert("Photo uploaded but not included in the archive.");
  }

  document.getElementById("uploadForm").reset();
}
