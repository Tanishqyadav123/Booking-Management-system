"use client";
import HeroSection from "./components/HeroSection";
import FeaturedShow from "./components/FeaturedShow";
import HowWorks from "./components/HowWorks";
import FeaturedComedian from "./components/FeaturedComedian";
import AnalyticsSection from "./components/AnalyticsSection";
import ReadyToLaugh from "./components/ReadyToLaugh";
import { useEffect } from "react";
import { useAuth } from "./Context/auth.context";

export default function Home() {
  const { fetchUserDetails } = useAuth();
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="w-full h-screen">
        <HeroSection />
        <FeaturedShow />
        <HowWorks />
        <FeaturedComedian />
        <AnalyticsSection />
        <ReadyToLaugh />
      </div>
    </>
  );
}
