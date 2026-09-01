# Run MeguURL with Helm

This guide deploys MeguURL to a local [Kind](https://kind.sigs.k8s.io/) Kubernetes cluster.

> Run the commands below from the repository root.

## Prerequisites

- [Docker Desktop](https://docs.docker.com/desktop/)
- [Kubernetes](https://kubernetes.io/releases/download/)
- [Kind](https://kind.sigs.k8s.io/)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm 3 or Later](https://helm.sh/docs/intro/install/)

Install Kind on Windows with `winget`:

```powershell
winget install Kubernetes.kind
```

## 1. Configure Local IP Addresses

You need two static IP addresses:

- The host machine's IP
- The IP address used by the local DNS server

Both addresses should be outside your router's DHCP range. See [this walkthrough](https://www.youtube.com/watch?v=I8bZQkdHOVs) for assigning static addresses.

Update the following files with your chosen addresses:

1. In `helm/dns/values.yaml`, set `configmap.hosts[].ip` to the host machine's IP:

    ```yaml
    configmap:
        hosts:
            - ip: 192.168.2.9
    ```

2. In `helm/kind-configs.yaml`, set the `listenAddress` values under `HTTP` and `HTTPS` to the host machine's IP.
3. In the same file, set the `listenAddress` values under `DNS - UDP` and `DNS - TCP` to the DNS server's IP.

## 2. Create the Secrets

Add a `secrets.yaml` file in the `helm/meguurl/templates` directory. The file should contain the following:

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: { { .Values.dbAPI.secretName } }
type: Opaque
stringData:
    DATABASE_USER: postgres
    DATABASE_PASSWORD: CHANGE_ME
    DATABASE_HOST: { { .Values.postgres.name } }
    DATABASE_PORT: "5432"
    DATABASE_NAME: meguURL
---
apiVersion: v1
kind: Secret
metadata:
    name: { { .Values.postgres.secretName } }
type: Opaque
stringData:
    POSTGRES_PASSWORD: CHANGE_ME
    POSTGRES_DB: meguURL
```

Replace every `CHANGE_ME` value with the database password you want to use. The values of `DATABASE_PASSWORD` and `POSTGRES_PASSWORD` must match.

Do not commit real credentials to Git. This approach also stores the password in the Helm chart and release data; use a separate secret-management solution for shared or production deployments.

## 3. Create the Kind Cluster

Choose a name for the cluster and run:

```bash
kind create cluster -n <cluster-name> --config helm/kind-configs.yaml
```

## 4. Install the Gateway API

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.6.1/standard-install.yaml
```

## 5. Install the Helm Releases

Install the releases in this order:

### Certificate Management

```bash
helm install cert-manager helm/cert-manager \
    --namespace cert-manager \
    --create-namespace \
    -f helm/cert-manager/values.yaml

helm install trust-manager helm/trust-manager \
    --namespace cert-manager

helm install cert-distributer helm/cert-distributer \
    --namespace cert-manager \
    -f helm/clusterValues.yaml
```

### DNS and Gateway Controller

```bash
helm install dns helm/dns \
    --namespace dns \
    --create-namespace

helm install traefik helm/traefik \
    --namespace traefik \
    --create-namespace \
    -f helm/traefik/values.yaml
```

### MeguURL

```bash
helm install meguurl helm/meguurl \
    --namespace meguurl \
    --create-namespace \
    -f helm/clusterValues.yaml

kubectl label namespace meguurl trust=enabled
```

Restart the frontend so it can mount the CA bundle:

```bash
kubectl rollout restart deployment/meguurl-frontend -n meguurl
```

### Certificate Downloader

```bash
helm install cert-downloader helm/cert-downloader \
    --namespace cert-downloader \
    -f helm/clusterValues.yaml

kubectl label namespace cert-downloader trust=enabled
```

Restart the cert-downloader so it can mount the CA bundle:

```bash
kubectl rollout restart deployment/cert-downloader -n cert-downloader
```

## 6. Verify the Installation

Check the pod and Gateway status:

```bash
kubectl get pods -n meguurl
kubectl get gateway -n meguurl
```

Configure your devices to use the DNS server's static IP address, then verify DNS resolution:

```bash
nslookup megu.url
```

Once DNS is configured, open [https://megu.url](https://megu.url) to access the MeguURL frontend.

## 7. Trusting the Local CA

To trust the local CA, you need to add the CA certificate to your system's trusted certificate store. The exact steps depend on your operating system and device.

Visit [http://cert-downloader.home.arpa/ca.crt](http://cert-downloader.home.arpa/ca.crt) to download the CA certificate. Follow your operating system's instructions to add it to the trusted store.
