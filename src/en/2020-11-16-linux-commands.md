---
layout: layouts/article
masterTitle: Linux Commands
isPublished: true
isFeatured: false
isMachineTranslated: false
title: Linux Commands
description: Useful Linux commands to facilitate development.
date: 2020-11-16T06:16:32.741Z
image: /assets/content/linux.png
imageAlt: Linux img
---

# Linux Commands

#### display system information

```
Use the -a (all) option to see everything
uname -a
```

```
Use the -s (kernel name) option to see the type of kernel
uname -s
```

```
Use the -r (kernel release) option to see the kernel release
uname -r
```

```
Use the -v (kernel version) option to see the kernel version
uname -v
```

#### show size, used space and available space

```
df -h -x squashfs
```

#### check ssh

```
cat ~/.ssh/id_rsa.pub
```

#### rename file

```
mv file1 file2
```

#### rename folder

```
mv folder1/ folder2
```

#### set file permissions

```
0: No permission
1: Execute permission
2: Write permission
3: Write and execute permissions
4: Read permission
5: Read and execute permissions
6: Read and write permissions
7: Read, write and execute permissions
chmod -R 765 example.txt
```

#### change owner and group owner

```
sudo chown owner:owner example.txt
```

#### show two files differences

```
-y, show the line differences side by side
-w, specify the maximum line width to use to avoid wraparound lines
--suppress-common-lines, prevent diff from listing the matching lines
diff -y -W 70 file1.txt file2.txt --suppress-common-lines
```

#### show process status

```
ps -aux | less
ps -ef
```

#### shutdown

```
shutdown
shutdown now
```
