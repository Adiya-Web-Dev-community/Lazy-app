"use client";
import { FaStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
  maxRating?: number;
};

const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  const stars = Array(maxRating).fill(0);

  return (
    <div className="flex space-x-1">
      {stars.map((_, index) => (
        <FaStar
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
