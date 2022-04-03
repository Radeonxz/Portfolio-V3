---
layout: layouts/article
masterTitle: NPM Commands
isPublished: true
isFeatured: false
isMachineTranslated: true
title: NPM Commands
description: Commandes NPM utiles pour faciliter le développement.
date: 2020-04-08T06:16:32.741Z
image: /assets/content/npm.png
imageAlt: NPM img
---

# Commandes NPM

#### liste tous les paquets npm globaux

```
npm list -g --depth 0
```

#### lier le paquet local

```
cd ~/npm-packages
lien npm
cd ~/my-app
npm link npm-packages
```

#### délier le paquet local

```
cd ~/mon-app
npm unlink --no-save npm-packages
cd ~/npm-packages
npm unlink
```

#### vérifier les paquets périmés

```
npm outdated -g --depth 0
```

#### mettre à jour le paquet global

```
npm update package -g
npm update package@x.x.x
```

#### vérifier l'emplacement global

```
npm config get prefix
```

#### vérification des paquets

```
npm run audit
```

#### auditer les paquets réparer

```
npm audit fix
```

#### effacer le cache de npm

```
npm cache clean --force
```

#### npm configuration du proxy

```
npm config set proxy http://proxy_host:port
```

#### npm vérifier l'installation

```
npm config ls -l
```

Traduit avec www.DeepL.com/Translator (version gratuite)
