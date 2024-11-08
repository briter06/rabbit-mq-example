# Rabbit MQ

## Set up Rabbit MQ Locally

1. Download the docker image:

```bash
docker pull rabbitmq
```

2. Run the container

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

## Set up Rabbit MQ nn Kubernetes

1. Download the operator

```bash
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
```

2. Deploy RabbitMQ into Kubernetes

```bash
kubectl apply -f rabbit-mq-cluster.yaml
```

3. Get username

```bash
kubectl get secret rabbit-mq-cluster-default-user -o jsonpath='{.data.username}' | base64 --decode
```

4. Get the password

```bash
kubectl get secret rabbit-mq-cluster-default-user -o jsonpath='{.data.password}' | base64 --decode
```

5. Port-forward to the service

```bash
kubectl port-forward svc/rabbit-mq-cluster 5672 
```

6. Check environment variables of the pod

```bash
kubectl exec rabbit-mq-cluster-server-0 -- printenv
```