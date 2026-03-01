import type { NextConfig } from "next";

const isOnline = process.env.APP_DISTRO === 'online';

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: isOnline ? './online/tsconfig.json' : 'tsconfig.json',
  },
  output: isOnline ? 'standalone' : 'export',
  ...(!isOnline && {
    basePath: '/PostCan'
  })
};

export default nextConfig;
