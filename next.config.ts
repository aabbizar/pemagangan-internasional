import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';
if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  const repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  // Only use basePath if it's not a user/org page (which are named username.github.io)
  if (!process.env.GITHUB_REPOSITORY.toLowerCase().endsWith('.github.io')) {
    repo = `/${repoName}`;
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: repo || undefined,
  assetPrefix: repo || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.21st.dev",
      },
      {
        protocol: "https",
        hostname: "www.crafterui.com",
      },
    ],
  },
};

export default nextConfig;
