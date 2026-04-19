import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import SeeItInAction from "@/components/SeeItInAction";
import CustomerStories from "@/components/CustomerStories";
import TrustBar from "@/components/TrustBar";
import PricingSection from "@/components/PricingSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyFloatingBar from "@/components/StickyFloatingBar";
import ExitPopup from "@/components/ExitPopup";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <FounderSection />
    <div id="features">
      <FeaturesSection />
    </div>
    <div id="how-it-works">
      <HowItWorks />
    </div>
    
    <div id="demo">
      <SeeItInAction />
    </div>
    
    <div id="stories">
      <CustomerStories />
    </div>

    <TrustBar />

    <div id="pricing">
      <PricingSection />
    </div>
    
    <FinalCTA />
    
    <div id="contact">
      <Footer />
    </div>
    
    <StickyFloatingBar />
    <ExitPopup />
  </div>
);

export default Index;
