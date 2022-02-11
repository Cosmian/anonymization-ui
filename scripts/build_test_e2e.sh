#!/bin/bash                                                                                                                                                                                                                                                                   
set -ex

# Docker save
IMAGE_NAME="${ANONYMIZATION_UI_IMAGE_NAME:-anonymization_ui}"
# docker pull ${IMAGE_NAME}
docker build . -t ${IMAGE_NAME} --target build-deps
docker run --entrypoint /bin/bash ${IMAGE_NAME} -c "npm ci && npm run start & npm run test:e2e"