"use client";

import { usePathname } from "next/navigation";
import { footer, identity, sections } from "@/lib/content";

/**
 * FOOTER — the sign-off.
 * Index, label, name, one role line, three links and a rule. No location —
 * the page ends on the same hairline it started on.
 *
 * The "03" index only makes sense as a continuation of the homepage's
 * numbered section spine (Index, Selected work, Contact) — on a case study
 * route there's no such spine to continue, so the number is dropped there
 * and the footer just reads "CONTACT".
 */
export function Footer() {
  const s = sections.contact;
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const showSectionNumber = pathname === "/";

  return (
    <footer id={s.id} className="border-t border-rule">
      <div className="mx-auto max-w-shell px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-6">
          {/* ---- sign-off ---- */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              {showSectionNumber ? (
                <>
                  <span className="label tabular-nums text-clay">{s.index}</span>
                  <span className="h-px w-8 bg-rule" />
                </>
              ) : null}
              <span className="label">{s.title}</span>
            </div>

            <p className="mt-7 font-display text-4xl tracking-tight text-ink md:text-5xl">
              {identity.name}
            </p>
            <p className="mt-3 text-[15px] text-ink-soft">{identity.role}</p>
          </div>

          {/* ---- links ---- */}
          <dl className="md:col-span-6 md:col-start-7">
            {footer.links.map((l) => {
              // mailto hands off to a mail client; the profile and the PDF both
              // leave the page, so they get their own tab.
              const leavesSite = Boolean(l.href) && !l.href!.startsWith("mailto:");
              return (
              <div
                key={l.label}
                className="flex items-baseline justify-between gap-6 border-b border-rule py-4 first:border-t"
              >
                <dt className="label shrink-0">{l.label}</dt>
                <dd className="min-w-0 truncate text-right text-[15px]">
                  {l.href ? (
                    <a
                      href={l.href}
                      className="rule-draw text-ink transition-colors duration-300 ease-editorial hover:text-clay"
                      {...(leavesSite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.value}
                    </a>
                  ) : (
                    <span className="text-ink-faint">{l.value}</span>
                  )}
                </dd>
              </div>
              );
            })}
          </dl>
        </div>

        {/* ---- colophon ---- */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule pt-6 md:mt-24">
          <span className="label">
            © {year} {footer.rights}
          </span>
          <a
            href={`/#${sections.index.id}`}
            className="rule-draw label inline-flex items-center gap-2 text-ink transition-colors duration-300 ease-editorial hover:text-clay"
          >
            Back to top
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <path d="M4.5 9V1M1 4.5L4.5 1L8 4.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
