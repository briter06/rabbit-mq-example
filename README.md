# Rabbit MQ

## Set up Rabbit MQ Locally

This runs RabbitMQ LOCALLY (Not in Kubernetes), which means that the Node JS can access it through `localhost`

1. Download the docker image:

```bash
docker pull rabbitmq
```

2. Run the container

```bash
docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
```

## Set up Rabbit MQ in Kubernetes

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

## Build and deploy the app in Kubernetes

1. Build the image of the server

```bash
docker build -t rabbit-server:latest -f Dockerfile.server .
```

2. Build the image of the consumer

```bash
docker build -t rabbit-server:latest -f Dockerfile.consumer .
```

3. Deploy the images

```bash
kubectl apply -f deploy.yaml
```

4. Port forward to the server

```bash
kubectl port-forward pod/\${SERVER_POD_NAME} 3000:3000 
```

5. Show the logs of the consumer

```bash
kubectl logs -f pod/\${CONSUMER_POD_NAME}
```

6. Send a request to the server

```bash
curl --location 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data '{
    "message": "This is a message!"
}'
```

7. You should see the message in the logs of the consumer pod