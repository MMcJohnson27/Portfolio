import type { Metadata } from "next";
import FitlogsCaseStudy from "./FitlogsCaseStudy";

export const metadata: Metadata = {
  title: "Fitlogs — Morgan Johnson",
  description:
    "A data-driven approach to holistic fitness tracking: a nutrition and strength-training ecosystem built from academic UX research, now in AI-assisted development.",
};

/**
 * `metadata` only works in a server component, but the lightbox needs
 * client state — so this route just re-exports the interactive page.
 */
export default function Page() {
  return <FitlogsCaseStudy />;
}
