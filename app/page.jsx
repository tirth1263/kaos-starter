import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Terminal,
  Wrench
} from "lucide-react";
import { ArchitectureMap } from "../components/ArchitectureMap";

const resources = [
  {
    icon: Cloud,
    title: "Hosted ModelAPI",
    text: "Ollama runs inside the cluster with SmolLM2 135M for a no-external-key default path."
  },
  {
    icon: BrainCircuit,
    title: "Coordinator Agent",
    text: "The coordinator receives the user task, selects the right worker, and keeps the response clear."
  },
  {
    icon: Bot,
    title: "Worker Agents",
    text: "Worker 1 handles general work while Worker 2 focuses on calculation and analysis tasks."
  },
  {
    icon: Wrench,
    title: "MCP Tools",
    text: "Echo and calculator MCP servers demonstrate tool wiring through KAOS custom resources."
  }
];

const steps = [
  {
    label: "Install",
    command:
      "helm upgrade --install kaos kaos/kaos-operator --namespace kaos-system --version v0.1.3 --create-namespace"
  },
  {
    label: "Deploy",
    command: "kubectl apply -f manifests/multi-agent-system.yaml"
  },
  {
    label: "Watch",
    command: "kubectl get agent,modelapi,mcpserver -n kaos-demo -w"
  },
  {
    label: "Chat",
    command: "kubectl port-forward -n kaos-demo svc/agent-coordinator 8080:8000"
  }
];

const files = [
  "manifests/multi-agent-system.yaml",
  "manifests/nebius-proxy-system.yaml",
  "scripts/install-kaos.sh",
  "scripts/deploy.sh",
  "docs/architecture.md",
  "examples/delegation-task.json"
];

export default function Home() {
  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#">
          <Network size={22} aria-hidden="true" />
          <span>KAOS Starter</span>
        </a>
        <div className="navlinks">
          <a href="#deploy">Deploy</a>
          <a href="#resources">Resources</a>
          <a href="https://github.com/tirth1263/kaos-starter">
            <Code2 size={18} aria-hidden="true" />
            GitHub
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Kubernetes-native multi-agent orchestration</p>
          <h1>KAOS Starter</h1>
          <p className="lead">
            A deployable starter for running a coordinator agent, two worker
            agents, MCP tools, memory-ready agent sessions, and a hosted Ollama
            ModelAPI on Kubernetes.
          </p>

          <div className="cta-row">
            <a className="button primary" href="#deploy">
              <Rocket size={18} aria-hidden="true" />
              Deploy stack
            </a>
            <a
              className="button secondary"
              href="https://github.com/tirth1263/kaos-starter"
            >
              <Code2 size={18} aria-hidden="true" />
              View repo
            </a>
          </div>

          <div className="terminal-strip" aria-label="Quick deployment command">
            <Terminal size={18} aria-hidden="true" />
            <code>kubectl apply -f manifests/multi-agent-system.yaml</code>
          </div>
        </div>

        <ArchitectureMap />
      </section>

      <section className="metric-band" aria-label="Project highlights">
        <div>
          <strong>5</strong>
          <span>KAOS resource types</span>
        </div>
        <div>
          <strong>3</strong>
          <span>agents in one network</span>
        </div>
        <div>
          <strong>2</strong>
          <span>MCP tools included</span>
        </div>
        <div>
          <strong>0</strong>
          <span>cloud keys required by default</span>
        </div>
      </section>

      <section id="resources" className="section">
        <div className="section-heading">
          <p className="eyebrow">Stack contents</p>
          <h2>Kubernetes resources that work together</h2>
        </div>
        <div className="resource-grid">
          {resources.map((item) => {
            const Icon = item.icon;
            return (
              <article className="resource-card" key={item.title}>
                <Icon size={28} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="deploy" className="section deploy-section">
        <div className="section-heading">
          <p className="eyebrow">Deployment path</p>
          <h2>From empty cluster to agent team</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step.label}>
              <span className="step-number">{index + 1}</span>
              <h3>{step.label}</h3>
              <pre>
                <code>{step.command}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="command-panel">
          <div className="panel-heading">
            <ShieldCheck size={22} aria-hidden="true" />
            <h2>Default and optional model paths</h2>
          </div>
          <p>
            The main manifest uses a KAOS Hosted ModelAPI backed by Ollama and
            SmolLM2. The optional Nebius proxy manifest mirrors the cloud-token
            flow from the reference starter when a hosted provider is preferred.
          </p>
          <div className="check-list">
            <span>
              <CheckCircle2 size={18} aria-hidden="true" />
              Local-first Ollama manifest
            </span>
            <span>
              <CheckCircle2 size={18} aria-hidden="true" />
              Optional Nebius proxy manifest
            </span>
            <span>
              <CheckCircle2 size={18} aria-hidden="true" />
              Bash and PowerShell helpers
            </span>
          </div>
        </div>

        <div className="file-panel">
          <div className="panel-heading">
            <GitBranch size={22} aria-hidden="true" />
            <h2>Repository map</h2>
          </div>
          <ul>
            {files.map((file) => (
              <li key={file}>
                <Database size={16} aria-hidden="true" />
                <code>{file}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="footer-band">
        <div>
          <h2>Ready for your cluster</h2>
          <p>
            Clone the repo, install the KAOS operator, apply the manifest, and
            start sending OpenAI-compatible chat completion requests to the
            coordinator service.
          </p>
        </div>
        <a
          className="button primary"
          href="https://github.com/tirth1263/kaos-starter"
        >
          <ExternalLink size={18} aria-hidden="true" />
          Open GitHub
        </a>
      </section>
    </main>
  );
}
