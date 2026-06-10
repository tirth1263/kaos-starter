#!/usr/bin/env bash
set -euo pipefail

kubectl delete namespace kaos-demo --ignore-not-found

