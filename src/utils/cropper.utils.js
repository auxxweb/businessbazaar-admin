export default function getCroppedImg(imageSrc, crop) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return reject("Canvas is empty");
        }
        blob.name = "croppedImage";
        const fileUrl = URL.createObjectURL(blob);
        resolve({ fileUrl, blob });
      }, "image/jpeg");
    };
    image.onerror = () => {
      reject(new Error("Image load failed"));
    };
  });
}