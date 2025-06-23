---
title: Basic Unix Commands
description: Basic Unix commands reference lists
type: reference material 

tags: [unix, bash] 

language: Bash

author: [Andrew Severin, Aleksandra Badaczewska, Lavida Rogers]
## author name

updated: 2025-06-17 
## last date updated - not required but useful

order: 6
---

## Overview

Basic Unix commands for interacting with the shell, navigating the file system, managing files and directories, viewing files and editing file content from the terminal, and interpreting file permissions. 

{% include table caption="Unix basics cheat sheet" content='| Command | Description | Example |
| `pwd` | prints working directory | `pwd` |
| `ls`, `ls-l`, `ls-a` | lists file contents | `ls` |
| `cd`, `cd ..`, `cd ~` | change working directory | `cd /90daydata/shared/$USER/unix_tutorial` |
| `mkdir` | make new folder | `mkdir -p /90daydata/shared/$USER/unix_tutorial` |
| `touch` | create a blank file | `touch file2.txt file3.txt file4.txt ` |
| `cat`, `echo` | view contents | `echo "Hello, $USER"` |
| `rm, rmdir` | remove files or empty folders |  |
| `cp` | copy files from a specified directory to the current directory | `cp -r /home/unix_tutorial .` |
| `mv` | move files from the current directory to a specified directory | `mv file1.txt destination_directory` |
| `help` | to learn more about Unix commands | `echo --help` |
| `man` | to view the manual for a Unix command. Press `q` to exit. | `man ls` |
| `chmod` | to change file permissions |  |' %}