---

title: Unix Basics
description: Getting started with Bash on SCINet
type: interactive tutorial 

tags: [unix, bash, command line] 

terms:
  - term: Command Line Interface
    link: "/computing-skills/command-line/cli-interface/concepts/" 
    Key-difference: "It's a concept, not a specific software. CLI describes the environment in which commands are entered and executed."
  - term: Terminal
    link: "/computing-skills/command-line/cli-interface/terminal/"
    Key-difference: "A terminal is just the container or access point for the CLI, but it doesn't process the commands itself."
    Examples: "GNOME Terminal, Windows Terminal, iTerm2"
  - term: Shell
    link: "/computing-skills/command-line/cli-interface/shell/"
    Key-difference: "The shell is a program running within the terminal to interpret and execute commands. Different shells have unique features and syntax." 
    Examples: "Unix shell: Bash, Zsh, ksh, tcsh"
  - term: Command Line
    link: "/computing-skills/command-line/cli-interface/shell/commands/" 
    Key-difference: "The command line is a specific part of the CLI environment." 
    Examples: "Usually preceded by a prompt, e.g., <code>user@host:~$</code> in Unix/Linux or <code>C:\\></code> in Windows."

language: Bash

author: [Andrew Severin, Aleksandra Badaczewska, Moe Richert, Lavida Rogers]
## author name

updated: 2025-06-17 
## last date updated - not required but useful

objectives: "By the end of this tutorial, you will be able to:

  - Understand the role and purpose of the Unix shell

  - Execute basic shell commands for interacting with the system

  - Navigate the file system using paths

  - Create/copy/move/remove directories and files

  - List contents of directories

  - Preview file contents

  - Edit text files using command-line editors

  - Modify file permissions"

overview: [objectives, terminology]

order: 1

questions:
  - question: Write a command that prints your name and the current date together. 
    qid: 2
    solution: "Example output: `name=\"ARS SCINet\"`

  * `echo \"$name  $(date)\"`

  * OR `echo \"My name is $name and today's date is $(date).\"`"
  - question: "What does the shell do when a variable has not been defined?  Observe what happens when you run `echo $variable_notset`"
    qid: 3    
    answer: 3
    answers: 
      - An error message saying the variable is not defined
      - Prints the variable name, `$variable_notset`
      - An empty line (no output)
      - Prints null
  - question: "Why might variables be useful in longer scripts or complex command sequences?"
    title: "Thought Question" 
    qid: 4
  - question: How should you correctly call or use a variable in Bash to display its value?
    qid: 5
    answer: 2
    answers: 
      - "Type `$my_var` on its own in the terminal"
      - "`echo \"$my_var\"`"
      - "`run ($my_var)`"
      - "`($my_var)`"
  - question: "Run `ls -la` and look at the first column of each line. What does the starting character (- or d) tell you?"
    qid: 6
    solution: "A dash indicates a file and the d indicates a directory"
  - question: "*	Use `pwd` to see where you are. 

*	If you are not in `unix_tutorial`, navigate to `unix_tutorial`

*	Create two subdirectories: `raw_data` and `logs` and then confirm they exist. 

*	Navigate to the `logs` folder, then return to the `unix_tutorial` folder using `cd ..` and `cd -`.  


What's the difference in behavior?"
    title: "Exercise"
    qid: 7
  - question: "What is the output of this command: `echo \"Current user: $(whoami)\"`?"
    qid: 8
    answer: 2
    answers: 
      - "Displays Current user: whoami"
      - "Displays Current user: followed by your username"
      - "Syntax error"
      - "Login time of the current user" 
  - question: "Which of the following is the correct way to access a manual for the command?"
    qid: 9
    answer: 4
    answers: 
      - "`man -ls`"
      - "`ls -man`"
      - "`help man`"
      - "`man ls`"
  - question: "What is the purpose of the up-arrow key in the shell?"
    qid: 10
    answer: 4
    answers:
      - "Deletes the last command"
      - "Displays help options for a command"
      - "Shows environment variables"
      - "Repeats the previous command"
  - question: "How could you confirm the files were created?"
    qid: 11
    solution: "You can run `ls` to see what is in this directory and confirm your files were added."
  

---

## Overview

This tutorial introduces important command-line skills for navigating and managing files in a Unix-based system. We will learn how to interact with the Shell, understand directory structures, view and modify file permissions and use common commands like `ls`, `cd`, `chmod`, `mkdir`. This tutorial is designed to offer a practical introduction through guided examples and hands-on practice of the basics on Unix to prepare for more advanced scripting.

