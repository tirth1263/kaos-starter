# Troubleshooting

## KAOS operator pods do not start

Check the operator namespace:

```bash
kubectl get pods -n kaos-system
kubectl describe pod -n kaos-system -l control-plane=controller-manager
```

Confirm the Helm repository was added and the chart version exists:

```bash
helm repo update
helm search repo kaos/kaos-operator --versions
```

## Agent resources are stuck pending

Inspect the custom resources and generated pods:

```bash
kubectl get agent,modelapi,mcpserver -n kaos-demo
kubectl describe modelapi ollama-smollm2 -n kaos-demo
kubectl get pods -n kaos-demo
```

For the default Ollama path, the first start can take time while the model is
pulled. SmolLM2 135M is intentionally small, but the pull still depends on
cluster networking and node disk speed.

## Port-forward service name differs

KAOS versions can expose agent services with slightly different names. List the
services and forward the coordinator service shown by your cluster:

```bash
kubectl get svc -n kaos-demo
kubectl port-forward -n kaos-demo svc/agent-coordinator 8080:8000
```

If your cluster exposes `svc/coordinator` instead, use that service name with
the same ports.

## Nebius proxy authentication fails

Confirm the secret exists in the same namespace as the `ModelAPI`:

```bash
kubectl get secret nebius-secrets -n kaos-demo
kubectl describe modelapi demo-modelapi -n kaos-demo
```

Recreate the secret without printing the key:

```bash
kubectl create secret generic nebius-secrets \
  -n kaos-demo \
  --from-literal "api-key=$NEBIUS_KEY" \
  --dry-run=client -o yaml | kubectl apply -f -
```

