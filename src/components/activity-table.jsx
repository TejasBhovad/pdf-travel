import React from "react";

const ActivityTable = ({ activities = [] }) => {
  return (
    <section className="mt-4 flex h-auto w-full flex-col gap-2">
      <span className="text-deep text-xl font-semibold">Activity Table</span>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg border border-gray-200 bg-white text-sm shadow">
          <thead>
            <tr className="bg-brand text-white">
              <th className="p-2 text-left font-semibold">City</th>
              <th className="p-2 text-left font-semibold">Activity</th>
              <th className="p-2 text-left font-semibold">Type</th>
              <th className="p-2 text-center font-semibold">Time Required</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                className={`border-b last:border-b-0 hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-purple-50/50" : ""
                }`}
              >
                <td className="p-2">{activity.city}</td>
                <td className="p-2">{activity.activity}</td>
                <td className="p-2">{activity.type}</td>
                <td className="p-2 text-center">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ActivityTable;
