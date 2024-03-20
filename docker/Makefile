#!make
TAG                         := $$(git log -1 --pretty=format:%h)
PROJECT_NAME                := devcamp
NAME_SERVER                 := ${PROJECT_NAME}-$$env
IMG_COMMIT_SERVER     		:= ${NAME_SERVER}:${TAG}
IMG_LATEST_SERVER     		:= ${NAME_SERVER}:latest

build:
	@docker build -f Dockerfile --build-arg ENV=$$env -t ${IMG_COMMIT_SERVER} ../;
	@docker tag ${IMG_COMMIT_SERVER} ${IMG_LATEST_SERVER};

run:
	@echo $$env;
	@sh run.sh $$env

network:
	@sh create-network.sh

kill:
	@echo 'Killing container...'
	@docker-compose -f docker-compose-$$env.yaml -p ${PROJECT_NAME}-server-$$env down

delete:
	# none 삭제
	@if [ -n "$$(docker images -f "dangling=true" -q)" ]; then \
		docker rmi -f $$(docker images -f "dangling=true" -q); \
	else \
		echo "No dangling images to remove."; \
	fi

	# 관련 이미지 삭제
	@if [ -n "$$(docker images --format \"{{.Repository}}:{{.Tag}}\" | grep '$(PROJECT_NAME)')" ]; then \
		docker rmi -f $$(docker images --format "{{.Repository}}:{{.Tag}}" | grep '$(PROJECT_NAME)'); \
	else \
		echo "No '$(PROJECT_NAME)' images to remove."; \
	fi


