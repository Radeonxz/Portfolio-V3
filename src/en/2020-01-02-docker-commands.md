---
layout: layouts/article
masterTitle: Docker Commands
isPublished: true
isFeatured: true
isMachineTranslated: false
title: Docker Commands
description: Useful Docker commands to facilitate development.
date: 2020-01-02T06:16:32.741Z
image: /assets/content/docker.jpg
imageAlt: Docker img
---

# Docker Commands

## Docker Remove

### Remove all unused objects

Remove all stopped containers, all dangling images, and all unused networks

```
docker system prune
```

#### Options

Use '--volumes' to remove all unused volumes
Use '-f' or '--force' to bypass prompt

```
docker system prune --volumes -f(--force)
```

### Remove docker containers

#### Remove one or more containers

List all running containers

```
docker container ls -a
```

Remove containers by container ID

```
docker container rm cc3f2ff51cab cd20b396a061
```

#### Remove all stopped containers

List all non-running containers

```
docker container ls -a --filter status=exited --filter status=created
```

Remove all stopped containers

```
docker container prune
```

#### Remove containers using filters

Remove all containers applied to filter

```
docker container prune --filter "until=12h"
```

#### Stop and remove all containers

Stop all running containers

```
docker container stop
```

### Remove docker images

#### Remove one or more images

List all images

```
docker image ls
```

Remove images by image ID

```
docker image rm 75835a67d134 2a4cca5ac898
```

#### Remove all unused images

```
docker image prune -a
```

### Remove docker volumes

#### Remove one or more volumes

List all volumes

```
docker volume ls
```

Remove volumes by volume ID

```
docker volume rm 4e12af8913af888ba67243dec78419bf18adddc3c7a4b2345754b6db64293163
```

#### Remove all unused volumes

```
docker volume prune
```

### Remove docker networks

#### Remove one or more networks

List all networks

```
docker network ls
```

Remove networks by network ID

```
docker network rm c520032c3d31
```

#### Remove all unused networks

```
docker network prune
```

## Docker Execute

```
docker exec -it <container_id> bash
```
