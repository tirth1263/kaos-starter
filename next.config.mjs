const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? "/kaos-starter" : "",
  assetPrefix: isGitHubPages ? "/kaos-starter/" : undefined
};

export default nextConfig;

