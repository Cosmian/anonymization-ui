#!/bin/bash
set -ex

# Docker save
IMAGE_NAME="${ANONYMIZATION_UI_IMAGE_NAME:-anonymization_ui}"
# docker pull ${IMAGE_NAME}
docker build . -t $IMAGE_NAME
docker push $IMAGE_NAME
