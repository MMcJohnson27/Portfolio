import { Hero } from "@/components/site/Hero";
import { CaseStudies } from "@/components/site/CaseStudies";
import { Shorts } from "@/components/site/Shorts";

/**
 * Identity, work, sign-off. <Footer> lives in the layout so future
 * case-study routes inherit it.
 *
 * SHORTS IS PARKED, NOT REMOVED. It ships when the videos are recorded; the
 * section, its grid and its content all still build. To bring it back: flip
 * SHOW_SHORTS, restore the nav entry in `lib/content.ts`, and put the Contact
 * index back to "04" so the section numbering runs 02 / 03 / 04 again.
 */
const SHOW_SHORTS = false;

export default function Home() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      {SHOW_SHORTS ? <Shorts /> : null}
    </main>
  );
}
