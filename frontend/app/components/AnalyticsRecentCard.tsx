import {
  SingleAnalyticsComedianType,
  SingleRecentEventWithRevenueType,
} from "../responseTypes/admin.response";
import AnalyticsRecentItem from "./AnalyticsRecentItem";

const AnalyticsRecentCard = ({
  recentCardDetails,
}: {
  recentCardDetails?:
    | SingleRecentEventWithRevenueType[]
    | SingleAnalyticsComedianType[];
}) => {
  if (!recentCardDetails) {
    return;
  }
  return (
    <>
      <div className="min-w-[40vw] p-4 max-h-[60vw] min-h-[40vh] rounded-md bg-[#121929]">
        <h2 className="text-xl">
          {"eventRevenue" in recentCardDetails
            ? "Recent Shows"
            : "Top Performer"}
        </h2>

        <div className="flex flex-col mt-4 items-center justify-center gap-4">
          {recentCardDetails &&
            recentCardDetails.map(
              (
                val:
                  | SingleRecentEventWithRevenueType
                  | SingleAnalyticsComedianType,
                index
              ) => {
                return <AnalyticsRecentItem key={index} data={val} />;
              }
            )}
        </div>
      </div>
    </>
  );
};

export default AnalyticsRecentCard;
