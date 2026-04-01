import { motion } from "framer-motion";
import { Target, Upload, Brain, Trophy, ShieldCheck } from "lucide-react";

const steps = [
  { icon: Target, title: "Define Your Scope", desc: "Tailor the platform to your organization's specific boundaries and risk appetite." },
  { icon: Upload, title: "Map Your Evidence", desc: "Securely upload and link internal evidence to globally recognized security controls." },
  { icon: Brain, title: "Analyze & Remediate", desc: "Leverage AI-driven insights to prioritize high-risk gaps and execute remediation tasks." },
  { icon: Trophy, title: "Close Enterprise Deals", desc: "Generate branded addendums and auto-fill RFPs using your validated security posture." },
];

const HowItWorks = () => (
  <section className="py-24 bg-surface-cool relative overflow-hidden">
    {/* Animated background */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(160 84% 39% / 0.08)" />
            <stop offset="100%" stopColor="hsl(210 100% 56% / 0.08)" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="8 8">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="90%" y1="20%" x2="10%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="8 8">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="5s" repeatCount="indefinite" />
        </line>
        <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="url(#line-grad)" strokeWidth="1" strokeDasharray="6 10">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="6s" repeatCount="indefinite" />
        </line>
      </svg>
      {/* Pulsing rings */}
      <div className="absolute top-10 left-[15%] w-40 h-40 rounded-full border border-primary/5 animate-pulse-ring" />
      <div className="absolute bottom-10 right-[15%] w-56 h-56 rounded-full border border-secondary/5 animate-pulse-ring" style={{ animationDelay: "2s" }} />
      {/* Floating icon */}
      <div className="absolute bottom-20 left-[8%] opacity-[0.04] animate-drift" style={{ animationDelay: "3s" }}>
        <ShieldCheck className="w-28 h-28 text-primary" />
      </div>
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          From Setup to Certification Readiness in{" "}
          <span className="text-gradient">4 Steps</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-hero mx-auto mb-5 flex items-center justify-center">
              <s.icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="text-sm font-bold text-primary mb-2">Step {i + 1}</div>
            <h3 className="text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
