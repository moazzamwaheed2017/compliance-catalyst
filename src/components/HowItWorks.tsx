import { motion } from "framer-motion";
import { Shield, UploadCloud, BrainCircuit, CheckCircle2, Play } from "lucide-react";
import { useState } from "react";

const steps = [
  { icon: Shield, title: "Define Scope", desc: "Lock down your boundaries align with risk appetite." },
  { icon: UploadCloud, title: "Map Evidence", desc: "Securely upload & link controls to ISO 27001." },
  { icon: BrainCircuit, title: "Analyze & Remediate", desc: "AI identifies high-risk gaps for instant fixing.", hasButton: true },
  { icon: CheckCircle2, title: "Close Deals", desc: "Generate audit-ready responses with validated posture." },
];

const HowItWorks = () => {
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Network Nodes / Binary Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHRleHQgeD0iMCIgeT0iMjAiIGZpbGw9IiMwMEQ0RkYiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iOCI+MDE8L3RleHQ+PC9zdmc+')", backgroundSize: '100px 100px', height: '100%', width: '100%' }} />
      </div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            From Setup to Certification in <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>4 Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Lock down your security posture in a fraction of the time.</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Glowing neon connecting line (Desktop) */}
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-primary/20 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="h-full bg-primary shadow-[0_0_15px_rgba(0,212,255,0.8)] relative"
            >
              {/* Particle flowing through line */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#00D4FF] animate-[pulse-ring_1s_infinite]" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-12 md:gap-4 relative">
            {/* Vertical line (Mobile) */}
            <div className="md:hidden absolute top-0 bottom-0 left-[39px] w-[2px] bg-primary/30 shadow-[0_0_10px_rgba(0,212,255,0.3)]" />

            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-4"
              >
                {/* Icon wrapper */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-card border-2 border-primary shadow-[0_0_30px_rgba(0,212,255,0.15)] flex items-center justify-center shrink-0">
                  <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <s.icon className="w-8 h-8 text-primary" />
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-background font-bold text-sm flex items-center justify-center shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                    {i + 1}
                  </div>
                </div>

                <div className="flex-1 mt-2 md:mt-6">
                  <h3 className="text-xl font-bold mb-2 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                  
                  {s.hasButton && (
                    <div className="mt-4">
                      <button 
                        onClick={simulateScan}
                        disabled={isScanning}
                        className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-secondary/10 text-secondary border border-secondary/50 rounded hover:bg-secondary/20 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                      >
                        {isScanning ? (
                          <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-t-2 border-secondary animate-spin"></div> Scanning...</span>
                        ) : (
                          <span className="flex items-center gap-2"><Play className="w-3 h-3" /> Simulate Step 3</span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
