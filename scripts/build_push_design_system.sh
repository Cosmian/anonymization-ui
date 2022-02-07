#!/bin/bash
set -ex

# Docker save
IMAGE_NAME="${COSMIAN_STORYBOOK_IMAGE_NAME:-cosmian_storybook}"
docker build . -t $IMAGE_NAME --target=storybook
docker push $IMAGE_NAME