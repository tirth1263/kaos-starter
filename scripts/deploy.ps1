param(
  [ValidateSet("ollama", "nebius")]
  [string]$Provider = "ollama",
  [string]$NebiusKey = $env:NEBIUS_KEY
)

$ErrorActionPreference = "Stop"
$RootDir = Resolve-Path (Join-Path $PSScriptRoot "..")

kubectl create namespace kaos-demo --dry-run=client -o yaml | kubectl apply -f -

if ($Provider -eq "nebius") {
  if (-not $NebiusKey) {
    throw "Set NEBIUS_KEY or pass -NebiusKey before deploying the Nebius proxy manifest."
  }

  kubectl create secret generic nebius-secrets `
    -n kaos-demo `
    --from-literal "api-key=$NebiusKey" `
    --dry-run=client -o yaml | kubectl apply -f -

  kubectl apply -f (Join-Path $RootDir "manifests/nebius-proxy-system.yaml")
} else {
  kubectl apply -f (Join-Path $RootDir "manifests/multi-agent-system.yaml")
}

kubectl get agent,modelapi,mcpserver -n kaos-demo

