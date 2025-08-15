"use client";

import React, { useEffect, useState } from "react";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsRecentCard from "../components/AnalyticsRecentCard";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardAnalyticsDataType } from "../responseTypes/admin.response";
import toast from "react-hot-toast";
import { getAnalyticsDataService } from "../Services/admin.service";
function page() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      tv: 5000,
      //   amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      tv: 6000,
      //  amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      tv: 7000,
      //  amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      // amt: 2000,
      tv: 8000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      //  amt: 2181,
      tv: 9000,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      // amt: 2500,
      tv: 10000,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      // amt: 2100,
      tv: 11000,
    },
  ];

  const [analyticsData, setAnalyticsData] = useState<
    DashboardAnalyticsDataType | undefined
  >(undefined);

  const fetchAnalyticsData = async () => {
    try {
      const resData = await getAnalyticsDataService();

      if (resData.success) {
        toast.success(resData.message);
        setAnalyticsData(resData.data);
      }
    } catch (error) {
      toast.error("Error while fetching the analytics data");
    }
  };
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  console.log("My Analytics Data is ", analyticsData);
  return (
    <div className="min-h-[70%] w-[80%] mx-auto p-5">
      <div className="heading flex items-center flex-col">
        <h1 className="text-2xl ">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of platform performance and key metrics
        </p>
      </div>

      {analyticsData?.cardData && (
        <div className="card flex items-center justify-around gap-4 mt-5">
          <AnalyticsCard
            keyName="Shows"
            value={analyticsData.cardData?.totalBooking}
          />
          <AnalyticsCard
            keyName="Comedians"
            value={analyticsData.cardData?.totalComedians}
          />
          <AnalyticsCard
            keyName="Events"
            value={analyticsData?.cardData?.totalEvents}
          />
          <AnalyticsCard
            keyName="Revenue"
            value={analyticsData?.cardData?.totalRevenue}
          />
        </div>
      )}

      {/* Ticket Sales Performance Over Time */}
      <div className="line-chart my-5">
        <LineChart
          width={1000}
          height={400}
          data={analyticsData?.lineGraphData || []}
          className="outline-none"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          <Line type="monotone" dataKey="seats" stroke="#82ca9d" />
          <Line type="monotone" dataKey="booking" stroke="red" />
        </LineChart>
      </div>

      {/* Components for Recent Show and Top Performers */}
      <div className="mt-5 flex items-center gap-4 justify-around">
        {/* Recent Shows  */}
        <AnalyticsRecentCard
          recentCardDetails={analyticsData?.recentEventWithRevenue}
        />
        <AnalyticsRecentCard
          recentCardDetails={analyticsData?.comedianDetails}
        />
      </div>
    </div>
  );
}

export default page;
