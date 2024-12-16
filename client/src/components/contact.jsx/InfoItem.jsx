import React from "react";

const InfoItem = ({ icon, content, onClick = () => {} }) => {
  return (
    <div className="flex items-center gap-x-3" onClick={onClick}>
      <span>{icon}</span>
      <span className="font-medium">{content}</span>
    </div>
  );
};

export default InfoItem;
