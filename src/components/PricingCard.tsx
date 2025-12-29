"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PricingCardProps {
  planId: string;
  title: string;
  price: string;
  period: string;
  features: string[];
  actionLabel: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planId,
  title,
  price,
  period,
  features,
  actionLabel,
}) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to booking page with only plan ID
    router.push(`/booking?planId=${planId}`);
  };

  return (
    <div className="bg-white p-6 sm:p-8 w-full sm:max-w-[380px] sm:w-[350px] rounded-lg shadow-sm border-2 border-gray-200 text-center transition-transform duration-300 hover:-translate-y-2 sm:hover:-translate-y-5 hover:border-[#246E71] flex flex-col justify-between">
      <h4 className="text-xl sm:text-2xl font-semibold text-[#0A1C38] mb-4 sm:mb-6">{title}</h4>
      <div className="text-3xl sm:text-4xl font-bold text-[#00BCD4] mb-8 sm:mb-13">
        {price}
        <span className="text-xs sm:text-sm font-normal text-gray-500">/{period}</span>
      </div>
      <ul className="text-left mb-4 sm:mb-6 flex-grow">
        {features.map((feature, idx) => (
          <li
            key={idx}
            className="py-3 sm:py-4 border-b border-dashed border-gray-200 text-sm sm:text-base text-gray-600"
          >
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleClick}
        className="w-full sm:w-auto inline-block bg-[#00BCD4] text-[#0A1C38] px-6 py-3 rounded-lg font-semibold transition duration-300 hover:bg-[#0097A7]"
      >
        {actionLabel}
      </button>
    </div>
  );
};

export default PricingCard;
