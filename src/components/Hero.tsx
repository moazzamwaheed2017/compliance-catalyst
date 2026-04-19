import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, CheckCircle, ShieldCheck, Zap } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-[95vh] bg-background overflow-hidden flex items-center pt-20">
    {/* Animated digital network background */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        animation: "grid-fade 8s ease-in-out infinite",
      }}
    />

    {/* Faint scanning lines */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-scan-line" />
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-scan-line" style={{ animationDelay: "3s" }} />
    </div>

    {/* Glowing orb accents */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse-ring" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-ring" style={{ animationDelay: "2s" }} />
    </div>

    <div className="container mx-auto px-6 relative z-10 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
        
        {/* Left Side: Copy & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" /> Next-Gen Compliance
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6">
            Master ISO 27001. <br />
            <span className="text-primary" style={{ textShadow: "0 0 30px rgba(0,212,255,0.4)" }}>Secure Enterprise Deals.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
            AI-powered compliance that turns security requirements into closed contracts—real-time readiness scores, automated evidence, and RFP responses that win audits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a
              href="https://regulattice-pro.vercel.app/"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold px-8 py-4 text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] border border-primary"
            >
              Start 5-Day Free Trial
            </a>
            <a
              href="https://calendly.com/moazzamwaheed/15min"
              className="inline-flex items-center justify-center rounded-lg border-2 border-border text-foreground font-bold px-8 py-4 text-lg hover:bg-white/5 hover:border-primary/50 transition-all group"
            >
              Book a 15-Min Demo
            </a>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground border-t border-border/50 pt-6">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> ISO 27001 Accelerated</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-primary" /> SOC 2 Ready</span>
            <span className="w-1 h-1 rounded-full bg-border hidden sm:block"></span>
            <span className="hidden sm:flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Trusted by Security Teams</span>
          </div>
        </motion.div>

        {/* Right Side: Cyber Secure Dashboard Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full relative"
        >
          <div className="relative rounded-2xl border border-primary/30 bg-[#0A1428]/80 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/80"></div>
              </div>
              <div className="text-xs font-mono text-primary/70 bg-primary/10 px-2 py-1 rounded">ReguLattice_Secure_Terminal_v2.0</div>
            </div>

            {/* Content area */}
            <div className="space-y-6">
              {/* Dropped Document */}
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center shrink-0">
                  <FileCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Enterprise_RFP_Questionnaire.docx</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">Incoming security vendor assessment from Acme Corp...</p>
                </div>
              </div>

              {/* Parsing Animation */}
              <div className="relative h-12 flex items-center px-4 rounded border border-primary/20 bg-primary/5 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[scan-line_2s_linear_infinite_rotate-90]" />
                <span className="text-primary font-mono text-xs z-10 flex items-center gap-2">
                  <Lock className="w-3 h-3 animate-pulse" /> AI scanning controls against internal SoA...
                </span>
              </div>

              {/* Confidence Score Output */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card border border-border flex flex-col items-center justify-center text-center">
                  <Shield className="w-8 h-8 text-secondary mb-2" style={{ filter: "drop-shadow(0 0 8px rgba(16,185,129,0.5))" }} />
                  <div className="text-2xl font-bold text-foreground">98.5%</div>
                  <div className="text-xs text-muted-foreground mt-1">Confidence Score</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border flex flex-col justify-center gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Source Citations</span>
                    <span className="text-xs font-semibold text-primary">Found</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div className="bg-primary h-1.5 rounded-full w-[90%] shadow-[0_0_10px_rgba(0,212,255,0.5)]"></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground mt-1">
                    <CheckCircle className="w-3 h-3 text-secondary" /> Control A.8.1.1
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-card border border-primary/30 p-4 rounded-xl shadow-[0_0_20px_rgba(0,212,255,0.2)] flex items-center gap-4 animate-float">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Audit Ready</div>
              <div className="text-xs text-muted-foreground">Responses generated</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

export default Hero;