{% include overviews %}



## Getting Started
To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  



### Tutorial Steps:
1. Interacting with the Shell
1. Navigating the Unix file system
1. File management
1. Editing Files
1. Understanding and changing file permissions


## Interacting with the Shell

In this section, you will learn the structure of Unix commands and basic commands for displaying messages, checking system information and accessing built in help tools. 

The shell accepts text input in the form of commands and returns an output. Shell commands often have options (flags) and arguments which are used to modify the behavior of shell commands. 

<div class="process-list" markdown="1">

### Basic commands

Basic command structure: 
`command [options] [arguments] `
1.	`command` : the name of the program or built-in shell command e.g `ls`, `echo`
2.	`options` : modifies the behavior of the command and usually start with a dash or double dash (--) eg `cp -r` (copy recursively)
3.	`arguments` : inputs the command acts on such as file names or directories

Now that we understand the structure of commands in the shell, let us explore some basic system commands: 

* `whoami` : displays your current username
* `date` : displays the current date and time 
* `cal` : prints the current month's calendar
* `hostname` : shows the machine/cluster name (useful for when on HPCs)
* `clear` : clears the terminal window
* `env` : prints a list of environment variables

#### Echo

To display a message, we use `echo`. Echo prints quoted text.  This can be useful for tasks such as printing values of variables, displaying error messages, or showing script progress.
Run the following command:   
```
echo "Hello, $USER"  
echo "It is very rainy today."
```  

This will print the text to the screen. 


{% include alert class="question" title="Exercise: Using `echo`" content="Try printing your own message using `echo`" %}



#### Unknown commands
The shell will notify you if you are using unknown commands by displaying `command not found`.

To demonstrated this, run the command `loading`.   

```
loading
```  

You will see an error message that says `loading: command not found`  


### Shell Variables
You can store values to variables in the Unix shell which can be used to execute commands. To reference the value of a variable, use a dollar sign `($)`.  
For example: `echo $USER`  

You can also create your own variables, for example:
```
name="Jim"
echo $name
```

Note that there are no spaces between the `=` when assigning the value to a variable. 

**Command substitution** : You can also insert the result of a command inside another command using `$(…)`. 

For example: 
```
echo "His name is $(name)"
```

{% include question qid="2,3,4,5" title="Exercise" %}

### Command History
Most Unix-like shells, including Bash, keep a history of past commands you've typed. You can access them with a command:
`history`.

This displays a numbered list of previous commands, with the most recent ones at the bottom.  
To explore this output, you can scroll up the page. If the list is long, limit the output to show only the last N=20 commands:
```
history 20
```

### Navigating history with keyboard
Besides using history command to display the entire command history or showing a specific number of recent entries, you can also browse past commands one at a time using keyboard shortcuts. 
*	Press ↑ (Up Arrow) to go to the previous command.
*	Press ↓ (Down Arrow) to move forward in history.

For faster navigation and editing, when working with long or multi-line commands:
*	Ctrl + A moves the cursor to the beginning of the line.
*	Ctrl + E moves the cursor to the end of the line.

Incremental search through command history: `Ctrl + R`
Incremental search allows you to dynamically search through your command history as you type, refining results with each keystroke. This is particularly useful in HPC environments where job submission or data processing commands are frequently reused.
* Press `Ctrl + R` and start typing part of a previous command, e.g., `echo`.
The shell will dynamically display the most recent matching command:
`(reverse-i-search) echo "His name is $(name)`
* Press Enter to execute the command immediately.
* Press → (Right Arrow) to move the command to the prompt for editing before execution.
* Press Ctrl + A to move the cursor to the beginning of the command.
* Press Ctrl + E to move the cursor to the end of the command.
* Press Ctrl + R again to cycle through older matches.
* Press Ctrl + G to exit the search without selecting a command.

{% include alert class="question" title="Exercise" content="Use `history` to re-run your third command" %}


### Learning more about commands with help and man:
The shell provides built-in resources to help you understand command syntax and options directly in your terminal. The two main tools for this are: 
*	`man` `(manual)`: a built-in reference for most Unix commands
*	`--help`: gives a quick summary of options for many commands


To learn more about the command, `echo`, use `--help`. This shows options for the command.  
```
echo --help  
date --help  
```

The `man` command will provide a description of a unix command and list the parameters that can be used to modify its behavior. To exit the manual for a command you press `q` on your keyboard.
Run:
```
man whoami  
man ls  
man less  
```



