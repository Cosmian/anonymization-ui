This is the main UI for Cosmian CipherCompute and ZeroTrust

# Cosmian Anonymization Configuration tool

## Start application locally

```
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to view it in the browser.


## Start application using Docker

```
docker build -t anonymization-tool .
docker run -p 4173:4173 anonymization-tool
```

## Run containers
Using the docker-compose file, you can simply launch the interface :
````
docker-compose up
```

Access it on :
http://localhost:4173
