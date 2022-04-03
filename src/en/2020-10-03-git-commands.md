---
layout: layouts/article
masterTitle: Git Commands
isPublished: true
isFeatured: false
isMachineTranslated: false
title: Git Commands
description: Useful Git commands to facilitate development.
date: 2020-10-03T06:16:32.741Z
image: /assets/content/git-default.png
imageAlt: Git img
---

# Git Commands

#### config username and email

```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

#### config aliases

```
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

#### push new local branch to remote

```
git push --set-upstream origin feature/new-local-branch
```

#### add and commit in one

```
git commit -a -m 'chore: ...'
```

#### add, commit and push in one

```
git commit -am 'chore: ...' && git push
```

#### set upstream to local branch

```
git branch --set-upstream-to=origin/develop develop
git branch --set-upstream-to origin/develop develop
```

#### reset to remote branch

```
git reset --hard origin/develop
```

#### fetch remote branch to local

```
git fetch origin develop:develop
```

#### list all remote branches

```
git remote -v
```

#### delete remote commits

```
git push -f origin develop
```

#### amend commit message

```
git commit --amend
```

#### git stash

Temporarily stores all the modified tracked files

```
git stash save
```

Restores the most recently stashed files

```
git stash pop
```

Lists all stashed changesets

```
git stash list
```

Discards the most recently stashed changeset

```
git stash drop
```

#### git rebase

rebase options:

- pick
- fixup
- drop

```
git rebase -i HEAD~3
```

#### clear git cache

```
git rm -r --cached .
```
