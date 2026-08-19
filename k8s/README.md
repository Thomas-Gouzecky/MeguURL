# How to deploy local Kubernetes cluster

## Set Secrets

1. Copy example yaml into same directory
2. Remove the .example file extension
3. Replace all 'CHANGE ME's to the correct values in the secrets file

## Create Your Cluster

```
kind create cluster -n <cluster-name> --config k8s/kind-configs.yaml
```

## Install Nginx Ingress

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

## Apply Kubernetes Manifests

```
kubectl apply -f k8s/secrets/db-api-secrets.yaml
kubectl apply -f k8s/secrets/db-secrets.yaml
kubectl apply -f k8s/configmaps
kubectl apply -f k8s/storage
kubectl apply -f k8s/ingress
kubectl apply -f k8s/services
kubectl apply -f k8s/deployments
```

## Ensure Kubernetes Project is Working

```
kubectl get nodes
kubectl get pods
kubectl get deployments
```

## Ensure Nginx Ingress is Working

```
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```
