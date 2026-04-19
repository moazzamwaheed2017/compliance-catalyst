import { useState } from "react";
import { Menu, X, ShieldCheck } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Timeline", href: "#how-it-works" },
  { label: "Live Demo", href: "#demo" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1428]/90 backdrop-blur-lg border-b border-primary/20 shadow-[0_4px_30px_rgba(0,212,255,0.05)]">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        <a href="#" className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
          <ShieldCheck className="w-8 h-8 text-primary shadow-shadow-glow" style={{ filter: "drop-shadow(0 0 8px rgba(0,212,255,0.5))" }} />
          ReguLattice
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-mono tracking-wide text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="https://regulattice-pro.vercel.app/"
            className="flex items-center gap-2 bg-primary/10 border border-primary/50 text-primary text-sm font-mono font-bold px-5 py-2.5 rounded hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
          >
            Terminal Access
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-primary">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0A1428] border-t border-primary/20 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-sm font-mono tracking-wide text-muted-foreground hover:text-primary">
              {l.label}
            </a>
          ))}
          <a href="https://regulattice-pro.vercel.app/" className="block bg-primary/10 border border-primary/50 text-primary text-sm font-mono font-bold px-5 py-2.5 rounded text-center">
            Terminal Access
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
