---
title: "Introduction to Command Line Computing"

index: 1
order: 1
tags: [command line]

author: Aleksandra Badaczewska
type: introduction

##terminal-terms: [Terminal, Welcome Message, Prompt, Command Line]
##shell-terms: [Shell, Bash, Command, Standard Out, Standard Error, Built-in commands, Aliases, Shell function, Startup script, Environment Variable, Syntax]
##cl-terms: [Input Area, Cursor, Argument, Flag or Option, Pipes, Background Process, Foreground Process, Exit Code]

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

objectives: "The fundamentals of the Command Line Interface (CLI) including its key components: the terminal interface and the Unix shell."

overview: [objectives, terminology]

questions:
  - question: this is a question
    qid: 1
    solution: This is a solution to the question 
  - question: "this is a second question"
    qid: 2
    answers: 
      - answer1
      - answer2
      - answer3
    responses:
      - This shows up if you select answer 1
      - This shows up if you select answer 2
      - This is response 3
    answer: 3
  - question: "this is a third question"
    qid: 3
    answers: 
      - answer1
      - answer2
      - answer3
    answer: [2,3]

---

## Overview

The Command Line Interface (CLI) is a way to interact with a computer by typing text commands in a program called a terminal, 
rather than using a graphical interface.

The Command Line Interface (CLI) is a text-based way to interact with your computer, rather than relying on mouse-driven point-and-click navigation. To access the CLI, 
you use a terminal, which is the interface tool that provides a space for typing and viewing commands. 
By typing commands, you can perform tasks like managing files, running programs or configuring the system. Behind the scenes, 
a shell interprets these commands and communicates with the operating system to execute them. 

Together, the CLI, terminal and shell form a powerful ecosystem for controlling your computer efficiently 
and performing your computational tasks with precision, speed, automation and a level of flexibility that is often unmatched by graphical user interfaces.

![GUI vs CLI](./assets/img/cli_vs_gui.png)  

{% include overviews %}


## What is the Command Line Interface?


The command line interface (CLI) serves as a direct communication channel between the user and the computer's operating system.
It is a text-based environment where all interactions happen in a single window. Users type and submit commands to instruct the computer and the computer responds with text messages or outputs. This creates a simple and efficient way to communicate with the system, 
directly interacting with the computer's core functions without relying on visual, clickable components.

  ![Altas CLI](./assets/img/atlas-cli.png)

{% include alert role="region" class="highlighted" title="All actions taken in the CLI are permanent" content="Any changes made in the CLI are permanent and will be reflected in the GUI.  
For example, if you create a file using a CLI command, you can see the file appear in the GUI's file manager." %}


### How does CLI differ from GUI?

The primary difference between CLI and GUI lies in how users interact with the system. 
- GUIs are user-friendly and intuitive, but they can be slower and less flexible for advanced tasks. 
- In contrast, the CLI is ideal for repetitive actions, scripting, and working with large amounts of data.

![GUI vs CLI](./assets/img/cli_vs_gui.png)

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


{INCLUDE - table of the terminology noting the specific differences between the terms}

## CLI on the SCINet HPC

{INCLUDE - Information about CLI options on SCINet, including link to the Access section on the SCINet website}

{% include assessment qid=1 %}
{% include assessment qid=2 %}
{% include assessment qid=3 %}
