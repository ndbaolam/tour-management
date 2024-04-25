// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-multiple]");
  const imagesPreview = uploadImage.querySelector(".images-preview");

  uploadImageInput.addEventListener("change", () => {
    const files = uploadImageInput.files;
    for (const file of files) {
      if (file) {
        const img = `<img class="image-preview" src="${URL.createObjectURL(file)}" upload-image-preview="">`;
        imagesPreview.innerHTML+=img;
      }
    }
  });
}
// End Preview Image