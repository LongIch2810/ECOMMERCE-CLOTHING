import React from "react";
import { createPortal } from "react-dom";
import IconClose from "../icons/IconClose";

const Modal = ({ children, setIsOpen, position = {} }) => {
  if (typeof document === "undefined") return;
  return createPortal(
    <div
      className="fixed inset-0 bg-black z-[999] flex items-center justify-center modal-overlay bg-opacity-60"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative p-5 bg-white rounded-lg max-w-[800px] max-h-[680px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <IconClose className="size-8 hover:text-secondary"></IconClose>
        </div>
        {children}
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Modal;
