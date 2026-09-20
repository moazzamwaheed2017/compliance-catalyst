import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BookingDialogProps {
  trigger: ReactNode;
  requestType: "Technical Demo" | "Developer Sandbox";
  title: string;
  description: string;
}

export function BookingDialog({ trigger, requestType, title, description }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const response = await fetch("/api/public/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          company: String(data.get("company") ?? ""),
          role: String(data.get("role") ?? ""),
          preferredTime: String(data.get("preferredTime") ?? ""),
          notes: String(data.get("notes") ?? ""),
        }),
      });
      if (!response.ok) throw new Error("request_failed");
      toast.success("Request received", {
        description: "Our team will confirm your session shortly.",
      });
      form.reset();
      setOpen(false);
    } catch {
      toast.error("We couldn't send your request", {
        description: "Please try again or email info@regulattice.com.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-extrabold">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 grid gap-4">
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="bd-name">Full name</Label>
              <Input id="bd-name" name="name" required autoComplete="name" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="bd-email">Work email</Label>
              <Input id="bd-email" name="email" type="email" required autoComplete="email" />
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="bd-company">Company</Label>
              <Input id="bd-company" name="company" required autoComplete="organization" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="bd-role">Role</Label>
              <Input id="bd-role" name="role" placeholder="Head of AI Governance" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bd-time">Preferred date &amp; time</Label>
            <Input id="bd-time" name="preferredTime" type="datetime-local" required />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bd-notes">What would you like to cover?</Label>
            <Textarea id="bd-notes" name="notes" rows={3} placeholder="Frameworks in scope, cloud footprint, timelines…" />
          </div>
          <Button type="submit" variant="hero" size="lg" disabled={submitting}>
            {submitting ? "Sending…" : "Submit request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
