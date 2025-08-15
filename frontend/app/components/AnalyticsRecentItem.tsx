import React from "react";
import {
  SingleAnalyticsComedianType,
  SingleRecentEventWithRevenueType,
} from "../responseTypes/admin.response";

function AnalyticsRecentItem({
  key,
  data,
}: {
  data: SingleRecentEventWithRevenueType | SingleAnalyticsComedianType;
  key: number;
}) {
  return (
    <div className="min-w-[35vw] min-h-[8vh] bg-[#1f2a38] rounded-md px-4 flex items-center justify-between">
      <div>
        <h2>
          {data && "eventName" in data
            ? data.eventName
            : `${data.firstName} ${data.lastName}`}
        </h2>
        <h2>
          {" "}
          {data && "comedianName" in data
            ? data.comedianName
            : data._count?.eventDetails}
        </h2>
      </div>
      <p>
        {data && "eventRevenue" in data
          ? "$" + data.eventRevenue
          : (data.eventDetails?.length > 0 && data.eventDetails[0]?.name) ||
            "No Show Yet"}
      </p>
    </div>
  );
}

export default AnalyticsRecentItem;
