#!/bin/bash
set -ex

# Docker save
IMAGE_NAME="${ORCHESTRATOR_UI_IMAGE_NAME:-orchestrator_ui}"
docker pull ${IMAGE_NAME}
docker build . -t $IMAGE_NAME
docker push $IMAGE_NAME