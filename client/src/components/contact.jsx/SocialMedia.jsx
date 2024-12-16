import React from "react";

const SocialMedia = ({ icon, onClick = () => {} }) => {
  return (
    <span
      className="transition duration-300 cursor-pointer hover:opacity-60"
      onClick={onClick}
    >
      {icon}
    </span>
  );
};

export default SocialMedia;
