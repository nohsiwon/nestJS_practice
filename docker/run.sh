docker-compose -f $PWD/docker-compose-$1.yaml -p devcamp-project-server-$1 down
docker-compose -f $PWD/docker-compose-$1.yaml -p devcamp-project-server-$1 up -d
docker logs -f devcamp-project-server-$1