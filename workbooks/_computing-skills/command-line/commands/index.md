---
title: Unix Commands
description: Exploration of useful commands in the CLI.
type: introduction
index: 2
tags: [unix] 

language: Bash

author: [Andrew Severin, Aleksandra Badaczewska, Lavida Rogers]
## author name

updated: 2025-06-17 
## last date updated - not required but useful

order: 1
---

## Overview

The Unix Shell has several built-in text commands, which once executed force the computing machine to perform specific tasks.

In [Introduction to Introduction to Command Line Computing](../) we touched on many basic commands. 

This section aims to improve your skills and independence in the command line - covering subjects such as how to access a command's manual, using autocomplete, and commands useful for text manipulation in the command line.

<div class="usa-accordion">

{% include accordion title="Basic command reference tables" class="info " controls="command-ref" icon=true %}
<div id="command-ref" class="accordion_content" markdown='1' hidden>

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

{% include table caption="File/Directory operations" content="| Command | Description | Example |
| cat | catalog file contents | `cat FILE` |
| head | show first few lines of a file | `head FILE` |
| tail | show last few lines of a file | `tail FILE` |
| more | view file (with less options) | `more FILE` |
| less | view file (with more options) | `less FILE` |
| seq | write a sequence of numbers | `seq 1 1 10` |" %}



{% include table caption="Keyboard shortcuts for command entry" content="| key combination | description |
| --               | --           |
| arrows left (`←`) / right (`→`) | Move the cursor left or right one character at a time. |
| `Ctrl` + `A`    | Jump to the beginning of the command line. |
| `Ctrl` + `E`    | Move to the end of the command line.       |
| `Alt` + `B`     | Move backward one word.                    |
| `Alt` + `F`     | Move forward one word.                     |
| `Ctrl` + `U`    | Clear everything before the cursor.        |
| `Ctrl` + `K`    | Delete everything after the cursor.        |
| `Ctrl` + `W`    | Delete the previous word.                  |
| `Ctrl` + `Y`    | Paste back the last deleted text. (`Ctrl` + `U`; `Ctr` + `K` ; `Ctrl` + `W`) |
| `Ctrl` + `L`    | Clear the terminal screen (equivalent to the `clear` command). |
| `Tab`           | Autocomplete command names, filenames and paths. [Command autocompletion](./autocompletion) |
| arrows up (`↑`) / down (`↓`) | Cycle through previously entered commands. |" %}

</div></div>