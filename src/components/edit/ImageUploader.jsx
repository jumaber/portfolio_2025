import { useRef, useState } from "react";
import toast from "react-hot-toast"; // or react-toastify
import { LoadingAnimation } from "../other/LoadingAnimation";
import { ButtonSmall } from "../dashboard/ButtonSmall";

export function ImageUploader({
  uploadPreset,
  folder, // e.g. slug or “card-pages”
  publicIdOverride, // optional
  initialImage, // for editing existing items
  onUploadComplete, // (secureUrl) => void
}) {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(initialImage || null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    if (publicIdOverride) {
      formData.append("public_id", publicIdOverride);
    } else if (folder) {
      formData.append("folder", folder);
    }

    setIsUploading(true);
    toast.loading("Uploading image…", { id: "upload" });

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      setPreview(data.secure_url);
      onUploadComplete(data.secure_url);
      toast.success("Upload successful!", { id: "upload" });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Try again.", { id: "upload" });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="relative w-full">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFile}
        className="hidden"
      />

      {/* Upload button */}
      <ButtonSmall
        text="Upload Image"
        onClick={() => fileInputRef.current.click()}
        className="mb-2"
      />

      {/* Preview / placeholder / spinner */}
      <div className="relative w-full h-48 bg-white border rounded-md flex items-center justify-center">
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
            <LoadingAnimation classNameImage="w-12" />
          </div>
        )}
        {!isUploading && !preview && (
          <span className="text-gray-400">No image uploaded</span>
        )}
        {!isUploading && preview && (
          <img
            src={preview}
            alt="Preview"
            className="object-contain w-full h-full rounded-md"
          />
        )}
      </div>
    </div>
  );
}
