import type { Metadata } from "next";
import ForgeCaseStudy from "./ForgeCaseStudy";

export const metadata: Metadata = {
  title: "Forge — Morgan Johnson",
  description:
    "Architecting a 5-sided EdTech ecosystem: from investor pitch to a scalable information architecture, a full engineering handoff, and a live Next.js/Supabase application.",
};

/**
 * `metadata` only works in a server component, but the lightbox needs
 * client state — so this route just re-exports the interactive page.
 */
export default function Page() {
  return <ForgeCaseStudy />;
}
