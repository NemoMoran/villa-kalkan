import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // node-ical (and its temporal-polyfill dependency) breaks when bundled by
  // the Server Components bundler — keep it as a native Node require instead.
  serverExternalPackages: ["node-ical"],
};

export default nextConfig;
