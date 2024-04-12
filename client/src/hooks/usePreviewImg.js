import { useState } from "react";
import { toast } from "react-toastify";

export default function usePreviewImg() {
  const [imgUrl, setImgUrl] = useState(null);

  const previewImg = (e) => {
    const image = e.target.files[0];
    if (image.size > 3145728) {
      toast.error("Image must be less than 3 MB.");
      setImgUrl(null);
      return;
    }
    if (image && image.type.startsWith("image/")) {
      // console.log(image);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
        // console.log(reader.result);
      };

      reader.readAsDataURL(image);
    } else {
      toast.error("Invalid file type");
      setImgUrl(null);
    }
  };

  return { previewImg, imgUrl, setImgUrl };
}
