export DOCKER_BUILDKIT=1

docker buildx build --platform linux/amd64 -t yxfanlawrence/travelexpensebackend:1.1.0 . --push