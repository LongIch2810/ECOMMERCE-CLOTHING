import React from "react";

const IconPhoto = ({ className = "size-6" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={100}
      height={100}
      id="photo"
      className={className}
    >
      <path d="M88 73.8V26c0-1.1-.9-2-2-2H14c-1.1 0-2 .9-2 2v48c0 2.5 3.3 2 2 2h72c3 0 1.6-4.6 2-2.2zM18 72l22-28.7 18.4 24.1 3.5 4.6H18zm49 0-4.5-5.8 7.5-9.8L81.9 72H67zm17-4L71.6 51.8c-.8-1.1-2.4-1.1-3.2 0l-8.4 11-18.4-24c-.8-1.1-2.4-1.1-3.2 0L16 68.1V28h68v40zM61 34c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.2-7-7-7zm0 10c-1.6 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.4 3-3 3z" />
      <path
        fill="#00F"
        d="M944-650v1684H-840V-650H944m8-8H-848v1700H952V-658z"
      />
    </svg>
  );
};

export default IconPhoto;
