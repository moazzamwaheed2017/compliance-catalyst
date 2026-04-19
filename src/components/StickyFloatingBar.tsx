import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const StickyFloatingBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling past the hero section (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto bg-[#0f172a]/95 backdrop-blur-md border border-primary/30 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,212,255,0.15)] p-2 md:p-3 flex items-center gap-3 md:gap-4 max-w-fit w-full sm:w-auto overflow-hidden">
             <div className="hidden md:block pl-2 text-sm font-semibold text-foreground whitespace-nowrap">
               Master ISO 27001 Today
             </div>
             <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://regulattice-pro.vercel.app/"
                className="flex flex-1 sm:flex-none justify-center items-center gap-1.5 bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(0,212,255,0.4)]"
             >
               <Zap className="w-4 h-4" /> Start Free Trial
             </motion.a>
             <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://calendly.com/moazzamwaheed/15min"
                className="hidden sm:flex justify-center items-center bg-transparent border border-primary/30 text-primary text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-primary/10 transition-colors"
             >
               Book Demo
             </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyFloatingBar;
