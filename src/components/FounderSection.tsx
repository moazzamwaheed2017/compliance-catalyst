import { motion } from "framer-motion";
import founderImg from "@/assets/founder.png";
import { Quote } from "lucide-react";

const FounderSection = () => (
  <section className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
    {/* Subtle grid background */}
    <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(circle, rgba(0, 212, 255, 0.1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
    
    <div className="container mx-auto px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
          Origin of the <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>Platform</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="relative shrink-0">
            {/* Glowing ring behind image */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[30px] animate-pulse-ring" />
            <img
              src={founderImg}
              alt="Moazzam Waheed, Founder & CEO"
              className="relative w-48 h-48 rounded-full object-cover border-2 border-primary/30 shadow-[0_0_30px_rgba(0,212,255,0.15)] filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-primary/10" />
            <blockquote className="text-muted-foreground text-lg leading-relaxed relative z-10">
              "As the Founder & CEO of ReguLattice, I bring over 16 years of hands-on expertise in Software Engineering and Artificial Intelligence. Having witnessed firsthand the immense friction companies face when proving their security posture to close enterprise deals, I realized the compliance industry needed a paradigm shift.
              <br /><br />
              ReguLattice was engineered to actively synthesize your data, evaluate your evidence, and generate high-confidence RFP responses. Our mission is to make ISO 27001 an accelerator for your business growth, not a roadblock."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-[1px] bg-primary/50 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
              <p className="font-mono text-foreground font-semibold uppercase tracking-widest text-sm">
                Moazzam Waheed <span className="text-primary">|</span> <span className="text-muted-foreground font-normal">Founder & CEO</span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FounderSection;
