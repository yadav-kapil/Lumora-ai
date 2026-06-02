export const downloadImage = async (imageUrl, filename = "lumora-image.jpg") => {
  try {
    const response = await fetch(imageUrl, {
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch image data");
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error("Secure download failed, opening image in new tab instead:", error);
    window.open(imageUrl, "_blank");
  }
};
