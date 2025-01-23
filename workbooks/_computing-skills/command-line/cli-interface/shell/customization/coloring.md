---

title: "Text coloring: <code>LS_COLORS</code>, <code>GREP_COLORS</code>"
description: "Color-based highlighting of command outputs, including file types in listings and matched patterns in search results."
type: interactive tutorial
order: 2
tags: [UNIX, ANSI codes, shell text coloring, text output styling, shell customization, LS_COLORS, GREP_COLORS, bashrc]
packages: 
level:
author: Aleksandra Badaczewska

---

## Overview

This interactive tutorial covers techniques to customize shell output for improved readability and organization by applying ANSI color codes and environment variables such as `LS_COLORS` and `GREP_COLORS`. You will learn how to colorize and highlight important information and enhance the visibility of different types of text output, such as differentiating file types, emphasizing matched patterns and distinguishing standard output from errors. All instructions are fully compatible with the SCINet HPC environment, making your cluster experience more intuitive and efficient in no time.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Understand how ANSI escape codes work and how they can be used for text styling in the shell.
* Gain practical skills for colorizing terminal output, such as enhancing `ls` and `grep` readability.
* Persist your customizations across sessions and ensure compatibility with different shells.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Acquire knowledge of how to apply ANSI escape codes for effective text coloring in **Bash and Zsh shells**.
* Develop confidence in setting the `LS_COLORS` and `GREP_COLORS` for improved text output readability on SCINet clusters.
* Learn how to save your configurations permanently in `.bashrc` or `.zshrc`.
* Understand how to troubleshoot common issues when working with shell customizations.
</div>
</div>


### Tutorial scope

This tutorial offers a comprehensive, hands-on guide to customizing shell environments using text output coloring and styling techniques. The focus is on practical, real-world applications of shell customization, including persistent configurations and troubleshooting for productivity and improved convenience on SCINet computing clusters.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **ANSI escape codes:** Special sequences used in the terminal to control text appearance (color, bold, underline).
* **CLI text styling:** Adjusting terminal text with colors, effects (like bold or underline), and symbols to highlight important information.
* **LS_COLORS** and **GREP_COLORS**: Setting shell variables to differentiate file types in listings and matched patterns in search results.
* **Variable Persistence:** Techniques for storing customizations across sessions using configuration files like `.bashrc` and `.zshrc`.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **Configuration file:** Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings, including text coloring and prompt styles.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1">    
* **Text styling for readability:** Enhance terminal output with colored text for better visibility of errors and key results.
* **Persistent customization:** Apply long-term shell modifications by editing shell configuration files.
* **Troubleshooting in shell setups:** Resolve common HPC issues like unexpected color resets across login and compute nodes.
</div>
</div>


### Prerequisites 

[Pre-setup for shell customization on SCINet HPC](/computing-skills/command-line/cli-interface/shell/customization/index#prerequisites)

----

## **Text coloring** for shell output

Use Cases for Text Coloring:
* Highlighting errors and warnings.
* Making system information stand out.
* Add visual separation between commands and results.

### ANSI escape codes

(Explanation of ANSI codes and how they affect terminal output.)

#### Syntax of ANSI codes

* `\e[m` structure explained.
* Common color codes and effects:
  * Text colors (red, green, yellow, etc.)
  * Background colors
  * Effects like bold, underline, etc

Demonstration Exercise:
* Print colored text in the terminal using echo and escape sequences.

## Coloring ls output with `LS_COLORS`

## Customizing `grep` output with `GREP_COLORS`

## Persisting shell customizations

## Sample shell configurations

### `.bashrc`

### `.zshrc`

## **Troubleshooting common issues**
