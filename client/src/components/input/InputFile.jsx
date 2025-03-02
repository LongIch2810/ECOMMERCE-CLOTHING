import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const InputFile = ({ control, name, errors = {}, fileInputRef }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const [image, setImage] = useState("");

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImage(tempUrl);
      field.onChange(file);
    }
  };

  useEffect(() => {
    if (!fileInputRef?.current?.value) {
      setImage("");
    }
  }, [fileInputRef?.current?.value]);

  const hasError = errors?.[name];

  return (
    <label htmlFor={name} className="flex flex-col cursor-pointer">
      <div
        className={`w-[200px] h-[200px] p-2 rounded-lg border-2 ${
          hasError ? "border-secondary" : "border-gray-300"
        } ${image ? "" : "flex items-center justify-center"}`}
      >
        {image ? (
          <img
            src={image}
            alt="avatar"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="p-2 rounded-lg bg-primary text-main">Chọn ảnh</span>
        )}
      </div>
      <input
        id={name}
        onChange={handleChangeImage}
        ref={fileInputRef}
        type="file"
        className="hidden"
      />
    </label>
  );
};

export default InputFile;
