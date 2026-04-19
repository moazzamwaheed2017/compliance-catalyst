import { motion } from "framer-motion";
import { Gauge, FileText, LayoutDashboard, Shield, Lock, Radar, TerminalSquare } from "lucide-react";

const features = [
  {
    icon: Lock,
    title: "Contract-Win Mode™",
    subtitle: "AI RFP Parsing",
    description: "Drop your RFP into ReguLattice. Our AI maps questions against your evidence and SoA, generating high-fidelity answers with confidence scores and source citations.",
    metric: "Answers generated in <3 seconds",
  },
  {
    icon: Radar,
    title: "Dynamic Readiness Engine",
    subtitle: "Real-Time Scoring",
    description: "Know exactly where you stand before the auditor arrives. Continuously evaluates your controls, tasks, and evidence to generate a real-time Compliance Readiness Score.",
    metric: "Readiness Score updated live",
  },
  {
    icon: TerminalSquare,
    title: "Automated Policy Builder",
    subtitle: "Minutes, Not Months",
    description: "Draft your Statement of Applicability and core security policies instantly. Dynamically generates Risk Treatment Plans based on your existing control coverage.",
    metric: "10x faster policy creation",
  },
  {
    icon: LayoutDashboard,
    title: "Control & Evidence Tracking",
    subtitle: "Unified Dashboard",
    description: "Manage your entire compliance lifecycle in one place. From defining scope to managing evidence folders and tasks—zero blind spots in your compliance pulse.",
    metric: "100% evidence traceability",
  },
];

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden bg-background">
    {/* Animated background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
        }}
      />
      {/* Subtle grid dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 212, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <div className="container mx-auto px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          An Intelligent Ecosystem for <br className="md:hidden" />
          <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.3)" }}>Security & Governance</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Powerful AI-driven tools that transform how you manage compliance.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative rounded-2xl bg-card border border-border p-8 transition-transform hover:-translate-y-2"
          >
            {/* Glowing Hover Border Overlay */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors group-hover:border-primary/50 pointer-events-none shadow-[inset_0_0_0_transparent] group-hover:shadow-[inset_0_0_20px_rgba(0,212,255,0.1),_0_0_30px_rgba(0,212,255,0.15)] z-0" />
            
            {/* Underline effect */}
            <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-primary/0 group-hover:bg-primary/80 transition-colors shadow-[0_0_10px_rgba(0,212,255,0.8)] z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,212,255,0.1)]">
                  <f.icon className="w-7 h-7 text-primary group-hover:animate-pulse" />
                </div>
                <div className="text-xs font-mono font-medium text-primary bg-primary/5 px-2 py-1 rounded border border-primary/20">
                  {f.metric}
                </div>
              </div>
              <p className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold mb-2">{f.subtitle}</p>
              <h3 className="text-xl font-bold mb-3 text-foreground">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
