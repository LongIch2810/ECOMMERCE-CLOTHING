import React from "react";
import { createPortal } from "react-dom";
import IconClose from "../icons/IconClose";
const ModalMenuMobile = ({ children, setIsOpen, position = {} }) => {
  if (typeof document === "undefined") return;
  return createPortal(
    <div
      className="w-full fixed inset-0 bg-black z-[999] modal-overlay bg-opacity-60"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="absolute top-0 right-0 p-5 bg-white md:rounded-lg w-[300px] h-screen md:h-auto md:max-w-[800px] md:max-h-[680px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute cursor-pointer top-1 right-1"
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

export default ModalMenuMobile;
