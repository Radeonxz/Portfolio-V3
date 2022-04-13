---
layout: layouts/article
masterTitle: Linux Commands
isPublished: true
isFeatured: false
isMachineTranslated: true
title: Commandes Linux
description: Commandes Linux utiles pour faciliter le développement.
date: 2020-11-16T06:16:32.741Z
image: /assets/content/linux.png
imageAlt: Linux img
---

# Commandes Linux

#### afficher les informations du système

```
Utilisez l'option -a (all) pour tout voir
uname -a
```

```
Utilisez l'option -s (nom du noyau) pour voir le type de noyau
uname -s
```

```
Utilisez l'option -r (kernel release) pour connaître la version du noyau.
uname -r
```

```
Utilisez l'option -v (kernel version) pour connaître la version du noyau.
uname -v
```

#### affiche la taille, l'espace utilisé et l'espace disponible

```
df -h -x squashfs
```

#### vérifier ssh

```
cat ~/.ssh/id_rsa.pub
```

#### renommer le fichier

```
mv fichier1 fichier2
```

#### renommer un dossier

```
mv dossier1/ dossier2
```

#### définir les permissions des fichiers

```
0: Aucune autorisation
1: Droit d'exécution
2: Droit d'écriture
3: Droits d'écriture et d'exécution
4: Permission de lecture
5: Permissions de lecture et d'exécution
6: Permissions de lecture et d'écriture
7: Droits de lecture, d'écriture et d'exécution
chmod -R 765 exemple.txt
```

#### changer le propriétaire et le groupe propriétaire

```
sudo chown owner:owner exemple.txt
```

#### afficher les différences entre deux fichiers

```
-y, affiche les différences de lignes côte à côte
-w, spécifie la largeur de ligne maximale à utiliser pour éviter les lignes enveloppantes.
--suppress-common-lines, empêche diff de lister les lignes correspondantes
diff -y -W 70 fichier1.txt fichier2.txt --suppress-common-lines
```

#### montrer l'état du processus

```
ps -aux | less
ps -ef
```

#### arrêt du processus

```
arrêt
arrêt immédiat
```
