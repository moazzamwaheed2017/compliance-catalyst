import { motion } from "framer-motion";
import { Lock, Zap } from "lucide-react";

const FinalCTA = () => (
  <section className="py-24 bg-background relative overflow-hidden border-t border-border">
    {/* Animated grid and neon glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] animate-pulse-ring" />
      <div style={{ backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} className="w-full h-full" />
    </div>

    <div className="container mx-auto px-6 relative z-10 w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto border border-primary/20 bg-[#0A1428]/80 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-[0_0_50px_rgba(0,212,255,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="w-16 h-16 mx-auto bg-primary/10 border border-primary/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(0,212,255,0.2)]">
          <Lock className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Make Compliance Your <br className="hidden md:block" />
          <span className="text-secondary" style={{ textShadow: "0 0 20px rgba(16,185,129,0.4)" }}>Competitive Advantage?</span>
        </h2>
        
        <p className="text-muted-foreground text-lg mb-10">
          Join forward-thinking enterprise security teams accelerating deals with ReguLattice. Get full access for 5 days.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="https://regulattice-pro.vercel.app/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-8 py-4 text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
          >
            <Zap className="w-5 h-5" /> Start Free Trial
          </a>
          <a
            href="https://calendly.com/moazzamwaheed/15min"
            className="inline-flex items-center justify-center rounded-lg border-2 border-primary/30 text-primary font-bold px-8 py-4 text-lg hover:bg-primary/10 transition-all hover:border-primary/60"
          >
            Book a Demo
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground font-mono">NO CREDIT CARD REQUIRED. CANCEL ANYTIME. SOC 2 COMPLIANT INFRASTRUCTURE.</p>
      </motion.div>
    </div>
  </section>
);

export default FinalCTA;
