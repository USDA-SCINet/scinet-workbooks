---

title: "Shell prompt styling"
description: "Adjusting the shell prompt appearance to display dynamic information such as the user, working directory and more."
type: interactive tutorial
order: 2
tags: [unix, customization]
author: Aleksandra Badaczewska

objectives:
  - Learn to modify the shell prompt (`PS1`) to display helpful information, including dynamic content.
  - Develop practical skills to colorize your shell prompt and make it more informative.
  - Persist your customizations across sessions and ensure compatibility with different shells.

concepts:
  - "**ANSI escape codes:** Special sequences used in the terminal to control text appearance (color, bold, underline)."
  - "**Shell prompt (PS1):** A customizable string displayed in the terminal, commonly showing the user, hostname and current directory."
  - "**Prompt Customization:** Modifying `PS1` to create a visually engaging and functional shell prompt."

terms:
  - Bash shell

overview: [objectives,concepts,terminology]
---

## Overview

This tutorial focuses on enhancing your shell experience by mastering prompt customization for improved clarity, productivity, and aesthetics. Through practical examples and hands-on exercises, you will learn how to modify your shell prompt (PS1) to display dynamic information such as the user, working directory and custom variables. The tutorial also covers syntax for adding colors to your prompt using ANSI escape codes. 

{% include overviews %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  

## Prompt styling basics

The shell prompt is the text that appears before you type a command in the terminal. It updates dynamically with user actions, such as changing directories. Personalizing it allows you to display helpful system information directly to improve clarity and usability, especially in advanced computing environments like HPC clusters.  
![default prompt]({{ images_path }}/default_prompt.png)

Its behavior and appearance are controlled by the PS1 variable (Prompt String 1) in most Unix shells like Bash and Zsh. This variable is composed of colored elements that dynamically update with information like the `username`, `hostname` and `current directory`, using a combination of placeholders and ANSI escape codes for customization.

{:.no-copy}
```
[alex.badacz@atlas-login-1 ~]$
[username@hostname workdir]$
```
The default shell prompt typically displays:
- **Username:** To indicate the current user logged in.
- **Hostname:** Identifying the system or server.
- **Current working directory:** The directory where commands will be executed.
- **Prompt symbol:** `$` for a regular user and `#` for the root user.

<div class="process-list ul" markdown="1">

### Prompt Elements

Prompt elements are placeholders that dynamically display useful system information, such as the username, hostname, current directory, and time, helping users to customize the prompt for better context and usability. A few predefined shortcuts, prefixed with a backslash (`\`), provide a quick way to insert these elements and make it easier to personalize the prompt efficiently. These elements can be further organized using separators, such as colons (`:`) and spaces, to improve readability.  The prompt marker, such as `$` for regular users and `#` for root, serves as a starting point for entering commands.


{% include table caption="Dynamic Placeholders" content="| Element | Description | Example output |
| --      | --          | --             |
| `\u`    | Username    | `alex.badacz` |
| `\h`    | Hostname (system name) | `atlas-login-1` |
| `\H`    | Full hostname (including domain) | `atlas-login-2.hpc.msstate.edu` |
| `\w`    | Current working directory (full path) | `/home/alex.badacz` |
| `\W`    | Current working directory (basename only) | `alex.badacz` or `~` |
| `\t`    | Current time in HH:MM:SS format (24-hour) | `14:35:22` |
| `\T`    | Current time in HH:MM:SS format (12-hour) | `02:35:22` |
| `\d`    | Current date in Weekday Month Date format | `Mon Jan 15` |
| `\j`    | Number of jobs currently managed by the shell | `3` |
| `\l`    | Current terminal device (tty) | `pts/0` |
| `\n`    | Newline (starts a new line in the prompt) | (New line) |
| `\s`    | Name of the shell | `bash` |
| `\v`    | Version of the shell | `5.1.8` |
| `\V`    | Detailed version of the shell | `5.1.8(1)-release` |
| `\!`    | Command history number | `123` |
| `\#`    | Command number in the current session | `45` |
| `\$`    | Typical prompt marker; shows `$` for normal users and `#` for root | `$` or `#` |
| `\\`    | Backslash character `\` | `\` |" %}

{% include table caption="Separators and Markers" content="| Element | Description | Example output |
| --      | --          | --             |
| `@`     | Typically used as a separator between user and hostname, e.g., `\u@\h`         | `alex.badacz@atlas-login-1` |
| `:`     | Typically used as a separator between hostname and workdir path, e.g., `\h:\W` | `atlas-login-1:~` |
| space   | A white character, such as a space or tab, is used as an element separator to enhance readability, e.g., `\d \u` | `16:33:09 alex.badacz` |
| `[` `]` | Brackets are used for enhanced clarity and visibility, e.g., `[\d] \u`       | `[16:33:09] alex.badacz` |" %}


<div class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
The `\$` is used instead of `$` because the dollar sign has a special meaning in the shell, representing variables and commands, 
so escaping it (`\$`) ensures it is displayed literally in the prompt, whereas `@` does not have special meaning 
and can be used directly as a separator.
</div>
</div>

### Prompt Variable: `PS1`

Prompt behavior and appearance are controlled by the Prompt String 1 (`PS1` shell variable) in most Unix shells like Bash and Zsh. 
It is defined like any other [shell variable](../variables), with a string value assigned to the variable name. 
This string is composed of placeholders that represent various prompt elements dynamically updated by the shell.

```
PS1="[\u@\h \W]\$ "
```
* This will display the prompt in the format explained above, i.e., `[username@hostname workdir]$ ` for example:

  {:.no-copy}
  ```
  [alex.badacz@atlas-login-1 ~]$ 
  ```
  This is a typical default mono-color prompt found on many computing machines, including HPC systems.


Users can personalize `PS1` to better suit their needs by modifying its appearance: adjusting the text content, elements order and adding colors.




### Prompt Colors & Effects

You can modify text colors and effects in the prompt using ANSI escape codes. These codes use `\e`, the ANSI escape character, followed by a color code. Text placed immediately after an ANSI escape code will take on the desired color or effect, and the sequence should always be terminated with the reset code (`\e[0m`) to revert to normal formatting. 

You can test ANSI color codes followed by custom text in the terminal using the `echo -e` command (with single quotes `''`) before applying them to your custom `PS1` prompt configuration.

{% include table caption="Simple ANSI prompt examples" content="| Escape code | Effect     | Example syntax      | Code for testing in a terminal |
| --          | --         | --                | --           |
| `\e[31m`    | <span style=\"color: red;\">Red text</span>   | `\e[31mError!`    | `echo -e '\e[31mError!\e[0m'` |
| `\e[32m`    | <span style=\"color: green;\">Green text</span> | `\e[32mSuccess!`  | `echo -e '\e[32mSuccess!\e[0m'` |
| `\e[1m`     | **Bold text**  | `\e[1mImportant!` | `echo -e '\e[1mImportant!\e[0m'` |
| `\e[0m`     | Reset (clears all styling) | `\e[0m` *(back to normal)* | - |" %}

![Simple ANSI code examples]({{ images_path }}/ansi-simple-examples.png)

#### Example of single-colored PS1

```bash
PS1="\e[32m\u@\h:\w\$ \e[0m"
```
- placeholders: `\u` for username, `\h` for hostname and `\w` for current directory
- ANSI escape sequences `\e[32m` for green text and `\e[0m` to resets text formatting at the end of the prompt syntax

Output: Green prompt string including username, hostname and working directory, with a default `$` prompt marker.
![green prompt example]({{ images_path }}/green-prompt-example.png)


Inserting escape codes start formatting from the point they appear and continue until they are explicitly reset using the reset code (`\e[0m`). 
Each escape code applies a specific color or style to the text that follows, and without resetting, the effect persists across the entire prompt 
or command output.

{:.no-copy}
```
PS1="\e[32m\u@\h:\w\$ "     # missing \e[0m at the end of the syntax
```
![ps1 missing reset code]({{ images_path }}/ps1_missing_reset_code.png)


#### Example of multi-colored PS1

```bash
PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\w\e[0m\$ "
```
To analyze this PS1 setting, start by splitting the syntax at every `\e`, which will reveal the number of sections with different colors:

* \e **[32m\u** \e **[0m@** \e **[34m\h** \e **[0m:** \e **[33m\w** \e **[0m\$** 

Then, within each section, identify the ANSI color code (e.g., `\e[32m` for green)  followed by the [placeholder](#prompt-elements) (e.g., `\u` for username) or any literal characters (`@ :`) that separate elements.

{% include table caption="Mult-colored PS1 prompt breakdown" content="| syntax      | Element | ANSI code | formatting | output |
| `\e[32m\u`  | `\u` | `\e[32m` | green username | <span style='color:green;'>alex.badacz</span> |
| `\e[0m@`    | `@`  | `\e[0m` | default @ | @ |
| `\e[34m\h`  | `\h` | `\e[34m` | blue hostname | <span style='color:blue;'>atlas-login-2</span> |
| `\e[0m:`    | `:`  | `\e[0m` | default : | : |
| `:\e[33m\w` | `\w` | `\e[33m` | yellow workdir | <span style='color:yellow; background-color:black;'> ~ </span> |
| `\e[0m\$`   | `\$` | `\e[0m` | default $ | $ |" %}




![ps1_multicolor]({{ images_path }}/ps1_multicolor.png)


### Practical PS1 customization examples

<div class="usa-accordion">

{% include accordion title="Display useful dynamic information ::: (hostname, workdir, date and time)" class="outline" controls="ps1-custom-1" %}
<div id="ps1-custom-1" class="accordion_content" markdown="1" hidden>

Learn built-in placeholders to include essential elements:
* user, hostname and absolute path to a workdir:
  ```bash
  PS1="\u@\h:\w\$ "             # alex.badacz@atlas-login-2:~/geo_data$
  ```
* simplify to a basename of a workdir: 
  ```bash
  PS1="\u:\W\$ "                # alex.badacz:geo_data$
  ```
* add date and time:
  ```bash
  PS1="\d \t @\h\$ "            # Tue Jan 21 13:51:39 @atlas-login-2$
  ```

OUTPUT: basic, colorless prompt built with various elements.
![basic prompt examples]({{ images_path }}/basic_prompt_example.png)

</div>

{% include accordion title="Improve visibility and readability ::: (arrange elements, add separators, symbols and emojis)" class="outline" controls="ps1-custom-2" %}
<div id="ps1-custom-2" class="accordion_content" markdown="1" hidden>

The PS1 variable can include custom text to enhance readability and organization. Enhance your prompt by rearranging elements and using separators to improve clarity and ease of use. Also, make your terminal experience more engaging and enjoyable with creative use of colors, icons and symbols.

* use common separators:
  - spaces after the prompt marker (`$`) to separate prompt and command line
  - colons (`:`) to separate elements like the hostname and working directory
  - at (`@`) to separate elements like the user and hostname

```bash
PS1="\u\h\W\$"              # alex.badaczatlas-login-2geo_data$
# compare to:
PS1="\u@\h:\W\$ "           # alex.badacz@atlas-login-2:geo_data$ 
```
These customizations help create a prompt that is both informative and easy to read.
![ps1_custom_text]({{ images_path }}/ps1_custom_text.png)

* use visual aids to make your prompt more intuitive:
  - Unicode symbols for better visibility
  - emojis to make the prompt visually engaging

```bash
PS1="\u ⚡ \h ➜ \w \$ "  
PS1="\u@\h:\w 🔥 "
PS1="👨‍💻 @\h 📂 \W \$ "
```
These customizations improve the user experience by making it easier to quickly locate relevant information.
![ps1_custom_engaging]({{ images_path }}/ps1_custom_engaging.png)
</div>

{% include accordion title="Personalize the prompt marker ::: (use any symbol or emoji)" class="outline" controls="ps1-custom-3" %}
<div id="ps1-custom-3" class="accordion_content" markdown="1" hidden>

Modify the default prompt marker (`$`) by using alternative symbols such as `#`, `>`, `|` or even emojis (⚡ 🔸 🔥 🎯 🛠️) to make the prompt more visually appealing and easier to separate it from the command line.
```bash
PS1="\u: \W > "              # using alterante character as prompt marker >
PS1="\u: \W ⇨ "              # using arrow symbol as prompt marker
PS1="\u: \W 🎯 "             # using emoji as prompt marker
PS1="\u: \W  ✅ "            # using checkmark as prompt marker
```
Custom prompt markers can personalize your shell and enhance readability or distinguish between different environments.
![ps1_custom_marker]({{ images_path }}/ps1_custom_marker.png)
</div>

{% include accordion title="Enhance prompt with colors ::: (apply ANSI escape codes to style text)" class="outline" controls="ps1-custom-4" %}
<div id="ps1-custom-4" class="accordion_content" markdown="1" hidden>

Add colors to your prompt using [ANSI escape codes](./ansi) to improve visual clarity and organization. Colors can help highlight important elements such as the username, hostname or working directory, making it easier to distinguish between different sections of the prompt. *Learn basics of the prompt syntax coloring in section [Prompt Colors & Effects](#prompt-colors--effects).*
```bash
# Bold red user@host, cyan working directory and a clean > marker.
PS1="\e[1;31m[\u@\h]\e[0m \e[1;36m\w\e[0m > " 

# Username in green, hostname in blue and working directory in yellow.
PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\w\e[0m\$ " 

# Current tdropdownime in purple, username in light green, hostname in light blue and directory in yellow.
PS1="\e[35m[\t]\e[0m \e[92m\u\e[0m@\e[94m\h\e[0m:\e[93m\W\e[0m\$ "
```
These color customizations make the prompt visually appealing and help improve efficiency by quickly identifying information.
![ps1_custom_marker]({{ images_path }}/ps1_custom_colors.png)
</div>

</div>


### Advanced prompt customization

Dynamic prompts can significantly enhance your workflow by providing immediate feedback based on your actions. 

In the PS1 definition, the use of `$VAR` and `$()` allows for dynamically inserting the current value 
of shell variables and the result of evaluated commands, respectively. The `$VAR` syntax directly substitutes the current value 
of an environment or shell variable, while `$()` executes a command and inserts its output into the prompt each time a new command line is displayed. 
Commands can be invoked directly using standard Bash syntax, pre-defined aliases or conditional statements to customize the prompt based on specific conditions.


<div class="usa-accordion">

{% include accordion title="Display built-in or custom shell variables" class="outline" controls="ps1-advanced-1" %}
<div id="ps1-advanced-1" class="accordion_content" markdown="1" hidden>

For example, show details about HPC environment, such as $CLUSTER (system-wide) or $SLURM_JOB_ID (on a compute node).
```bash
PS1='[$CLUSTER] \u:\W\$ '                     # [atlas] alex.badacz:DSW_tutorials$
PS1='[Job: $SLURM_JOB_ID] \u:\W\$ '           # [Job: 16786549] alex.badacz:DSW_tutorials$
```
![ps1_shell_variable]({{ images_path }}/ps1_shell_variable.png)
</div>

{% include accordion title="Display custom aliases, like the number of active jobs in the queue" class="outline" controls="ps1-advanced-2" %}
<div id="ps1-advanced-2" class="accordion_content" markdown="1" hidden>

For example, show the number of your HPC jobs.
```bash
# define custom alias
alias jobcount='squeue -u $USER --noheader | wc -l'
# use alias in your PS1 variable
PS1="[\$(jobcount) jobs] \u@\h:\W$ "
```
*This prompt displays the number of your jobs in a queue dynamically.*
![ps1_alias_job_counter]({{ images_path }}/ps1_alias_job_counter.png)
</div>

{% include accordion title="Display Git status indicators" class="outline" controls="ps1-advanced-3" %}
<div id="ps1-advanced-3" class="accordion_content" markdown="1" hidden>

You can display the current Git branch and its status directly in your prompt for development efficiency.
```bash
PS1='\u@\h:\W $(git branch 2>/dev/null | grep "*" | sed "s/* //")\$ '
```
*This prompt shows the current branch when inside a Git repository.*
![ps1_git_branch]({{ images_path }}/ps1_git_branch.png)
</div>

{% include accordion title="Indicate failed commands using exit codes" class="outline" controls="ps1-advanced-4" %}
<div id="ps1-advanced-4" class="accordion_content" markdown="1" hidden>

One common customization is changing the prompt based on the exit status of the last executed command. 
This allows you to quickly identify whether the previous command succeeded or failed.
```bash
PS1='$(if [ $? -eq 0 ]; then echo "✔"; else echo "✖"; fi) \u@\h:\W\$ '
```
***Explanation:***
- The `$(...)` syntax executes a command substitution each time the prompt is displayed.
- The `if` statement checks the exit status of the last command (`$?`).
- If the exit status is `0`, a checkmark (✔) is displayed.
- If the exit status is non-zero, a cross (✖) is displayed.
- This indicator is followed by the standard `username@hostname:current_directory$` prompt.

*This PS1 variable display a different color indicator depending on whether the last command was successful (exit code 0) or failed (non-zero exit code).*
![ps1_exit_code]({{ images_path }}/ps1_exit_code.png)
</div>

</div>
</div>

## Persisting shell customizations

When customizing your Bash prompt (`PS1` shell variable), it's important to understand how changes take effect, how to maintain them across subshells, 
and how to make them permanent for future sessions.


<div class="process-list ul" markdown="1">

### Immediate effect - current shell

Changes to the `PS1` variable take effect immediately once reassigned in command line, displaying the updated prompt right away.
```bash
PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\W\e[0m\$ "
```
However, this change is temporary and applies only to the current shell session. Once you close the terminal or start a new session, 
the prompt will revert to its default or previously set value. 

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
This level of persistence is useful for quick, temporary customizations or testing different prompt styles without making permanent modifications.
</div>
</div>

### Inheritat in subshells

Using `export PS1` ensures the custom prompt is applied across subshells during the current session.  
This means that any new terminal instances or commands executed within the session, such as opening a subshell with bash 
or running scripts that invoke a new shell, will inherit the customized prompt.
```bash
export PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\W\e[0m\$ " 
```
However, this change remains temporary and will be lost once the terminal session is closed or the system is restarted. 

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
This level of persistence is useful when you need the custom prompt to be available across multiple subshells without permanently modifying configuration files.
</div>
</div>


### Permanent change in future shells

Adding the `PS1` assignment to your `~/.bashrc` file makes the customization permanent, applying it automatically in every new shell sessions.   
The `.bashrc` file is executed whenever an interactive non-login shell is launched, such as when opening a new terminal window in OOD interface.
```bash
# Open config file in a text editor:
nano ~/.bashrc

# Modify existing definition of PS1 variable (or add it if not present):
PS1='\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\W\e[0m\$ '

# Save and exit (Ctrl + X, Y, Enter)
```
This method ensures that your prompt customization persists for all future sessions without the need to manually reapply the settings.

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
This level of persistence is ideal for users who want a consistent prompt experience across all shell sessions.
</div>
</div>

<div class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">
Using the `echo "PS1='...'" >> ~/.bashrc` command to modify your `PS1` will append a new definition to the end of the `.bashrc` file each time it is executed, 
leading to redundant entries. To prevent your config file from becoming cluttered or accidentally overwritten, it is recommended to manually update the `PS1` variable within the file. 
</div>
</div>



When you update the `.bashrc` file, any changes made do not take effect immediately in the current session.  

To apply the changes without opening a new terminal, you need to manually reload the config file what applies the updated settings instantly. 
This ensures that your customizations are reflected in the current session without the need to restart the terminal.

```bash
source ~/.bashrc
```


### Reset PS1 to default

* **Reset prompt to system default** by modifying the  PS1 variable in your `.bashrc` config file. 
  ```bash
  # add or modify in your ~/.bashrc
  PS1="[\u@\h \W]\$ "
  ```
  *  This is the default prompt on SCINet clusters, showing the username, hostname and current working directory.
* **Reload `.bashrc`** to restore the default set in the config file.  This will reload the prompt settings as defined in your `.bashrc` file.
  ```bash
  source ~/.bashrc
  ```

</div>

{% include alert class="tip" content="For more information on persisting variables for all future shells, including best practices, see the [Shell configuration persistence tutorial](../../persistence/)" %}

## Troubleshooting common issues

<div class="usa-accordion">

{% include accordion title="Broken prompts after edits" class="outline" controls="shell-custom-1" %}
<div id="shell-custom-1" class="accordion_content" markdown="1" hidden>
**SYMPTOMS:**  
After customizing the shell prompt, the prompt may appear broken, display unexpected characters or fail to update correctly. 
This often occurs when escape sequences are incorrectly written, such as a missing backslash (`\`) before escape codes, 
leading to them being interpreted as regular text rather than ANSI codes.
```bash
# incorrect ANSI code syntax
PS1="e[31m[\u@\h \W]\$ \e[0m"  
# The prompt displays 'e[31m' instead of showing red color
```
**SOLUTIONS:**  
Ensure that escape sequences are correctly formatted by including the necessary backslash (`\`) before each ANSI escape code to properly apply the intended color.
```bash
# corrected ANSI code syntax
PS1="\e[31m[\u@\h \W]\$ \e[0m"
```
</div>

{% include accordion title="Color spills into command line" class="outline" controls="shell-custom-2" %}
<div id="shell-custom-2" class="accordion_content" markdown="1" hidden>
**SYMPTOMS:**  
After customizing the shell prompt with ANSI escape codes for color, the prompt color unexpectedly carries over into the command line input, 
causing commands to appear in the same color as the prompt. This usually happens when the closing escape sequence (`\e[0m`) is missing or improperly formatted.
```bash
# incorrect syntax
PS1='\e[32m[\u@\h \W]\$ '  
```
*Commands typed after the prompt remain green instead of resetting to default color.*

**SOLUTIONS:**  
To fix this issue, ensure that the color reset escape sequence (`\e[0m`) is included at the end of the prompt string to restore the default terminal color after the prompt.
```bash
# correct syntax
PS1='\e[32m[\u@\h \W]\$\e[0m '
```
</div>

{% include accordion title="Error: event not found or `>` subshell started ::: (aka. history expansion error)" class="outline" controls="shell-custom-3" %} 
<div id="shell-custom-3" class="accordion_content" markdown="1" hidden>    
**SYMPTOMS:**  
After running the command, you may see unexpected output like:
```bash
PS1="\e[31m[\u@\h \W]!\$\e[0m"
# -bash: !\$: event not found
# or output like this:
# PS1="\e[31m[\u@\h \W]"\e[0m"
# >
# >
```
The issue occurs because of Bash history expansion, which is triggered by the exclamation mark (`!`) in the PS1 assignment.
- In Bash, the exclamation mark (`!`) is a special character used for history expansion, meaning it tries to recall previous commands.
- Since the prompt string is enclosed in double quotes (`""`), Bash interprets `!` instead of treating it as a literal character.
- As a result, Bash tries to expand `!` and, if no matching history entry is found, replaces it with a double quote (`"`), leading to a syntax error when evaluating the prompt.

**SOLUTIONS:**  
The issue occurs because double quotes (`""`) allow Bash to perform history expansion, interpreting `!` as a special character instead of displaying it literally in the prompt. To prevent this, use single quotes (`''`), which prevent special character interpretation and ensure the prompt displays correctly.
```bash
PS1='\e[31m[\u@\h \W]!\$\e[0m'
```
*By using single quotes, the `!` character is treated as a literal and will appear in the prompt as intended, avoiding unintended shell behavior.*
</div>
</div>

## Best practices for readability and functionality

{:.fancy-ul--green}
- **Ensure all escape sequences are properly enclosed**  
  Use `\` around ANSI escape codes to indicate non-printing characters, which helps Bash correctly calculate prompt length and prevents visual glitches.
- **Use single quotes ('') instead of double quotes ("")**  
  This prevents unintended expansion of special characters and ensures the prompt displays as intended.
- **Test prompt changes safely**  
  Before making permanent edits in `~/.bashrc`, test changes in the current session to identify issues early.
- **Balance aesthetics and clarity.**
- **Avoid excessive colors.**
