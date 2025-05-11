import React from "react";
import { createPortal } from "react-dom";
import IconClose from "../icons/IconClose";

const Modal = ({ children, setIsOpen }) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black z-[999] flex items-center justify-center modal-overlay bg-opacity-60"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative bg-white md:rounded-lg w-full md:max-w-[800px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <div
          className="absolute z-10 bg-white rounded-full shadow-md cursor-pointer -top-6 -right-7"
          onClick={() => setIsOpen(false)}
        >
          <IconClose className="size-8 hover:text-secondary" />
        </div>

        {/* Nội dung cuộn */}
        <div
          className="max-h-[70vh] overflow-y-scroll p-10"
          style={{ scrollbarGutter: "stable" }} // Ngăn modal bị lệch khi có scroll
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Modal;
