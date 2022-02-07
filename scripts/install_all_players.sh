#!/bin/bash
set -ex

# Docker save
IMAGE_NAME="${ORCHESTRATOR_UI_IMAGE_NAME:-orchestrator_ui}"
docker save $IMAGE_NAME| pigz > orchestrator_ui.tar.gz

for id in {1..3}
do
    # Push docker image to players
    rsync -e ssh orchestrator_ui.tar.gz root@player"${id}".cosmian.com:/root/orchestrator_ui.tar.gz

    # Stop the docker image
    ssh root@player"${id}".cosmian.com docker rmi "${IMAGE_NAME}" --force

    # Load docker image
    ssh root@player"${id}".cosmian.com docker load -i orchestrator_ui.tar.gz

    # Restart docker image
    ssh root@player"${id}".cosmian.com docker stop orchestrator_ui
    ssh root@player"${id}".cosmian.com docker rm orchestrator_ui
    ssh root@player"${id}".cosmian.com docker run -d -e REACT_APP_API_URL=http://player"${id}".cosmian.com:9000 -p 3000:80 --name orchestrator_ui "${IMAGE_NAME}"
done

rm orchestrator_ui.tar.gz