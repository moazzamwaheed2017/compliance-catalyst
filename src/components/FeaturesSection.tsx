import { motion } from "framer-motion";
import { FileSearch, Gauge, FileText, LayoutDashboard, Shield, Lock } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Contract-Win Mode™",
    subtitle: "AI RFP Parsing",
    description: "Drop your RFP into ReguLattice. Our AI maps questions against your evidence and SoA, generating high-fidelity answers with confidence scores and source citations.",
  },
  {
    icon: Gauge,
    title: "Dynamic ISO 27001 Readiness Engine",
    subtitle: "Real-Time Scoring",
    description: "Know exactly where you stand before the auditor arrives. Continuously evaluates your controls, tasks, and evidence to generate a real-time Compliance Readiness Score.",
  },
  {
    icon: FileText,
    title: "Automated SoA & Policy Builder",
    subtitle: "Minutes, Not Months",
    description: "Draft your Statement of Applicability and core security policies instantly. Dynamically generates Risk Treatment Plans based on your existing control coverage.",
  },
  {
    icon: LayoutDashboard,
    title: "Comprehensive Control & Evidence Tracking",
    subtitle: "Unified Dashboard",
    description: "Manage your entire compliance lifecycle in one place. From defining scope to managing evidence folders and tasks—zero blind spots in your compliance pulse.",
  },
];

const FeaturesSection = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(160 84% 39% / 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(210 100% 56% / 0.04) 0%, transparent 50%)`,
        }}
      />
      {/* Floating compliance shapes */}
      <div className="absolute top-20 right-10 opacity-[0.04] animate-drift">
        <Shield className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-[0.04] animate-drift" style={{ animationDelay: "4s" }}>
        <Lock className="w-24 h-24 text-secondary" />
      </div>
      {/* Subtle grid dots */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(160 84% 39% / 0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          An Intelligent Ecosystem for{" "}
          <span className="text-gradient">Security & Governance</span>
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
            className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 hover:shadow-glow hover:border-primary/30 transition-all"
          >
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5">
              <f.icon className="w-7 h-7 text-accent-foreground" />
            </div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">{f.subtitle}</p>
            <h3 className="text-xl font-bold mb-3 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
