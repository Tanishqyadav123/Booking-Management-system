import React from "react";

function AnalyticsCard({
  keyName,
  value,
}: {
  keyName: string;
  value: string | number;
}) {
  return (
    <div className="min-w-[20vw] rounded-md bg-[#121929] min-h-[15vh] flex flex-col gap-1 items-center justify-center p-2">
      <p className="text-sm text-gray-400"> {keyName}</p>

      <h2 className="text-xl">
        {keyName === "Revenue" && "$"}
        {value}
      </h2>

      <p className="text-sm text-gray-400">+12% from last month</p>
    </div>
  );
}

export default AnalyticsCard;
