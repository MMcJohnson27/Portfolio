import type { Metadata } from "next";
import CognativCaseStudy from "./CognativCaseStudy";

export const metadata: Metadata = {
  title: "Cognativ — Morgan Johnson",
  description:
    "A research-driven structural redesign: from a competitive audit and executive buy-in to a scalable information architecture that survived a business model pivot.",
};

/**
 * `metadata` only works in a server component, but the lightbox needs
 * client state — so this route just re-exports the interactive page.
 */
export default function Page() {
  return <CognativCaseStudy />;
}
