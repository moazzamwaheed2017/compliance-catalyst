import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  ChevronDown,
  Code2,
  EyeOff,
  Gauge,
  Instagram,
  Layers,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

import logoAsset from "@/assets/regulattice-logo.jpg";
import { BookingWindow } from "@/components/site/booking-window";
import { SandboxLink } from "@/components/site/sandbox-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackCta } from "@/lib/cta";
import { CONTACT_EMAIL, ENTITY_DEFINITION } from "@/lib/seo";

/* ----------------------------- Navigation ----------------------------- */

type NavItem = { label: string } & ({ to: string } | { href: string });

/** Main menu: each item maps to a section of the homepage. */
export const sectionItems: { id: string; label: string }[] = [
  { id: "how-it-works", label: "How it works" },
  { id: "platform", label: "Platform" },
  { id: "use-cases", label: "Use cases" },
  { id: "architecture", label: "Architecture" },
  { id: "frameworks", label: "Frameworks" },
  { id: "integrations", label: "Integrations" },
  { id: "faq", label: "FAQ" },
];

type ResourcePath =
  | "/ai-governance-platform"
  | "/shadow-ai"
  | "/ai-agent-governance"
  | "/ai-governance-readiness"
  | "/about";

/** Guides and company pages, combined into one "Resources" menu. */
export const resourceGroups: {
  title: string;
  items: { to: ResourcePath; label: string; text: string; icon: typeof Layers }[];
}[] = [
  {
    title: "Guides",
    items: [
      {
        to: "/ai-governance-platform",
        label: "AI governance platform",
        text: "What it is, capabilities and how to choose one",
        icon: Layers,
      },
      {
        to: "/shadow-ai",
        label: "Shadow AI",
        text: "Discover and govern AI you don't know about",
        icon: EyeOff,
      },
      {
        to: "/ai-agent-governance",
        label: "AI agents",
        text: "Controls and human oversight for AI agents",
        icon: Bot,
      },
      {
        to: "/ai-governance-readiness",
        label: "Readiness check",
        text: "Score your AI governance in 3 minutes",
        icon: Gauge,
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        to: "/about",
        label: "About ReguLattice",
        text: "Our mission, principles and approach",
        icon: Building2,
      },
    ],
  },
];

const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: "Platform",
    items: sectionItems.map((s) => ({ href: `/#${s.id}`, label: s.label })),
  },
  {
    title: "Guides",
    items: [
      { to: "/ai-governance-platform", label: "What is an AI governance platform?" },
      { to: "/shadow-ai", label: "Shadow AI governance" },
      { to: "/ai-agent-governance", label: "AI agent governance" },
      { to: "/ai-governance-readiness", label: "AI governance readiness check" },
    ],
  },
];

/** Highlights the homepage section currently in view. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") {
      setActive(null);
      return;
    }
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const s of sectionItems) {
          const r = visible.get(s.id) ?? 0;
          if (r > bestRatio) {
            best = s.id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] },
    );
    for (const s of sectionItems) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

function ResourcesMenu() {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="group flex items-center gap-1 rounded-full px-3 py-1.5 outline-none transition-colors hover:bg-foreground/[0.05] hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring data-[state=open]:text-foreground">
        Resources
        <ChevronDown className="size-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        align="end"
        sideOffset={14}
        className="z-50 w-[560px] rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-[0_24px_60px_-20px_oklch(0_0_0/0.45)] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
      >
        <div className="grid grid-cols-[1.4fr_1fr] gap-3">
          {resourceGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {group.title}
              </div>
              {group.items.map(({ to, label, text, icon: Icon }) => (
                <DropdownMenu.Item key={to} asChild>
                  <Link
                    to={to}
                    className="flex gap-3 rounded-xl p-3 outline-none transition-colors hover:bg-foreground/[0.05] focus:bg-foreground/[0.05]"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">{label}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
                        {text}
                      </span>
                    </span>
                  </Link>
                </DropdownMenu.Item>
              ))}
            </div>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function NavLink({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className: string;
  onClick?: () => void;
}) {
  if ("to" in item) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="ReguLattice home">
      <img
        src={logoAsset}
        alt="ReguLattice logo"
        className={`${compact ? "size-8" : "size-9"} rounded-lg object-cover ring-1 ring-white/10`}
      />
      <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
        Regu<span className="text-gradient">Lattice</span>
      </span>
    </Link>
  );
}

/* --------------------------- Demo requests ---------------------------- */

