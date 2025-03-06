import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const InputFile = ({
  control,
  name,
  errors = {},
  fileInputRef,
  defaultImage,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const [image, setImage] = useState(defaultImage || ""); // Gán ảnh từ API ban đầu

  useEffect(() => {
    if (defaultImage && !field.value) {
      setImage(defaultImage);
    }
  }, [defaultImage, field.value]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImage(tempUrl);
      field.onChange(file);
      console.log("Field value after change:", field.value); // Kiểm tra giá trị sau khi cập nhật
    }
  };

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
            alt="Ảnh sản phẩm"
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
