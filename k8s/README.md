# How to deploy local Kubernetes cluster

## Set Secrets

1. Copy example yaml into same directory
2. Remove the .example file extension
3. Replace all 'CHANGE ME's to the correct values in the secrets file

## Setup DNS

1. Follow [This Video](https://www.youtube.com/watch?v=I8bZQkdHOVs) to assign 2 static IPs for your system
    - These IPs should be **outside** your LANs DHCP range (check your routers settings)
2. Decide your IPs for `kind-configs.yaml` and `DNS\dns-config.yaml`
    - One IP will be for the DNS, the other will be your local machine.
3. Change the IPs in `dns-config.yaml` to the <u>host machines IP</u>
4. Change the **listenAddress** variables under **HTTP** and **HTTPS** in `kind-configs.yaml` to the <u>host machines IP</u>
5. Change the **listenAddress** variables under **DNS - UDP** and **DNS - TCP** in `kind-configs.yaml` to the <u>DNS IP</u>

## Create Your Cluster

```
kind create cluster -n <cluster-name> --config k8s/kind-configs.yaml
```

## Install Nginx Ingress

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
```

## Install Cert Manager

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.21.1/cert-manager.yaml
```

## Apply Kubernetes Manifests

```
kubectl apply -f k8s/
```

## Trust Local Certificate

```
kubectl get secret meguurl-local-tls \
  -o jsonpath="{.data['tls\.crt']}" |
  base64 --decode > meguurl-local-ca.crt
```

<br>

### Powershell (Administrative Permissions)

```
Import-Certificate `
    -FilePath .\meguurl-local-ca.crt `
    -CertStoreLocation Cert:\LocalMachine\Root
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
