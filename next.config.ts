import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // node-ical (and its temporal-polyfill dependency) breaks when bundled by
  // the Server Components bundler — keep it as a native Node require instead.
  serverExternalPackages: ["node-ical"],
  // Lets the dev server's assets/HMR load when opened from another device on
  // the LAN (e.g. testing on a phone via this machine's local IP) — without
  // this, Next.js blocks those cross-origin dev requests with a 403. Update
  // this if the machine's local network IP changes (shown as "Network:" in
  // the `npm run dev` startup log).
  allowedDevOrigins: ["192.168.178.26", "172.20.10.4"],
};

export default nextConfig;
