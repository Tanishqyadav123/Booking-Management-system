import Image from "next/image";
import HeroSection from "./components/HeroSection";
import FeaturedShow from "./components/FeaturedShow";
import HowWorks from "./components/HowWorks";
import FeaturedComedian from "./components/FeaturedComedian";
import AnalyticsSection from "./components/AnalyticsSection";
import ReadyToLaugh from "./components/ReadyToLaugh";

export default function Home() {
  return (
   <>
     <div className="w-full h-screen">
        <HeroSection/>
        <FeaturedShow/>
        <HowWorks/>
        <FeaturedComedian/>
        <AnalyticsSection/>
        <ReadyToLaugh/>
     </div>
   </>
  );
}
