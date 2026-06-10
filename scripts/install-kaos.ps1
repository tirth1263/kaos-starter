param(
  [string]$KaosVersion = "v0.1.3"
)

$ErrorActionPreference = "Stop"

helm repo add kaos https://axsaucedo.github.io/kaos/charts
helm repo update

helm upgrade --install kaos kaos/kaos-operator `
  --namespace kaos-system `
  --version $KaosVersion `
  --create-namespace

kubectl get pods -n kaos-system

