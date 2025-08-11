import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [
        ".jpeg",
        ".jpg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
        ".tiff",
        ".svg",
      ],
    },
    onDrop,
    noClick: true, // we will handle click manually
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: !editData ? `${label} is required` : false });
    if (editData && !selectedFile) {
      setValue(name, editData);
    }
  }, [register, editData, label, name, selectedFile, setValue]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700" htmlFor={name}>
        {label} {!viewData && <sup className="text-red-500">*</sup>}
      </label>
      <div
        className={`${isDragActive ? "bg-bhawaniBeige" : "bg-bhawani-light"} 
                    flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-bhawaniDark`}
        onClick={() => inputRef.current.click()} // enables click to open file picker
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent reopening picker on cancel
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-bhawaniGray2 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input id={name} {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-bhawaniLight2">
              <FiUploadCloud className="text-2xl text-bhawaniYellow" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-bhawaniDark">
              Drag and drop an image, or click to{" "}
              <span className="font-semibold text-bhawaniYellow">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-bhawaniRed">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-red-500">
          {label} is required
        </span>
      )}
    </div>
  );
}
