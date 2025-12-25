// app/qr/page.tsx
import HeroBanner from "@/components/HeroBanner";
import QRSection from "@/components/QRSection";

export default function QRPage() {
  return (
    <div>
      <HeroBanner title="QUESTIONS – RESPONSES" />
      <QRSection />
    </div>
  );
}