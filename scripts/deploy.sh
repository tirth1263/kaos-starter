#!/usr/bin/env bash
set -euo pipefail

PROVIDER="${1:-ollama}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

kubectl create namespace kaos-demo --dry-run=client -o yaml | kubectl apply -f -

case "${PROVIDER}" in
  ollama)
    kubectl apply -f "${ROOT_DIR}/manifests/multi-agent-system.yaml"
    ;;
  nebius)
    if [[ -z "${NEBIUS_KEY:-}" ]]; then
      echo "Set NEBIUS_KEY before deploying the Nebius proxy manifest." >&2
      exit 1
    fi

    kubectl create secret generic nebius-secrets \
      -n kaos-demo \
      --from-literal "api-key=${NEBIUS_KEY}" \
      --dry-run=client -o yaml | kubectl apply -f -

    kubectl apply -f "${ROOT_DIR}/manifests/nebius-proxy-system.yaml"
    ;;
  *)
    echo "Unknown provider '${PROVIDER}'. Use 'ollama' or 'nebius'." >&2
    exit 1
    ;;
esac

kubectl get agent,modelapi,mcpserver -n kaos-demo

