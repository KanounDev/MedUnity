// src/app/team/page.tsx
import TeamSection from '@/components/TeamSection';
import HeroBanner from "@/components/HeroBanner";

export const metadata = {
  title: 'MedUnity – Notre Équipe',
};

export default function TeamPage() {
   return (
    <div>
      <HeroBanner title="OUR STUFF" />
      <TeamSection />
    </div>
  );
  return <TeamSection />;
}