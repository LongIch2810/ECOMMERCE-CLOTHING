import React from "react";

const StarRating = ({ rating }) => {
  // Tính số lượng sao đầy, nửa sao và sao rỗng
  const fullStars = Math.floor(rating); // Số sao đầy
  const remainingStar = rating % 1; // Kiểm tra nửa sao
  const emptyStars = Math.floor(5 - rating); // Sao rỗng

  return (
    <div className="flex">
      {/* Hiển thị sao đầy */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`full-${index}`}
            className="w-6 h-6 text-yellow-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}

      {/* Hiển thị nửa sao (nếu có) */}
      {remainingStar && (
        <svg
          className="w-6 h-6 text-yellow-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <defs>
            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${remainingStar * 100}%`} stopColor="gold" />
              <stop offset={`${100 - remainingStar * 100}%`} stopColor="gray" />
            </linearGradient>
          </defs>
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            fill="url(#half-star)"
          />
        </svg>
      )}

      {/* Hiển thị sao rỗng */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <svg
            key={`empty-${index}`}
            className="w-6 h-6 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
    </div>
  );
};

export default StarRating;
