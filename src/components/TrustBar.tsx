import { motion } from "framer-motion";
import { ShieldCheck, Server, Key, Hexagon, Component, HardDrive } from "lucide-react";

const metrics = [
  { value: "47+", label: "Organizations Protected" },
  { value: "$18M+", label: "Deals Accelerated" },
  { value: "0", label: "Audit Failures" },
];

const logos = [
  { icon: Server, name: "DataCore" },
  { icon: Key, name: "AuthNet" },
  { icon: Hexagon, name: "HexaSec" },
  { icon: Component, name: "LogicNode" },
  { icon: HardDrive, name: "VaultSystems" },
];

const TrustBar = () => (
  <section className="py-20 bg-[#060B14] relative border-y border-border">
    <div className="container mx-auto px-6 relative z-10 w-full">
      {/* Metrics Row */}
      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border/50 justify-center items-center max-w-4xl mx-auto mb-16">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-1 text-center py-6 md:py-0 md:px-8 w-full block"
          >
            <div className="text-4xl lg:text-5xl font-extrabold text-primary font-mono mb-2 drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]">
              {m.value}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-widest font-semibold flex flex-col items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary/70" />
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logos Row */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">Trusted by Global Security Teams</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 mix-blend-screen">
          {logos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] filter grayscale hover:grayscale-0">
              <logo.icon className="w-6 h-6" />
              <span className="font-bold text-lg font-display tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrustBar;
