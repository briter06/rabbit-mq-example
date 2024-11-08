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

1. Deploy RabbitMQ into Kubernetes

```bash
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
```