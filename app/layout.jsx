import "./globals.css";

export const metadata = {
  title: "KAOS Starter | Kubernetes Multi-Agent System",
  description:
    "Deploy a coordinator agent, worker agents, hosted Ollama ModelAPI, MCP tools, and memory-ready KAOS resources on Kubernetes.",
  metadataBase: new URL("https://tirth1263.github.io/kaos-starter/")
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