/** Request type that opens the booking calendar instead of the email form. */
const DEMO_REQUEST = "Schedule Technical Demo";

const DemoRequestContext = createContext<(type: string, placement?: string) => void>(() => {});

/** Opens the demo / access request dialog from anywhere inside <DemoRequestProvider>. */
export function useDemoRequest() {
  return useContext(DemoRequestContext);
}

export function DemoRequestProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestType, setRequestType] = useState("Schedule Technical Demo");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);

  // Demo bookings go to the calendar; access and sandbox requests use the email form.
  const openDemoModal = (type: string, placement = "unspecified") => {
    trackCta(type === DEMO_REQUEST ? "demo" : "request", placement);
    if (type === DEMO_REQUEST) {
      setBookingOpen(true);
      return;
    }
    setRequestType(type);
    setDialogOpen(true);
  };

  const requestInstead = () => {
    setBookingOpen(false);
    setRequestType(DEMO_REQUEST);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/public/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        toast.success(
          requestType.includes("Sandbox")
            ? "Developer sandbox requested! Check your email shortly for API keys."
            : "Request sent! Notification dispatched to the ReguLattice Team.",
        );
        setDialogOpen(false);
        setFormData({ name: "", email: "", company: "", role: "", notes: "" });
      } else {
        toast.error(data.details || "Failed to send request. Please try again.");
      }
    } catch {
      toast.error("Network error sending demo request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DemoRequestContext.Provider value={openDemoModal}>
      {children}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass rounded-2xl border-white/10 bg-popover/95 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              {requestType}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Complete details below to submit your request. An instant notification will be sent
              directly to the <strong className="text-foreground">ReguLattice Team</strong>.
            </DialogDescription>
          </DialogHeader>

          {requestType.includes("Sandbox") && (
            <div className="mt-2 rounded-xl border border-primary/30 bg-primary/10 p-3.5 text-xs flex items-center gap-3 text-primary">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div>
                <div className="font-bold text-foreground">Free Developer Sandbox</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Includes full access to ReguLattice GRC API, live telemetry Flight Recorder, and
                  pre-loaded test schemas. Zero credit card required.
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs font-mono uppercase text-muted-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Jane Doe"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="border-white/10 bg-background/60"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-mono uppercase text-muted-foreground">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="border-white/10 bg-background/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="company"
                  className="text-xs font-mono uppercase text-muted-foreground"
                >
                  Company
                </Label>
                <Input
                  id="company"
                  placeholder="Enterprise Inc."
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  className="border-white/10 bg-background/60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs font-mono uppercase text-muted-foreground">
                  Job Title / Role
                </Label>
                <Input
                  id="role"
                  placeholder="CTO / CISO / Lead"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="border-white/10 bg-background/60"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes" className="text-xs font-mono uppercase text-muted-foreground">
                Requirements / Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder={
                  requestType.includes("Design Partner")
                    ? "What AI governance problem would you like to work on with us?"
                    : "Tell us about your AI footprint or compliance target..."
                }
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="resize-none border-white/10 bg-background/60"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" /> Sending Notification...
                  </>
                ) : requestType.includes("Sandbox") ? (
                  <>
                    Start Free Sandbox <ArrowRight className="ml-2 size-4" />
                  </>
                ) : (
                  <>
                    Submit Request &amp; Dispatch Email <ArrowRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <BookingWindow
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onRequestInstead={requestInstead}
      />
    </DemoRequestContext.Provider>
  );
}

/* ------------------------------- Header ------------------------------- */

export function SiteHeader() {
  const openRequest = useDemoRequest();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 pl-4 transition-all duration-500 ${
          scrolled || open
            ? "glass bg-background/85 shadow-[0_10px_40px_-10px_oklch(0_0_0/0.6)]"
            : "border border-transparent"
        }`}
        aria-label="Main navigation"
      >
        <Brand />
        <div className="hidden items-center gap-0.5 text-sm text-muted-foreground xl:flex">
          {sectionItems.map((s) => {
            const active = activeSection === s.id;
            return (
              <a
                key={s.id}
                href={`/#${s.id}`}
                aria-current={active ? "location" : undefined}
                className={`rounded-full px-3 py-1.5 transition-colors hover:bg-foreground/[0.05] hover:text-foreground ${
                  active ? "bg-foreground/[0.06] text-foreground" : ""
                }`}
              >
                {s.label}
              </a>
            );
          })}
          <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />
          <ResourcesMenu />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ink"
            size="sm"
            className="h-9 px-4"
            onClick={() => openRequest("Request Access", "header")}
          >
            Request access
          </Button>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/[0.05] xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="mx-auto mt-2 max-h-[80vh] max-w-6xl overflow-y-auto rounded-2xl border border-border bg-background p-2 shadow-[0_24px_60px_-20px_oklch(0_0_0/0.45)] xl:hidden">
          <div className="grid gap-1 sm:grid-cols-2">
            {sectionItems.map((s) => (
              <a
                key={s.id}
                href={`/#${s.id}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="mt-1 border-t border-border pt-1">
            <div className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Resources
            </div>
            {resourceGroups
              .flatMap((g) => g.items)
              .map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground"
                >
                  <Icon className="size-4 text-primary" /> {label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------- Footer ------------------------------- */

export function SiteFooter() {
  const openRequest = useDemoRequest();
  const linkClass = "text-muted-foreground transition-colors hover:text-foreground";
  return (
    <footer className="relative border-t border-white/[0.06] px-5 pb-10 pt-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand compact />
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              {ENTITY_DEFINITION}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: `mailto:${CONTACT_EMAIL}`, icon: Mail, label: "Email" },
                {
                  href: "https://www.linkedin.com/company/regulattice/",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://www.instagram.com/regulattice/",
                  icon: Instagram,
                  label: "Instagram",
                },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <NavLink item={item} className={linkClass} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground/70">
              Company
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/about" className={linkClass}>
                  About ReguLattice
                </Link>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/regulattice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 ${linkClass}`}
                >
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openRequest("Schedule Technical Demo", "footer")}
                  className={linkClass}
                >
                  Book a demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 font-mono text-[11px] text-muted-foreground/70 sm:flex-row">
          <span>© 2026 ReguLattice Inc. All rights reserved.</span>
          <span>ReguLattice · AI governance platform</span>
        </div>
      </div>
    </footer>
  );
}

