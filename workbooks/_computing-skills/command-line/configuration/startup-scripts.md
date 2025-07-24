---

title: "Startup scripts"
description: "Default content of .bashrc and .bash_profile, for if your file has been accidentally removed or overwritten."
type: reference material
order: 8
tags: [bashrc]

---
## Overview

Below are copies of the default content for the startup scripts as set on the SCINet clusters.

If you have accidentally removed or overwritten your file, you can restore it by copying this content.

Before making changes, always create a backup to restore previous settings if needed.

## bashrc

Below is the default content of `.bashrc` as set on SCINet HPC clusters.

If your file has been accidentally removed or overwritten, you can restore it by copying this content back into `~/.bashrc` to ensure your environment loads correctly with all necessary configurations.


**Ceres**
```bash
# .bashrc
# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi
# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=
# User specific aliases and functions
alias ls='ls --color=auto'
alias UTILITIESgit=Path2thisRepo
export PATH=$PATH:$UTILITIESgit/wrappers
```

**Atlas**
```bash
# @(#).bashrc  2019.04.14
################################################################################
##
##  This is the default HPC2 ~/.bashrc file.
##  This file and others are used to define and setup the user environment.
##  Lines beginning with a # are comments and are ignored by the shell.
##  For additional details, see the bash man page, "man bash".
##
################################################################################
##  Source global definitions: The next line must be the first non-commented line.
[ -f /etc/bashrc ] && . /etc/bashrc
##      =================================================
##  ==== NO MODIFICATIONS SHOULD BE MADE ABOVE THIS LINE ====
##      =================================================
##
##  All modifications should be made below for defining
##  any user aliases, functions, variables, etc.
##  The module call should be used to gain access to software that is NOT
##  included in system defaults or for making personal customizations.
##  Module can be called from within a file or on the command line.
##  "module help" shows additional details.
##  "module avail" shows a list of available software for loading.
##  "module load local" loads a package that adds $HOME/bin to your path.
#module load local
################################################################################
##  All non-interactive shells will exit on the next line.
##  Nothing after this line is used by batch shell scripts.

if [ -z "$PS1" ]; then return; fi

#module load rdesktop

##  Example aliases
alias la='ls -AC'
alias ll='ls -l'
alias lsc='ls -CF'
alias ls='ls --color=auto'
```


## bash_profile

{% include alert class="warning" title="Do not modify `~/.bash_profile`" content="On both SCINet HPC clusters, the `.bash_profile` is already configured to automatically load everything from your `.bashrc`.  
Modifying `.bash_profile` directly can cause conflicts or unexpected behavior in your shell environment." %}



Below is the default content of `.bash_profile `as set on SCINet HPC clusters.  
If your file has been accidentally removed or overwritten, you can restore it by copying this content back into `~/.bash_profile` to ensure your environment functions correctly.

**Ceres**
```bash
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
        . ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/.local/bin:$HOME/bin
export PATH
```

**Atlas**
```bash
# @(#).bash_profile  2015.01.28
################################################################################
##
##  DO NOT REMOVE OR MODIFY THIS FILE  -- HPC2 Computing Office
##
##  This is the default HPC2 ~/.bash_profile file.
##  It is used to source the ~/.bashrc file.
##  This file should not be removed or modified.
##  Any user aliases, functions, variables, etc.
##  should be placed in the ~/.bashrc file instead.
##
################################################################################
[ -f $HOME/.bashrc ] && . $HOME/.bashrc
```