This is the complete interface to perform Cosmian data anonymization.

# Cosmian Anonymization
This UI is composed of a frontend and a small backend (redirecting requests to a Cosmian microservice).

You need to configure the different environment variables in the docker-compose file.


## Deploy anonymization microservice
First you need to deploy an anonymization microservice - using this repository:
https://github.com/Cosmian/anonymization-flask-app


## Build images
Build frontend and backend images using:

```
docker build -t backend-anonymization backend
docker build -t frontend-anonymization frontend
```

Or using docker-compose :
```
docker-compose build
```

## Run containers
Using the docker-compose file, you can simply launch the interface :
````
docker-compose up
```

Access it on :
http://localhost:4173
