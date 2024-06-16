export DOCKER_BUILDKIT=1

docker buildx build --platform linux/amd64 -t yxfanlawrence/travelexpensebackend:1.0.6 . --push