import React from "react";

const DayCard = ({
  day = "Day 1",
  date = "27th November",
  image = "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop",
  desc = "Arrival In Singapore & City Exploration",
  data = {
    morning: ["Arrive In Singapore. Transfer From Airport To Hotel."],
    afternoon: [
      "Check Into Your Hotel.",
      "Visit Marina Bay Sands Sky Park (2-3 Hours).",
      "Optional: Stroll Along Marina Bay Waterfront Promenade/Helix Bridge.",
    ],
    evening: [
      "Explore Gardens By The Bay, Including Super Tree Grove (2-3 Hours)",
    ],
  },
}) => {
  return (
    <div className="w-full border-b border-gray-200 bg-white px-4 py-6 md:px-0">
      <div className="mx-auto flex max-w-6xl items-start gap-6">
        <div className="flex flex-shrink-0 items-center justify-center">
          <div className="bg-brand transform rounded-full px-1 py-32 text-lg font-bold text-white shadow-lg">
            <span className="inline-block -rotate-90 whitespace-nowrap">
              {day}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-start gap-4">
          <div className="flex flex-shrink-0 flex-col items-center">
            <img
              src={image}
              alt={desc}
              className="h-36 w-36 rounded-full border-4 border-gray-100 object-cover shadow-lg"
            />
            <div className="mt-4 text-center">
              <div className="text-xl font-bold text-gray-800">{date}</div>
              <div className="mt-1 max-w-[200px] text-sm text-gray-600">
                {desc}
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-start gap-6">
            <div className="flex flex-shrink-0 flex-col items-center pt-2">
              <div className="border-accent bg-accent h-4 w-4 rounded-full border-4 shadow-sm"></div>
              <div className="bg-accent h-16 w-1"></div>
              <div className="border-accent bg-accent h-4 w-4 rounded-full border-4 shadow-sm"></div>
              <div className="bg-accent h-16 w-1"></div>
              <div className="border-accent bg-accent h-4 w-4 rounded-full border-4 shadow-sm"></div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <div className="flex min-h-[60px] flex-col justify-center">
                <div className="mb-2 text-lg font-semibold text-gray-800">
                  Morning
                </div>
                <ul className="space-y-1">
                  {data.morning.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-balance text-gray-700"
                    >
                      <span className="text-accent mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-[60px] flex-col justify-center">
                <div className="mb-2 text-lg font-semibold text-gray-800">
                  Afternoon
                </div>
                <ul className="space-y-1">
                  {data.afternoon.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-balance text-gray-700"
                    >
                      <span className="text-accent mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-[60px] flex-col justify-center">
                <div className="mb-2 text-lg font-semibold text-gray-800">
                  Evening
                </div>
                <ul className="space-y-1">
                  {data.evening.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm text-balance text-gray-700"
                    >
                      <span className="mr-2 text-purple-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayCard;
