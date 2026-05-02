import { useState } from "react";
import toast from "react-hot-toast";
import http from "../../api/http";

const ImageUploadField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const { data } = await http.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.data.url);
      toast.success("File uploaded successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-midnight">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border-slate-200 bg-white"
        placeholder="Paste an image URL or upload a file"
      />
      <div className="flex flex-wrap items-center gap-4">
        <label className="rounded-full bg-slateblue px-4 py-2 text-sm font-semibold text-white transition hover:bg-marine">
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          {uploading ? "Uploading..." : "Upload File"}
        </label>
        {value ? (
          <img src={value} alt="Uploaded preview" className="h-16 w-24 rounded-2xl object-cover shadow-md" loading="lazy" />
        ) : null}
      </div>
    </div>
  );
};

export default ImageUploadField;

