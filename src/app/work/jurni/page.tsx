import type { Metadata } from "next";
import JurniCaseStudy from "./JurniCaseStudy";

export const metadata: Metadata = {
  title: "Jurni — Morgan Johnson",
  description:
    "A data-driven GLP-1 ecosystem: from an 18-competitor audit to a handed-off MVP pairing clinical tracking, AI guidance, and curated commerce.",
};

/**
 * `metadata` only works in a server component, but the lightbox needs
 * client state — so this route just re-exports the interactive page.
 */
export default function Page() {
  return <JurniCaseStudy />;
}