{% include alert class="question" title="Exercise" content="Use `man` to look up a command you haven't tried yet" %}

For more in-depth information about navigating the built-in documentation for system commands and utilities, see our tutorial for [Command manual](./manual).


###  Self-check: 
{% include quiz qid="8,9,10" %}


</div>

## Navigating the Unix File System


This section introduces a variety of commands necessary for moving through directories in the Unix shell. You will learn how the file system is structured, how to view the contents of folders and how to use both absolute (begins with the root /) and relative paths (relative to your working directory). This section will introduce the most important navigation commands: `pwd`, `ls` and `cd`.

<div class="process-list" markdown="1">

### Print Working Directory (pwd)
When working in the Unix file system, it is always important to understand where you are. The `pwd` command shows your current location in the file system. 

`pwd` gives the absolute path of your current location.   

Example output:  

{:.no-copy}
    /home/username  


It is always a good idea to check where you are before running file operations or navigating the file system. 

Run `pwd` in your terminal. 
```
pwd
```

### List Directory Contents
To see what is in this directory (folder), you will use the command `ls` which list contents of the current directory.

```
ls
```

As mentioned earlier in this tutorial, commands have options. Here are some `ls` options: 
* To view file details (permissions, owner, size, time of creation): `ls -l`
* To view hidden files: `ls -a`
* To view human-readable file sizes: `ls -h`

Note that you can combine options for a desired result:
* To view long format and hidden files: `ls -la`
* To view long format and human readable file sizes: `ls -lh`


{% include question qid=6 %}

### Create a working directory:

The make directory (mkdir) command allows you to make new directories/folders in Unix. 

Let's run the following command to create a directory named `unix_tutorial` in your current location:  
```
mkdir unix_tutorial 
```

You will not see anything printed on the screen after you run this command. If you try to run it again you will see the following error:  
`mkdir: cannot create directory 'unix_tutorial': File exists`

To check to see if the directory was made, we will use `ls` to list the contents of the current directory where you created the folder.   
```
ls
```  

### Moving around with the command cd (change directory)
We can change to the `unix_tutorial` directory using the `cd` command.
Run:
```
cd unix_tutorial #change to a different directory 
pwd #to see our current location
```

We are now in a directory called `unix_tutorial` which is a subdirectory of home.

**cd shortcuts:**
* `cd ..`: move up one directory (parent)
* `cd .`: stay in the current directory
* `cd ~`: (or cd) go to home directory
* `cd /`: go to the root directory

To change back to the directory, you created:
```
cd /home/unix_tutorial
```

