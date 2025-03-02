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
        className="relative p-5 bg-white md:rounded-lg w-full md:max-w-[700px] md:max-h-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute cursor-pointer top-2 right-2"
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
