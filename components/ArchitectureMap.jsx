import { Bot, BrainCircuit, Cloud, Server, Wrench } from "lucide-react";

export function ArchitectureMap() {
  return (
    <div className="architecture" aria-label="KAOS starter architecture map">
      <div className="cluster-label">Kubernetes Cluster</div>
      <div className="node coordinator">
        <BrainCircuit size={22} aria-hidden="true" />
        <span>Coordinator Agent</span>
      </div>
      <div className="node worker worker-one">
        <Bot size={22} aria-hidden="true" />
        <span>Worker 1 Agent</span>
      </div>
      <div className="node worker worker-two">
        <Bot size={22} aria-hidden="true" />
        <span>Worker 2 Agent</span>
      </div>
      <div className="node model-api">
        <Cloud size={22} aria-hidden="true" />
        <span>ModelAPI Hosted</span>
      </div>
      <div className="node mcp">
        <Wrench size={22} aria-hidden="true" />
        <span>MCP Servers</span>
      </div>
      <div className="node memory">
        <Server size={22} aria-hidden="true" />
        <span>Agent Memory</span>
      </div>
      <span className="connector line-one" aria-hidden="true" />
      <span className="connector line-two" aria-hidden="true" />
      <span className="connector line-three" aria-hidden="true" />
      <span className="connector line-four" aria-hidden="true" />
    </div>
  );
}