{% include alert class="tip" content="You can type in first few letters of the directory name and then press Tab to autocomplete rest of the name. This only works when there are unique matches for the starting letters you have typed.  

If there are more than one matching files/directories, pressing Tab twice will list all the matching names.

For a more in-depth tutorial on autocomplete, including how to incorporate it into your own scripts, see [Command autocompletion](./autocompletion)" %}

{% include question qid=7 %}

### Absolute vs relative paths 
Absolute path begins from the root and shows the full path to a location:   
`cd /home/user/Documents`
*	Starts from the root
*	Works from any location

Relative path begins from your current location:    
`cd project/`
*	Based on your current directory
*	Shorter path 

Let's say your current directory is: 
`/home/user`  
Inside your user directory is a folder called `unix_tutorial`.  Let's use a relative path to navigate to logs:
```
cd unix_tutorial/logs
```

Now, let's do the same thing using an absolute path:   
```
cd /home/user/unix_tutorial/logs
```

{% include alert class="question" title="Exercise" content="From within the `raw_data` folder, use a relative path to move to the `logs` folder. Try using an absolute path to return to your `home` directory." %}

### Visualize directory structure with tree
The tree command shows your current directory and its structure in a tree-like format. 

```
cd /home/user/unix_tutorial/logs
tree
```


You've learned how to check your location, view file contents and how to move between directories. Next, we'll explore how to create and manage files and directories. 

</div>

## File management in the Shell

In this section of the tutorial, we learn how to create, modify and organize files and directories using shell. 

<div class="process-list" markdown="1">

### Create empty files with `touch` 
The `touch` command is used to create empty files for scripts, data or text files:

To create one file, run: 
```
touch file1.txt
```

You can also create multiple files at once:  
```
touch file2.txt file3.txt file4.txt 
```


{% include question qid="11" %}

### Copying Files
The cp command makes a copy of files or directories. 
`cp [options] source destination `
Examples: 

To copy a file:  
```
cp file3.txt copy_of_file3.txt
```

To copy a directory and all its contents we add the option (`-r`: recursive):  
```
cp -r directory1 directory2
```

This will copy the folder directory1 and all its contents to directory2. 

Common `cp` command options: 
* `-r` : recursive (used for copying directories)
* `-I`: interactive (prompts before overwriting)
* `-u`: copy only when source is newer
* `-v`: verbose (shows what is being copied)

Before we continue with the rest of the tutorial, let us create a working space so that we can practice managing files safely. In the Getting Started with SCINet Workbooks section, we discuss our recommendations for workspaces for tutorials. 

At this point, we will move into the `/90daydata/shared/$USER` workspace, or a `/project/project_group_name/` workspace if you have one. We will use `/90daydata/shared` for the remainder of this tutorial:  

Let's navigate to `/90daydata/shared/$USER`:  

```
cd /90daydata/shared/$USER/
```

We already created a directory called unix_tutorial, let's copy that directory to our shared folder in `90daydata`:  
```
cp -r /home/unix_tutorial .
```   

The `.` tells the copy command to copy the directory and it contents to the current directory. 

Now, let's change directories:  
```
cd unix_tutorial
```

We are now ready to practice in our working directory safely!

Let's copy some practice files to unix_tutorial: 
````
cp /project/scinet_workshop2/unix_tutorial/numSeq.txt .
cp /project/scinet_workshop2/unix_tutorial/readme.txt .
```

{% include alert class="question" title="You try" content="1. Copy a file in your directory
1. Create a folder and copy into it" %}


### Removing files with `rm`
The `rm` command is used to delete files and directories. 
`rm [options] target`

Examples: 
To delete a file:
```
rm file.txt
``` 

To delete a folder/directory: 
```
rm -r oldfolder
```

Common `rm` command options: 
*	`-i`: prompt before delete
*	`-r`: recursively delete a directory
*	`-f`: force delete no warning
*	`-rf`: recursively force delete directories (be careful with this)
*	`-v`: verbose (shows what's being deleted)

{% include alert class="warning" content="In Unix there is no undo command. If you delete a file, it is gone. There is no trash bin, so use `rm` with care. Additionally, you can only delete files you have created, so it is impossible to delete someone else files without permission." %}


{% include alert class="question" title="You try" content="1. Create and delete a test file 
1. Create and delete a folder" %}



### Moving Files
Before we practice moving and deleting files, let's check our current location: 

```
pwd
```

Are you in the `unix_tutorial` folder? If not, navigate there. 

Let's make another directory:  
```
mkdir cl_practice
```

The `mv` command is used to move files from one directory to another:  
`mv [file] [destination]`

Run: 
```
mv file1.txt cl_practice
```

You can also use `mv` to rename files: 
`mv [filename] [newfilename]`

Run: 
```
mv file2.txt notes.txt
```  

Run: `ls` to see changes


### View file contents
Unix has various commands for viewing file contents. It is easy to remember these commands using this sentence:  

A cat has a head and a tail, more or less.

{% include table caption="File/Directory operations" content="| Command | Description | Example |
| cat | catalog file contents | `cat FILE` |
| head | show first few lines of a file | `head FILE` |
| tail | show last few lines of a file | `tail FILE` |
| more | view file (with less options) | `more FILE` |
| less | view file (with more options) | `less FILE` |
| seq | write a sequence of numbers | `seq 1 1 10` |" %}


* Use the `more` command to step through a file one screen length at a time using the spacebar.
  ```
  more numSeq.txt
  ```
    * Hit `q` to quit the file before reaching the end.
* `less` is similar to the `more` command, but lets you scroll backwards as well.  
  ```
  less numSeq.txt
  ```

{% include table caption="less navigation" content="| Command | Description |
| `q` | quit |
| `u` | up one screen |
| `d` or `space bar` | down one screen |
| `g NUM` | go to line NUM |" %}

### Streaming file content

`cat` is used to concatenate and print files
* This command will print out the entire file. If you use it on the numSeq.txt file, you should see all 100 numbers print to the screen.
  ```
  cat numSeq.txt
  ```
* Note: It is recommended that you use `cat` if the file is small.

`head`: prints the head of the file.
* By default, head will give you the first 10 lines of a file. Try it out with the `numSeq.txt` file.
  ```
  head numSeq.txt
  ```
* If you want an alternative number of lines, you can specify with the `-n` parameter.  For example, if we wanted five instead of the default ten, we would run:
  ```
  head -n 5 numSeq.txt
  ```

`tail`: prints the tail of the file
* This command will give you the last 10 lines of a file. Try it out with the numSeq.txt file.
  ```
  tail numSeq.txt
  tail -n 5 numSeq.txt
  ```
</div>

## Editing files
There are a few ways to edit files in the shell. Unix has built in text editors that allow you to create and edit files directly from the command line. 

Common Text Editors: 
* Nano
* Vim

<div class="process-list" markdown="1">

### Using nano
* `nano [filename]`
* Type directly in window to edit
* `Control + O` to save
* `Enter` to confirm
* `Ctrl + X` to exit

{% include alert class="question" title="You try" content="* Open readme.txt with nano and write a 5 line message
* Save and confirm edit 
* Use cat, head, or tail to see the edits you made to readme.txt" %}

### Using vim
* `vim [filename]`
* Press I to enter inset mode
* Type your content
* Press esc to exit insert mode
* Type: `wq` to write and quit

{% include alert class="question" title="You try" content="* Open `file2.txt`
* Enter insert mode and write 2-3 lines 
* Save and exit 
* Inspect the file for your edits" %}
</div>


## Understanding and changing file permissions
In Unix systems, every file and directory have permissions that describe who can read, write or execute them. In this part of the tutorial, you will learn how to view, interpret and change file permissions. 

<div class="process-list" markdown="1">

### Viewing file permissions

We use `ls -l` to view file permissions.
`ls -l` shows permission string, ownership and modification details of files/directories.
When you run `ls -l [file]`, you'll see something like: `-rw-r—r—1 user group 512 date file.txt`

Permission string: `-rw-r—r--`
*	`-r` = read
*	`-w`= write
*	first set (user_, second (group), third (others))  

Permissions symbols:
-	`r`: read
-	`w`: write
-	`x`: execute
-	`-`: no permission  

Let's break down `-rw-r—r—` by looking at the character positions: 
•	1st position: file type `(-)` which is a regular file 
•	2nd - 4th position: owner rights `(rw-)` the file's creator has read and write access
•	5th - 7th position: group rights `(r--)` people in the same group as the owner can read the file
•	8th - 10th position: others rights `(r--)` everyone else can read the file

To change permissions, we use `chmod`.  

`chmod [options] mode file `

`chmod [who][operator][permissions] file `
Who: 
* `u`:  user
* `g`:  group 
* `o`:  others
* `a`:  all (u+g+o)

Operator:
* `+`:  add permission 
* `-`: removes permission 
* `=` : sets exactly these permissions 

Examples: 
* `chmod u+x script.sh` : add execute permission for the user
* `chmod go-w file1.txt` : removes write permission from group and others
* `chmod a=r file1.txt` : everyone gets read only access
* `chmod u=rwx, g=rx,o=` : user full, group read/execute, others none
* `chmod +x script.sh` : add execute permission  


{% include alert class="question" title="You try" content="1. Make a file readable and writable only by you
2. Remove write access from group and others" %}

### Execute permissions to a file
Here, we will briefly look at scripting to show how permissions control execution. A script is a plain text file that has a sequence of shell commands.
Many script files begin with this line of code `#!/bin/bash`. This line of code tells the system which program to use to run the script and in this example, it will use the Bash shell. 
Additionally, execute permission is needed so that you can run scripts.

1. Let's create an empty file:  
  ```
  touch test_run.sh
  ```
2. Open a text editor:  
  ```
  nano test_run.sh
  ```
3. Edit the `test_run` by typing: 
  ```
  #!/bin/bash

  echo "Just another day of learning the basics of Unix on SCINet!"
  ```
4. Save the file and exit the editor. This creates a script. 
5. View the file to confirm edits were made. 
6. Let's look at the current permissions:
  ```
  ls -lh test_run.sh
  ``` 
7. To make the script executable:  
   ```
   chmod u+x test_run.sh
   ```
9. Let's look at the change in permissions. Do you notice the difference?  
  ```
  ls -lh test_run.sh
  ``` 
10. To run the script:   
  ```
  srun test_run.sh
  ``` 

{% include alert class="question" title="Thought Question" content="Why do you think the system does not let any file be executed by default?" %}

</div>

## Summary

This tutorial introduced basic Unix commands for interacting with the shell, navigating the file system, managing files and directories, viewing files and editing file content from the terminal, and interpreting file permissions. These sections covered foundational skills for working confidently in Unix-based environments. 

