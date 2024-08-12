import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface FileInterface {
  title: string
  setFile: Dispatch<SetStateAction<File | null>>
}

export default function UploadImage({title, setFile}: FileInterface) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex justify-between w-full max-w h-32">
      <label className="form-control">
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange}/>
      </label>
      {preview && <img src={preview} alt="Image Preview" className="w-32 h-32 object-contain rounded-lg" />}
    </div>
  );
}
