import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-grow min-h-screen bg-black bg-grid-white/[0.08] text-white ">
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}
