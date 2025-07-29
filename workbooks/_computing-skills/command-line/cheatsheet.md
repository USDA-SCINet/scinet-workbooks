---
title: UNIX Cheatsheet
type: reference material
description: Quick reference tables with unix commands, shortcuts, variables, and more

author: [Arun Seetharam]
---

## Overview

Quick reference tables with unix commands, shortcuts, variables, and more

## Commands

<div class="process-list ul">

### Navigation

{% include table content='| Command | Function                       | Syntax/example usage                                 |
| -------- | ------------------------------ | ---------------------------------------------------- |
|  ls      | list contents                   | `ls [OPTIONS] DIRECTORY`  |
|  pwd     | print working directory         | `pwd`                                                 |
| `cd`, `cd ..`, `cd ~` | change working directory | `cd /90daydata/shared/$USER/unix_tutorial` |' %}

### File/Directory operations

{% include table content='| Command | Function                       | Syntax/example usage                                 |
| -------- | ------------------------------ | ---------------------------------------------------- |
|  mkdir   | make directory                 | `mkdir DIRECTORY`      |
|  cp      | copy files/directories         | `cp SOURCE DESTINATION` |
|  man     | manual page (help)             | `man COMMAND`          |
|  mv      | move files/directories         | `mv SOURCE DESTINATION` |
|  touch   | create file                    | `touch FILE`           |
|  nano    | edit file                      | `nano FILE`            |
|  less    | view file (with more options)  | `less FILE`            |
|  more    | view file (with less options)  | `more FILE`            |
|  cat     | catalog file contents          | `cat FILE`             |
|  echo    | view contents                  | `echo "Hello, $USER"`  |
|  head    | show first few lines of a file | `head FILE`            |
|  tail    | show last few lines of a file  | `tail FILE`            |
|  rmdir   | remove empty directory         | `rmdir DIRECTORY`      |
|  rm      | remove file(s)                 | `rm FILE`              |
|  chmod   | change permissions for files/directories | `chmod [OPTIONS] RELATIONS[+/-]PERMISSIONS FILE` |' %}

### File manipulations

{% include table content="| Command | Function                               | Syntax/example usage                                             |
| -------- | -------------------------------------- | ---------------------------------------------------------------- |
|  grep    | search a pattern                       | `grep [OPTIONS] \"PATTERN\" FILENAME`   |
|  sed     | stream edit a file                     | `sed 's/search/replace/g' FILENAME`   |
|  awk     | multi-purpose command                  | `awk 'PATTERN {ACTION}' FILENAME`     |
|  tr      | translate or transliterate a file      | `tr [OPTIONS] \"STRING1\" \"STRING2\"  < INFILE` |
|  wc      | word count                             | `wc FILENAME`                         |
|  sort    | sort files                             | `sort FILE1 > SORTED_FILE1`                  |
|  uniq    | display unique lines                   | `uniq [OPTIONS] INFILE > OUTFILE`            |
|  diff    | display difference                     | `diff [OPTIONS] FILE1 FILE2`          |
|  comm    | display common lines among files       | `comm [OPTIONS] FILE1 FILE2`          |
|  cut     | break files vertically based on fields | `cut` `–d \"DELIMITER\" –f NUMBER FILE`        |
|  split   | break files horizontally               | `split [OPTIONS] FILENAME`            |
|  paste   | combine files side by side             | `paste FILE1 FILE2 > FILE3`                  |
|  join    | join files based on common field       | `join -t 'DELIMITER' -1 N -2 N FILE1 FILE2` |" %}

### Compression/archiving

{% include table caption="Compression commands" grouped=true content="| Command  | Function                 | Syntax/example usage                                              |
| --------------- | ------------------------ | ----------------------------------------------------------------- |
| zip !rowspan2   | zip compress              | `zip OUTFILE.zip INFILE.txt`           |
|                 |   -- compress directory              | `zip -r OUTDIR.zip DIRECTORY`        |
|  unzip          | decompress zipped file   | `unzip ANYTHING.zip`                   |
| tar !rowspan3   | archive and compress files/directories |                                                     |
|                 |   -- compress               | `tar -czvf OUTFILE.tar.gz DIRECTORY` |
|                 |   -- extract                | `tar -xzvf OUTFILE.tar.gz`           |
|  gzip           | gzip files               | `gzip SOMEFILE`                        |
|  gunzip         | decompress gzipped files | `gunzip SOMEFILE.gz`                   |" %}

</div>



### Additional commands

{% include table content='| Command             | Function                       |
| ------------------- | ------------------------------ |
|  du –sh             | DIR - show directory size      |
|  whoami             | display username               |
|  date               | system date/time               |
|  cal                | calendar                       |
|  find . –name FILE  | find a file/directory          |
|  which CMD          | display default cmd path       |
|  whereis CMD        | show possible locations of cmd |
|  locate FILE        | find instances of a file       |
|  clear              | clear screen                   |
|  sleep 5            | pause 5 (any) seconds          |
|  top                | current running processes      |
|  ps                 | current running processes      |
|  wget               | URL - download specified URL   |' %}

## Shortcuts

{% include table content="| key combination | description |
| --               | --           |
| arrows left (`←`) / right (`→`) | Move the cursor left or right one character at a time. |
|  Ctrl` + `A     | Jump to the beginning of the command line. |
|  Ctrl + E     | Move to the end of the command line.       |
|  Alt + B      | Move backward one word.                    |
|  Alt + F      | Move forward one word.                     |
|  Ctrl + U     | Clear everything before the cursor.        |
|  Ctrl + K     | Delete everything after the cursor.        |
|  Ctrl + W     | Delete the previous word.                  |
|  Ctrl + Y     | Paste back the last deleted text. (`Ctrl` + `U`; `Ctr` + `K` ; `Ctrl` + `W`) |
|  Ctrl + L     | Clear the terminal screen (equivalent to the `clear` command). |
|  Ctrl + C     | Kill the current process                   |
|  Tab          | Autocomplete command names, filenames and paths. [Command autocompletion](./commands/autocompletion) |
| arrows up (`↑`) / down (`↓`) | Cycle through previously entered commands. |" %}

### Nano Shortcuts

{% include table content='| Command | Function                |
| -------- | ----------------------- |
|  ctrl+r  | read/insert file        |
|  ctrl+o  | save file               |
|  ctrl+x  | close file              |
|  alt+a   | start selecting text    |
|  ctrl+k  | cut selection           |
|  ctrl+u  | uncut (paste) selection |
|  alt+/   | go to end of the file   |
|  ctrl+a  | go to start of the line |
|  ctrl+e  | go to end of the line   |
|  ctrl+c  | show line number        |
|  ctrl+_  | go to line number       |
|  ctrl+w  | find matching word      |
|  alt+w   | find next match         |
|  ctrl+\  | find and replace        |' %}

## Pipes, Redirects

{% include table content='| Command                                    | Function                      |
| ------------------------------------------ | ----------------------------- |
| CMD `< file`    | use file as input             |
| CMD `> file`    | write output to file          |
| CMD `>> file`   | append output to file         |
| CMD `2> stderr` | error output to file          |
| CMD `1>&2 file` | send output and error to file |
| CMD1 `\|  CMD2` | send output of CMD1 to CMD2   |' %}

## Pre-declared variables

The `env` command lists all the assigned variables

{% include table content="| Variable     | Description                  |
| ------------ | ---------------------------  |
|  $USER        | username                    |
|  $HOME        | home path                   |
|  $PWD         | working directory path      |
|  $PATH        | path for executables        |
|  $HOSTNAME    | machine name                |
|  $SHELL       | current shell               |
|  $SSH_CLIENT  | local client's IP address   |
|  $TERM        | type of terminal            |" %}



{% include alert class="tip" content="There is an [A-Z Index of the Bash commands for Linux](http://ss64.com/bash/index.html)." %}