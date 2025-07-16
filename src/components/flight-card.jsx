import React from "react";

const FlightCard = () => {
  return (
    <div className="border-accent/25 w-full overflow-hidden rounded-sm border">
      <div className="flex">
        <span className="text-pale bg-brand flex min-w-1/4 items-center px-4 text-sm font-semibold">
          10th January, 2025
        </span>

        <div class="border-l-brand h-0 w-0 border-t-[20px] border-b-[20px] border-l-[20px] border-t-transparent border-b-transparent p-0"></div>

        <span className="text-deep flex w-full items-center gap-1 bg-white px-4 text-sm font-semibold">
          <strong>Emirates </strong> From Delhi (DEL) to Singapore (SIN)
        </span>
      </div>
    </div>
  );
};

export default FlightCard;
