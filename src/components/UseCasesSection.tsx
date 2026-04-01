import { motion } from "framer-motion";
import { Handshake, Award, FolderSync, ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";

const useCases = [
  {
    icon: Handshake,
    title: "Unblocking Enterprise Sales",
    badge: "Contract-Win Mode",
    problem: "Your sales team lands a major enterprise meeting, but the deal stalls behind a grueling 300-question security RFP.",
    solution: "Drop the questionnaire into ReguLattice. Our AI cross-references your existing Statement of Applicability and evidence to auto-fill the document in minutes, shortening sales cycles and freeing up engineering resources.",
  },
  {
    icon: Award,
    title: "First-Time ISO 27001 Certification",
    badge: "Startup Ready",
    problem: "You know you need ISO 27001 to scale, but the overhead of drafting policies, defining scope, and mapping controls feels insurmountable.",
    solution: "Use our AI-driven SoA & Policy Builder to instantly generate draft documents aligned with your business context. The Dynamic Readiness Engine tracks your progress daily, letting you know exactly when you're ready for a formal auditor.",
  },
  {
    icon: FolderSync,
    title: "Centralizing Fragmented Compliance",
    badge: "Unified Dashboard",
    problem: "Your compliance evidence is scattered across Google Drive, Slack, and dusty spreadsheets, making internal audits a nightmare.",
    solution: "Centralize your entire security posture. Link evidence directly to specific ISO 27001 controls. Keep your team aligned with automated task tracking and real-time risk treatment summaries, ensuring zero blind spots.",
  },
];

const UseCasesSection = () => (
  <section className="py-24 bg-surface-warm relative overflow-hidden">
    {/* Animated background */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 15% 85%, hsl(160 84% 39% / 0.04) 0%, transparent 45%), radial-gradient(circle at 85% 15%, hsl(210 100% 56% / 0.04) 0%, transparent 45%)`,
        }}
      />
      {/* Flowing dashed paths */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0,50 Q250,10 500,50 T1000,50" fill="none" stroke="hsl(160 84% 39% / 0.06)" strokeWidth="2" strokeDasharray="10 6" vectorEffect="non-scaling-stroke">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M0,80 Q300,40 600,80 T1200,80" fill="none" stroke="hsl(210 100% 56% / 0.05)" strokeWidth="1.5" strokeDasharray="8 8" vectorEffect="non-scaling-stroke">
          <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="5s" repeatCount="indefinite" />
        </path>
      </svg>
      <div className="absolute top-12 right-[8%] w-48 h-48 rounded-full border border-primary/[0.04] animate-pulse-ring" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-12 left-[8%] w-36 h-36 rounded-full border border-secondary/[0.04] animate-pulse-ring" style={{ animationDelay: "3s" }} />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">Built for Your Use Case</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Real-World Scenarios Where{" "}
          <span className="text-gradient">ReguLattice Delivers Value</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-glow hover:border-primary/30 transition-all"
          >
            {/* Header */}
            <div className="bg-hero p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                <uc.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-primary-foreground/70 font-medium">{uc.badge}</span>
                <h3 className="text-lg font-bold text-primary-foreground">{uc.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">The Problem</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{uc.problem}</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-5 h-5 text-primary rotate-90" />
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">The ReguLattice Solution</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{uc.solution}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCasesSection;
