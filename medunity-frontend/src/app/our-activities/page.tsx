// app/activities/page.tsx  (or app/our-activities/page.tsx)
import HeroBanner from "@/components/HeroBanner";
import ActivitiesSection from "@/components/ActivitiesSection";

export default function ActivitiesPage() {
  return (
    <div>
      <HeroBanner title="OUR ACTIVITIES" />
      <ActivitiesSection />
    </div>
  );
}