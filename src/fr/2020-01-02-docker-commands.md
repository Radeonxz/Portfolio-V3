---
layout: layouts/article
masterTitle: Docker Commands
isPublished: true
isFeatured: true
isMachineTranslated: true
title: Commandes Docker
description: Commandes Docker utiles pour faciliter le développement.
date: 2020-01-02T06:16:32.741Z
image: /assets/content/docker.jpg
imageAlt: Docker img
---

# Commandes Docker

## Docker Supprimer

### Supprimez tous les objets inutilisés

Supprimez tous les conteneurs arrêtés, toutes les images en suspens et tous les réseaux inutilisés.

```
docker system prune
```

#### Options

Utilisez '--volumes' pour supprimer tous les volumes inutilisés.
Utilisez '-f' ou '--force' pour contourner l'invite.

```
docker system prune --volumes -f(--force)
```

### Suppression des conteneurs docker

#### Retirer un ou plusieurs conteneurs

Liste de tous les conteneurs en cours d'exécution

```
docker container ls -a
```

Retirer les conteneurs par ID de conteneur

```
docker container rm cc3f2ff51cab cd20b396a061
```

#### Retirer tous les récipients arrêtés

Liste de tous les conteneurs qui ne fonctionnent pas

```
docker container ls -a --filter status=exited --filter status=created
```

Retirer tous les récipients arrêtés

```
docker container prune
```

#### Supprimer les conteneurs en utilisant des filtres

Supprimez tous les conteneurs appliqués au filtre

```
docker container prune --filtre "until=12h"
```

#### Arrêter et supprimer tous les conteneurs

Arrêtez tous les conteneurs en cours d'exécution

```
docker container stop
```

### Suppression des images docker

#### Supprimer une ou plusieurs images

Lister toutes les images

```
docker image ls
```

Suppression des images par ID d'image

```
docker image rm 75835a67d134 2a4cca5ac898
```

#### Supprimez toutes les images inutilisées

```
docker image prune -a
```

### Supprimer les volumes de docker

#### Supprimer un ou plusieurs volumes

Lister tous les volumes

```
docker volume ls
```

Suppression de volumes par ID de volume

```
docker volume rm 4e12af8913af888ba67243dec78419bf18adddc3c7a4b2345754b6db64293163
```

#### Supprimer tous les volumes inutilisés

```
docker volume prune
```

### Supprimer les réseaux docker

#### Supprimer un ou plusieurs réseaux

Lister tous les réseaux

```
docker network ls
```

Suppression des réseaux par ID de réseau

```
docker network rm c520032c3d31
```

#### Supprimez tous les réseaux inutilisés

```
docker network prune
```

## Docker Execute

```
docker exec -it <container_id> bash
```

Traduit avec www.DeepL.com/Translator (version gratuite)
