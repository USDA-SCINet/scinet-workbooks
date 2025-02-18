---

title: 'Command manual '
description: "Built-in documentation providing detailed descriptions, usage and options for system commands and utilities."
type: interactive tutorial
order: 4
tags: 
packages: 
level: 
author: Aleksandra Badaczewska

---

# Overview

This interactive tutorial explores the command manual, a built-in system for accessing detailed documentation about shell commands and utilities. 
By using manual pages (`man`), quick-help options (`--help`) and other lookup tools (`whatis`, `apropos`), users can efficiently find command syntax, 
descriptions and examples—without leaving the terminal. This tutorial provides hands-on exercises to help you confidently navigate command manuals 
and get the information you need when working in the shell.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Learn how to use the manual pages (`man`) to find command details and options.
* Explore alternative quick-help tools (`--help`, `whatis`, `apropos`) for fast lookups.
* Develop skills to efficiently navigate and search within manual pages.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Use `man` pages to access detailed documentation on shell commands.
* Quickly find command usage with `--help` and related lookup tools.
* Search within manual pages for specific keywords and options.
* Understand manual page sections and how to retrieve relevant documentation efficiently.
</div>
</div>


### Tutorial scope

This tutorial provides a hands-on guide to using the shell's built-in documentation system, focusing on efficient lookup methods, 
navigation shortcuts and practical applications for HPC workflows. Users will learn how to quickly find information, 
troubleshoot command usage and optimize their work without relying on external documentation.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **`man` pages:** Detailed documentation for Unix commands, including syntax, options and examples.
* **Quick-help (`--help`):** A command-line flag that provides a brief summary of command usage.
* **Command lookup tools (`whatis`, `apropos`):** Methods for finding command descriptions and related utilities. 
* **Manual page navigation:** Shortcuts for searching, scrolling and exiting (`/search`, `q`, `h`). 
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **`man` command:** Displays detailed manual pages for system commands.
* **`--help` flag:** Provides a quick command summary directly in the terminal.
* **Navigation tools:** `/` (search), `q` (quit), `h` (help) for interacting with manual pages.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1"> 
* **Finding command usage and syntax:**  Learn how to use commands correctly with `man` and `--help`.
* **Searching for relevant commands:** Use `apropos` to find related tools for specific tasks.
* **Troubleshooting errors:** Look up error messages and options in command documentation.
* **HPC environment optimization:** Quickly access reference material for complex HPC utilities.
</div>
</div>

---


