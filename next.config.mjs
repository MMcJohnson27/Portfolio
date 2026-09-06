/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The tech-stack marks are trusted, locally-authored SVGs under
    // public/ — next/image blocks SVG optimization by default since it can
    // execute scripts if served untrusted, so this is scoped narrowly with
    // a CSP that disables scripts on the served asset.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
