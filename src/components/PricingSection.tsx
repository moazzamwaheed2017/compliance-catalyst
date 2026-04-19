import { motion } from "framer-motion";
import { Check, Star, Shield, Lock } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$79",
    desc: "The essential toolkit for growing teams to map compliance.",
    features: ["Up to 5 team members", "Unlimited AI mapping", "Basic reports", "Email support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$219",
    desc: "Advanced AI workflows and multilingual support to accelerate sales.",
    features: ["Unlimited team members", "Contract-Win Mode", "Urdu & Arabic training videos", "Priority support", "Clean report exports"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$349",
    desc: "Tailored compliance infrastructure and dedicated consulting.",
    features: ["Custom API access", "Dedicated account manager", "On-site audit prep", "Custom training content"],
    popular: false,
  },
];

const PricingSection = () => (
  <section className="py-24 relative overflow-hidden bg-[#060B14]">
    {/* Animated background */}
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 80%, rgba(0,212,255,0.05) 0%, transparent 40%), radial-gradient(circle at 30% 20%, rgba(16,185,129,0.05) 0%, transparent 40%)`,
        }}
      />
      {/* Animated dots grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,212,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-16 left-[5%] opacity-[0.03] animate-drift" style={{ animationDelay: "2s" }}>
        <Shield className="w-36 h-36 text-primary" />
      </div>
      <div className="absolute bottom-16 right-[5%] opacity-[0.03] animate-drift" style={{ animationDelay: "5s" }}>
        <Lock className="w-28 h-28 text-secondary" />
      </div>
    </div>

    <div className="container mx-auto px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-secondary text-sm font-mono tracking-widest uppercase mb-3 text-glow">Pricing</span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Scale Your <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>Security Posture</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-4">
          Every account begins with a <strong className="text-foreground">5-day free trial</strong> to map your compliance risk-free.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-end">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl flex flex-col backdrop-blur-sm transition-all ${
              p.popular
                ? "border border-primary bg-[#0f172a] shadow-[0_0_40px_rgba(0,212,255,0.15)] md:-translate-y-4 pt-10 pb-8 px-8"
                : "border border-border bg-card/80 p-8 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.05)]"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1.5 rounded text-xs font-mono font-bold text-primary-foreground flex items-center gap-2 shadow-[0_0_15px_rgba(0,212,255,0.6)]">
                <Star className="w-3.5 h-3.5 fill-current" /> MOST CHOSEN
              </div>
            )}
            <h3 className={`text-xl font-bold mb-1 font-mono uppercase tracking-wider ${p.popular ? 'text-primary' : 'text-foreground'}`}>{p.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">{p.price}</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">{p.desc}</p>
            <ul className="space-y-4 mb-8 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" style={{ filter: "drop-shadow(0 0 5px rgba(16,185,129,0.5))" }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://regulattice-pro.vercel.app/"
              className={`inline-flex items-center justify-center rounded uppercase tracking-wider font-bold text-sm px-6 py-4 transition-all text-center font-mono ${
                p.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                  : "bg-secondary/10 text-secondary border border-secondary/50 hover:bg-secondary hover:text-secondary-foreground hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              }`}
            >
              Get Started
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
