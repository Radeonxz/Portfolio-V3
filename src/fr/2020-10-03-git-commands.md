---
layout: layouts/article
masterTitle: Git Commands
isPublished: true
isFeatured: false
isMachineTranslated: true
title: Git Commands
description: Commandes Git utiles pour faciliter le développement.
date: 2020-10-03T06:16:32.741Z
image: /assets/content/git-default.png
imageAlt: Git img
---

# Commandes Git

#### config nom d'utilisateur et email

```
git config --global utilisateur.nom "John Doe"
git config --global user.email johndoe@example.com
```

#### config alias

```
git config --global alias.co checkout
git config --global alias.br branche
git config --global alias.ci commit
git config --global alias.st status
```

#### pousser la nouvelle branche locale vers la branche distante

```
git push --set-upstream origin feature/new-local-branch
```

#### ajouter et livrer en une seule fois

```
git commit -a -m 'chore : ...'
```

#### ajouter, commiter et pousser en une seule fois

```
git commit -am 'tâche : ...' && git push
```

#### mettre en amont la branche locale

```
git branch --set-upstream-to=origin/develop develop
git branch --set-upstream-to origin/develop develop
```

#### réinitialiser la branche distante

```
git reset --hard origin/develop
```

#### récupération de la branche distante sur la branche locale

```
git fetch origin develop:develop
```

#### liste toutes les branches distantes

```
git remote -v
```

#### supprimer les commits distants

```
git push -f origine développer
```

#### modifier le message de validation

```
git commit --amend
```

#### git stash

Stocke temporairement tous les fichiers modifiés suivis

```
git stash save
```

Restaure les derniers fichiers stockés

```
git stash pop
```

Liste tous les changesets cachés

```
git stash list
```

Supprime le dernier jeu de modifications mis en cache.

```
git stash drop
```

#### git rebase

Options de rebasement :

- pick
- réparer
- déposer

```
git rebase -i HEAD~3
```

#### effacer le cache de git

```
git rm -r --cache .
```

Traduit avec www.DeepL.com/Translator (version gratuite)
