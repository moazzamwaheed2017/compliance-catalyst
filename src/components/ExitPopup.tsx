import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, FileText, X } from "lucide-react";

const ExitPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        // Optional: save to local storage to not show again for some time
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVisible(false)}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-[#0A1428] border border-primary/30 rounded-2xl shadow-[0_0_40px_rgba(0,212,255,0.2)] overflow-hidden z-10 p-8 text-center"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary shadow-shadow-glow" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-3 font-display">
            Don't leave your compliance to chance.
          </h3>
          <p className="text-muted-foreground text-sm mb-8 px-4 leading-relaxed">
            Get our <span className="text-primary font-bold">Free ISO 27001 RFP Response Template</span> directly in your inbox. See exactly how top enterprises win their security audits.
          </p>

          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setIsVisible(false); }}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <input 
                type="email" 
                required 
                placeholder="Enter your work email" 
                className="w-full bg-[#111827] border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg flex justify-center items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            >
              Get The Template Securely
            </button>
          </form>
          
          <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">100% Secure. No spam.</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExitPopup;
