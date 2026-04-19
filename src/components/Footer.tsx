import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#040810] text-[#00D4FF]/70 py-16 border-t border-[#00D4FF]/20 relative overflow-hidden">
    {/* Grid effect */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(0, 212, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 1) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#00D4FF]" /> ReguLattice
          </h3>
          <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground">Secure Enterprise Growth</p>
        </div>
        <div>
          <h4 className="font-mono text-[#00D4FF] mb-4 font-bold tracking-widest">HQ_LOCATION</h4>
          <p className="flex items-start gap-2 text-sm text-muted-foreground w-max font-mono hover:text-[#00D4FF] transition-colors cursor-default">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#10B981]" />
            271 BMCHS, Karachi, Pakistan
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[#00D4FF] mb-4 font-bold tracking-widest">COMMS_LINK</h4>
          <p className="flex items-center gap-2 text-sm mb-3 text-muted-foreground font-mono hover:text-[#00D4FF] transition-colors cursor-pointer">
            <Phone className="w-4 h-4 text-[#10B981]" /> +92 3346250250
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground font-mono hover:text-[#00D4FF] transition-colors cursor-pointer">
            <Mail className="w-4 h-4 text-[#10B981]" /> info@regulattice.com
          </p>
        </div>
      </div>
      <div className="border-t border-[#00D4FF]/10 pt-8 text-xs text-center text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono">SYS_MSG: ReguLattice assists ISMS preparation. Final certification remains the responsibility of the organization.</p>
        <p className="font-mono bg-[#00D4FF]/10 px-3 py-1 rounded text-[#00D4FF]">© {new Date().getFullYear()} REGULATTICE. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
