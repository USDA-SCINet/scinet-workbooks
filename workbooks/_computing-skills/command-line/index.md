---
title: "Introduction to Command Line Computing"

index: 1
order: 1
tags: [command line]

author: Aleksandra Badaczewska
type: introduction

terms:
   - term: Command Line Interface
     Key-difference: "It's a concept, not a specific software. CLI describes the environment in which commands are entered and executed."
   - term: Terminal
     Key-difference: "A terminal is just the container or access point for the CLI, but it doesn't process the commands itself."
   - term: Shell
     Key-difference: "The shell is a program running within the terminal to interpret and execute commands. Different shells have unique features and syntax." 
     Examples: "Unix shell: Bash, Zsh, ksh, tcsh"
     link: "/computing-skills/command-line/unix" 
   - term: Command Line
     Key-difference: "The command line is a specific part of the CLI environment." 
     Examples: "Usually preceded by a prompt, e.g., <code>user@host:~$</code> in Unix/Linux or <code>C:\\></code> in Windows."

objectives: "The fundamentals of the Command Line Interface (CLI) including its key components: the terminal interface and the Unix shell."

overview: [objectives, terminology]
---

## Overview

The Command Line Interface (CLI) is a way to interact with a computer by typing text commands in a program called a terminal, 
rather than using a graphical interface.

The Command Line Interface (CLI) is a text-based way to interact with your computer, rather than relying on mouse-driven point-and-click navigation. To access the CLI, 
you use a terminal, which is the interface tool that provides a space for typing and viewing commands. 
By typing commands, you can perform tasks like managing files, running programs or configuring the system. Behind the scenes, 
a shell interprets these commands and communicates with the operating system to execute them. 

Together, the CLI, terminal and shell form a powerful ecosystem for controlling your computer efficiently 
and performing your computational tasks with precision, speed, automation, and flexibility.

{% include overviews %}


## What is the Command Line Interface?


The command line interface (CLI) serves as a direct communication channel between the user and the computer's operating system.
It is a text-based environment where all interactions happen in a single window. Users type and submit commands to instruct the computer and the computer responds with text messages or outputs. This creates a simple and efficient way to communicate with the system, 
directly interacting with the computer's core functions without relying on visual, clickable components.

{% include alert role="region" class="highlighted" title="All actions taken in the CLI are permanent" content="Any changes made in the CLI are permanent and will be reflected in the GUI.  
For example, if you create a file using a CLI command, you can see the file appear in the GUI's file manager." %}


### How does CLI differ from GUI?

The primary difference between CLI and GUI lies in how users interact with the system. 
- GUIs are user-friendly and intuitive, but they can be slower and less flexible for advanced tasks. 
- In contrast, the CLI is ideal for repetitive actions, scripting, and working with large amounts of data.

![GUI vs CLI]({{ images_path }}/cli_vs_gui.png)

{% include table content="| aspect | GUI | CLI |
|--------|-----|-----|
| Layout          | Multiple windows and graphical elements, often organized in a layered or desktop-style interface. | Single text-based window where all interactions occur. |
| Interaction     | Users interact with visual elements like icons, buttons, and menus, primarily using a mouse.      | Commands are typed using a keyboard, requiring familiarity with specific syntax. |
| User Input      | Combines mouse clicks and keyboard inputs for intuitive interaction.                              | Relies solely on keyboard inputs for navigation and task execution. |
| Feedback        | Visual feedback is provided through changes in graphics, animations and pop-ups.                  | Responses are displayed as plain text or lists directly in the same window. |
| Navigation      | Navigation is performed by clicking through hierarchical folders or graphical menus.              | File system and directories are navigated using typed commands like `cd` and `ls`. |
| Accessibility   | Designed to be more intuitive and accessible to beginners without prior knowledge.                | Requires knowledge of commands and syntax to use effectively. |
| Customization   | Limited customization, primarily through settings and pre-built themes.                           | Highly customizable with scripts, aliases and configuration files. |
| Resource Usage  | Resource-intensive due to graphics and multiple active elements.                                  | Lightweight, as it doesn't require graphical processing. |
| Task Complexity | Best suited for straightforward, one-off tasks that benefit from visual interaction.              | Ideal for handling complex and repetitive tasks through scripting and automation. |
| Learning Curve  | Shallower learning curve, as visual cues guide the user.                                          | Steeper learning curve due to the need to memorize commands and syntax. |" %}


### Why use CLI?

The CLI is essential for researchers handling advanced computational projects, including data processing, simulations, and software development. 
Its efficiency, automation potential, and scripting capabilities, along with the ease of documentation for knowledge retention and reproducibility, 
make it a critical tool for complex tasks.

The CLI provides several key advantages that make it beneficial for advanced or large-scale tasks:

* **Speed:** Tasks can be performed more quickly by typing commands instead of navigating through menus.
* **Precision:** Commands offer granular control over system operations. You can customize tasks.
* **Automation:** Scripts allow repetitive tasks to be automated, saving time and effort.
* **Scalability:** The CLI is well-suited for managing large-scale operations, such as processing thousands of files.
* **Remote Accessibility:** The CLI can be connected remotely over secure protocols like SSH, providing access to HPC.
* **Universality:** Many CLI tools and commands work across platforms, providing a consistent interface.
* **Lightweight Operation:** Since the CLI doesn't require graphical resources, it's ideal when working remotely on HPC.

Whether working in bioinformatics, geospatial analysis or other agricultural domains, the CLI provides capabilities 
for managing large datasets, automating workflows, and leveraging powerful computing resources.

* **Bioinformatics:**
    * Running a sequence alignment using `muscle` or `clustal` through the CLI on SCINet HPC.
    * Automating quality control checks across hundreds of genomic files using a shell script.
* **Geospatial Analysis:**
    * Batch processing satellite images using CLI tools like `GDAL` on SCINet HPC.
    * Automating the extraction of crop coverage statistics from shapefiles across multiple regions.

## CLI on the SCINet HPC

You can access the command line interface in multiple ways on SCINet.

1. **Most of the tutorials can be completed using the Open OnDemand interface to launch the shell.**  If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.
2. If you are using the OOD [desktop interface](/about/use#launching-the-desktop), you can open a terminal by clicking the terminal icon at the bottom of the desktop screen.  If this option is expected, it will be specified in the tutorial.
3. You can also [access SCINet systems via SSH](https://scinet.usda.gov/guides/access/ssh-login), which allows you to connect to SCINet systems via the command-line terminal.  Please note that for most use cases, you do not need to do this! We recommend Open OnDemand as a simpler, more versatile alternative to SSH.