/** Page chrome shared by every route: header, footer and the demo request dialog. */
/** Demo + sandbox bar that follows the visitor once they scroll past the first screen. */
function StickyCta() {
  const openRequest = useDemoRequest();
  const [scrolledIn, setScrolledIn] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const visible = scrolledIn && !videoPlaying;

  useEffect(() => {
    const update = () => {
      const nearBottom =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 480;
      setScrolledIn(window.scrollY > 640 && !nearBottom);
    };
    // Media events don't bubble, so listen in the capture phase; hide while a video plays.
    const onPlay = () => setVideoPlaying(true);
    const onStop = () => setVideoPlaying(false);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    document.addEventListener("play", onPlay, true);
    document.addEventListener("pause", onStop, true);
    document.addEventListener("ended", onStop, true);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("play", onPlay, true);
      document.removeEventListener("pause", onStop, true);
      document.removeEventListener("ended", onStop, true);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 sm:bottom-4 sm:px-0 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <div className="glass mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-popover/90 p-2 shadow-2xl sm:gap-3 sm:rounded-full sm:pl-5">
        <span className="hidden flex-1 text-sm text-muted-foreground sm:block">
          Find the AI you didn&apos;t approve.
        </span>
        <Button
          variant="ink"
          size="sm"
          className="h-10 flex-1 px-4 sm:flex-none"
          tabIndex={visible ? 0 : -1}
          onClick={() => openRequest(DEMO_REQUEST, "sticky-bar")}
        >
          Book a demo
        </Button>
        <Button asChild variant="architectural" size="sm" className="h-10 flex-1 px-4 sm:flex-none">
          <SandboxLink placement="sticky-bar" tabIndex={visible ? 0 : -1}>
            <Code2 className="size-4" /> Try sandbox
          </SandboxLink>
        </Button>
      </div>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <DemoRequestProvider>
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyCta />
      </div>
    </DemoRequestProvider>
  );
}
