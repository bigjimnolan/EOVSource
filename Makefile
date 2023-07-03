docker-build:
	docker build -t eov:latest -f deploy/docker/Dockerfile .

npm-build:
	cd eovreact && npm run build

build-app: npm-build docker-build
