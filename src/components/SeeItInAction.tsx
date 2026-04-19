import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Scan, CheckCircle, ChevronRight, Lock } from "lucide-react";

const SeeItInAction = () => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");

  const handleScan = () => {
    if (!query) return;
    setStatus("scanning");
    setTimeout(() => {
      setStatus("done");
    }, 2500);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)"
        }} className="absolute inset-0 opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            See It In <span className="text-primary" style={{ textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>Action</span>
          </h2>
          <p className="text-muted-foreground text-lg">Experience the power of ReguLattice Contract-Win Mode™ instantly.</p>
        </div>

        {/* Secure Terminal UI */}
        <div className="rounded-xl border border-primary/30 bg-card overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.1)]">
          {/* Terminal Header */}
          <div className="bg-[#0f172a] border-b border-primary/20 px-4 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-secondary/80" />
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary/70">
              <Lock className="w-3 h-3" /> Secure AI Terminal
            </div>
          </div>

          <div className="p-6 md:p-8">
            {status === "idle" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-primary shrink-0 mt-3" />
                  <div className="flex-1">
                    <label className="text-sm font-mono text-primary block mb-2">TARGET_QUERY: Paste sample RFP question</label>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Describe your process for ensuring encryption of data at rest."
                      className="w-full bg-[#0a1428] border border-primary/30 rounded p-4 text-foreground text-sm font-mono focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none min-h-[120px]"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleScan}
                    disabled={!query}
                    className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded hover:bg-primary/90 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                  >
                    <Scan className="w-4 h-4" /> Execute Scan
                  </button>
                </div>
              </motion.div>
            )}

            {status === "scanning" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <Shield className="w-16 h-16 text-primary/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-t-2 border-primary animate-spin" />
                  </div>
                  <Scan className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="font-mono text-sm text-primary animate-pulse">Running semantic scan against ISO 27001 policies...</div>
              </motion.div>
            )}

            {status === "done" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                {/* Confidence Bar */}
                <div className="bg-[#0a1428] border border-border rounded p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-secondary shadow-shadow-glow" style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.5))" }} />
                    <div>
                      <div className="text-secondary font-bold font-mono">CONFIDENCE: 98.5%</div>
                      <div className="text-xs text-muted-foreground font-mono">Matched against: Information Security Policy v2.4</div>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="border border-primary/20 bg-primary/5 rounded p-5">
                  <p className="text-sm leading-relaxed text-foreground/90 font-mono">
                    <span className="text-primary font-bold">» SYSTEM.RESPONSE: </span>
                    All customer data at rest is encrypted using AES-256 bit encryption within our secure cloud infrastructure. Cryptographic keys are managed via AWS KMS with strict logical separation...
                  </p>
                </div>

                {/* Citations */}
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-2 uppercase tracking-wide">Validated Controls (Found)</div>
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary text-xs rounded px-3 py-1.5 font-mono">
                      <CheckCircle className="w-3 h-3" /> A.10.1.1 Policy on the Use of Cryptographic Controls
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 text-secondary text-xs rounded px-3 py-1.5 font-mono">
                      <CheckCircle className="w-3 h-3" /> A.10.1.2 Key Management
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border mt-6">
                  <button onClick={() => { setQuery(""); setStatus("idle"); }} className="text-sm text-muted-foreground hover:text-foreground font-mono underline decoration-border underline-offset-4">RESET_TERMINAL</button>
                  <a href="https://regulattice-pro.vercel.app/" className="flex items-center gap-1 font-mono text-primary text-sm hover:text-primary/80 transition-colors">START_FULL_TRIAL <ChevronRight className="w-4 h-4" /></a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeeItInAction;
