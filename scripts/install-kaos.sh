#!/usr/bin/env bash
set -euo pipefail

KAOS_VERSION="${KAOS_VERSION:-v0.1.3}"

helm repo add kaos https://axsaucedo.github.io/kaos/charts
helm repo update

helm upgrade --install kaos kaos/kaos-operator \
  --namespace kaos-system \
  --version "${KAOS_VERSION}" \
  --create-namespace

kubectl get pods -n kaos-system

