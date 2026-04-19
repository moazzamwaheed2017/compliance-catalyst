import { motion } from "framer-motion";
import { Building2, Command, Network, Quote } from "lucide-react";

const stories = [
  {
    logo: Building2,
    company: "FinSecure Tech",
    metric: "RFP time reduced 85%",
    quote: "ReguLattice completely transformed how we handle enterprise deals. What used to be a 3-week grueling process of answering security questionnaires is now a 48-hour automated workflow.",
    result: "Security team achieved ISO 27001 readiness in 18 days.",
    author: "Alex Morgan, CISO",
  },
  {
    logo: Network,
    company: "CloudScale Systems",
    metric: "100% Control Traceability",
    quote: "Internal audits were a nightmare before ReguLattice. The AI mapping gives us absolute confidence when jumping into external audits. We haven't had a single major non-conformity.",
    result: "Passed SOC 2 & ISO 27001 zero findings.",
    author: "Sarah Lin, Head of Governance",
  },
  {
    logo: Command,
    company: "Nexus Data",
    metric: "Deals accelerated by 3x",
    quote: "The ability to instantly show prospects our live compliance score and auto-fill their custom RFPs has unblocked millions in enterprise pipeline.",
    result: "$4.5M in enterprise contracts closed faster.",
    author: "James Reed, VP of Sales",
  },
];

const CustomerStories = () => (
  <section className="py-24 bg-background relative overflow-hidden">
    {/* Grid Background */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <div style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} className="w-full h-full" />
    </div>

    <div className="container mx-auto px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-secondary text-sm font-mono tracking-widest uppercase mb-3 text-glow">Case Studies</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          How Teams Secure <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>Enterprise Trust</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stories.map((story, i) => (
          <motion.div
            key={story.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group rounded-2xl border border-border bg-card p-8 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-[0_0_0_rgba(0,212,255,0)] hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] relative overflow-hidden"
          >
            {/* Top right metric badge */}
            <div className="absolute top-6 right-6 inline-flex bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono font-bold px-3 py-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              {story.metric}
            </div>

            <div className="mb-6 mt-8">
              <Quote className="w-8 h-8 text-border mb-4 opacity-50 group-hover:text-primary transition-colors" />
              <p className="text-foreground leading-relaxed italic relative z-10 text-sm">"{story.quote}"</p>
              <div className="mt-6 p-3 rounded bg-[#0a1428] border border-primary/20 text-xs text-primary font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                &gt; TARGET_ACHIEVED: {story.result}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
              <div className="w-10 h-10 rounded bg-[#0a1428] border border-border flex items-center justify-center shrink-0 group-hover:border-primary transition-colors">
                <story.logo className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h4 className="font-bold text-foreground font-mono">{story.company}</h4>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{story.author}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CustomerStories;
