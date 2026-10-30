import type { AnchorHTMLAttributes } from "react";

import { SANDBOX_URL } from "@/lib/booking";
import { sandboxHref, trackCta } from "@/lib/cta";

/**
 * Link to the developer sandbox. The campaign tags are added on click (not at render) so the
 * server- and client-rendered markup match.
 */
export function SandboxLink({
  placement,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { placement: string }) {
  return (
    <a
      {...props}
      href={SANDBOX_URL}
      onClick={(e) => {
        e.currentTarget.href = sandboxHref(placement);
        trackCta("sandbox", placement);
        onClick?.(e);
      }}
    />
  );
}
