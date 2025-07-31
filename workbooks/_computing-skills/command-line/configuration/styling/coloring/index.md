---

title: "Text coloring in the shell"
description: "Color-based highlighting of command outputs."
type: interactive tutorial
order: 3
index: 4
tags: [unix, customization]
author: Aleksandra Badaczewska

objectives:
  - Understand how ANSI escape codes can be used for text styling in the shell.
  - Gain practical skills for colorizing terminal output, such as enhancing `ls` and `grep` readability.
  - Persist your customizations across sessions and ensure compatibility with different shells.

terms:
  - term: ANSI escape codes
    definition: Special sequences used in the terminal to control text appearance (color, bold, underline).
  - term: Configuration file
    definition: Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings, including text coloring and prompt styles.

applications:
  - "**Text styling for readability:** Enhance terminal output with colored text for better visibility of errors and key results."
  - "**Persistent customization:** Apply long-term shell modifications by editing shell configuration files."
  - "**Troubleshooting in shell setups:** Resolve common HPC issues like unexpected color resets across login and compute nodes."

overview: [objectives, applications, terminology]
---

## Overview

This interactive tutorial covers techniques to customize shell output for improved readability and organization by applying ANSI color codes and environment variables such as `LS_COLORS` and `GREP_COLORS`. You will learn how to colorize and highlight important information and enhance the visibility of different types of text output, such as differentiating file types, emphasizing matched patterns, and distinguishing standard output from errors.

{% include overviews folder=1 %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


In command-line environments, especially when working on High-Performance Computing (HPC) systems without a graphical interface, text coloring plays a crucial role in enhancing the readability and processing efficiency of terminal output. The visual distinction reduces the chances of missing critical information, improves productivity and enhances user comfort by making it easier to read, navigate and focus on essential details.

Text coloring can enhance your command-line experience, helping you stay organized and efficient in an otherwise overwhelming text-heavy environment. 
Here’s how it can be particularly useful:

* [Coloring any text with echo](#coloring-any-text-with-echo)
  * Enhancing command output clarity
  * Use `echo -e` or `awk` with colored text to visually differentiate key outputs for better readability and faster navigation.
* [Coloring ls output with `LS_COLORS`](#coloring-ls-output-with-ls_colors)
  * Listing files and directories
  * Use colors to distinguish between file types (e.g., directories, executables, symbolic links), making navigation faster and more intuitive.
* [Coloring `grep` with `GREP_COLORS`](#coloring-grep-with-grep_colors)
  * Searching through results
  * Highlight matching patterns when using tools like `grep` to quickly spot relevant lines in massive datasets.



Most of text coloring features are not enabled by default on HPC clusters, so to take advantage of them, you'll need to customize your settings. All of them require using [ANSI Escape Codes](../ansi). Once you're familiar with the basics, you can jump to the section that interests you the most and start customizing your shell environment.




## Coloring any text with `echo`

The `echo` command, combined with [ANSI escape codes](../ansi), allows you to colorize and style text output directly in the terminal 
by embedding formatting instructions within the printed text.

The general format for colored text requires using `echo` command with `-e` flag:

{:.no-copy}
```bash
echo -e '\e[<code>mCustom text\e[0m'
```

* `\e` is the escape character (`ESC`), which signals the terminal to interpret the following sequence as an ANSI code.
* `[` indicates the start of the control sequence.
* `<code>` is one or more numeric codes specifying the desired text attribute (e.g., colors or styles).
* `m` marks the end of the sequence, signaling that the specified styles should be applied.

You can [combine any color and attribute](../ansi#combining-multiple-attributes) with `;` for custom formatting!

![text coloring with echo command]({{ images_path }}/text_coloring_echo.png)

* Example 1: Bold red text
  ```bash
  echo -e '\e[1;31mThis is bold red text\e[0m'
  ```

* Example 2: Highlighted fragment of blue text
  ```bash
  echo -e " This is regular text \e[34mwith blue fragment highlighted\e[0m just in the middle."
  ```

* Example 3: Multicolored text
  ```bash
  echo -e '\e[31mRed \e[32mGreen \e[33mYellow \e[34mBlue \e[35mMagenta \e[36mCyan \e[0m Regular Text'
  ```

## Coloring text output with `awk`

The `awk` command is a versatile text-processing tool in Unix/Linux that allows you to manipulate and analyze text line by line. It can search patterns, perform actions and even colorize specific lines in command outputs when combined with [ANSI escape codes](../ansi).

By combining awk with ANSI escape codes, you can dynamically color parts of the output in the shell, making it easier to visually distinguish important sections, like headers, errors or summaries.


<div id="success-alerts-0" class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">

Use `\033` with awk or sed commands for reliable ANSI escape sequences, while `\e` can be used in shell scripts (bash) and commands like echo.

- `\033` is the octal representation of the ASCII escape character. It is equal to 27 (decimal), which is the escape code that signals terminal commands for color or formatting and is universally recognized.
- `\e` is the named escape sequence that represents the same ASCII escape character. 
</div>
</div>

In `awk` command, the ANSI codes are included inside the `{}` action block using `print` statements.
```bash
awk '{print "\033[1;34m" $0 "\033[0m"}'       # with awk always use \033 and not \e escape code
```
Where: `\e[1;31m` turns on <b style="color: red;">bold red</b> text; `$0` prints the entire text line; `\e[0m` resets the color to normal

* Example 1: Distinguishing headers in command results
  ```bash
  ls --color=always -l | awk 'NR==1 {print "\033[1;31m" $0 "\033[0m"; next} {print $0}'
  ```
  - `ls -l`: Lists files in long format, showing details like permissions, owner, size and modification date.
  - `awk` logic:
    - `NR==1`: Refers to the first row of the output (the header row showing column names like `total`, `permissions`, etc.).
    - `{print "\033[1;34m" $0 "\033[0m"}`: awk print statement (as explained above)
    - `next`: Moves to the next line, so only the header is colored.
  - `{print $0}`: Prints all subsequent rows with default colors.

  ![text coloring with awk]({{ images_path }}/text_coloring_awk.png)

## Coloring `ls` output with `LS_COLORS`

The `ls` command can display directory listings in color to differentiate file types, permissions and more. 

![text coloring ls]({{ images_path }}/text_coloring_ls.png)

If your `ls` command shows plain, uncolored and unformatted text in the shell, enhance it by adding the `--color=auto` argument. 
```bash
ls --color=auto 
```

While this works as a quick fix, typing it daily and repeatedly can become tedious. A better long-term solution is to create an alias 
that overwrites the default behavior of `ls` command or define a new one.

<div class="process-list ul" markdown="1">

### Create an alias

* To create an alias that overwrites the default `ls` behavior, add the following line to your shell configuration file (i.e., `~/.bashrc`):
  ```bash
  alias ls='ls --color=auto'
  ```
  * For a new command alias use:
    ```bash
    alias lsc='ls --color=auto'         # use lsc or a customized name for the alias
    ```
* Then, apply the changes and try an updated command:
  ```bash
  source ~/.bashrc
  ls                      # or lsc
  ```

{% include alert class="tip" content="For more information on persisting aliases for all future shells, including best practices, see the [Shell configuration persistence tutorial](../../persistence/)" %}

### View current LS_COLORS

The `ls --color=auto` command highlights file types and attributes using default colors (e.g., blue for directories, green for executables) 
and can be customized via the `LS_COLORS` environment variable.

`LS_COLORS` variable defines how file types, extensions and other attributes are displayed (formatted) in a shell.

To see your current color settings:
```bash
echo $LS_COLORS
```


By default, on both clusters, the `LS_COLORS` variable is empty, meaning no custom color settings are applied. 
![ls_colors_on_scinet]({{ images_path }}/ls_colors_on_scinet.png)  

On Ceres, the default `ls` coloring is also switched off, so file listings will appear without any color unless explicitly enabled. 
To enable coloring, you should:  
- [Create an alias](#create-an-alias) for `ls --color=auto`
- [Customize LS_COLORS](#customize-ls_colors) variable



### Syntax and keys

The format is a colon-separated (`:`) list of key-value pairs: `KEY=VALUE:KEY=VALUE`, where:
- `KEY` specifies the type of file or file extension.
- `VALUE` specifies the color and attributes (e.g., bold, underline) using [ANSI codes](../ansi).

For example:
```bash
LS_COLORS='di=34:fi=0:ln=36'               # di=34:
```
* sets `di` - directories to <span style="color: blue;">blue</span>, `fi` - regular files to the default color and `ln` - symbolic links to cyan.

The `VALUE` can include multiple attributes for a single element by combining ANSI codes using semicolons (`;`). 

For example:
```bash
LS_COLORS='di=1;34:fi=0:ln=36'              # di=1;34:
```
* To set directories (`di`) to display as <span style="color: blue;"><b>bold blue</b></span>, you would combine the color code for blue (`34`) with the code for bold (`1`).

{% include table caption="Useful keys for LS_COLORS" content="| key  | description                  | setting   | expected formatting | comment |
| ---- | ---------------------------- | --------- | --------------------- | --------- |
| `di` | Directory                    | `di=1;34` | <b style=\"color: blue\">bold blue</b> | Directories are highlighted in bold blue, making them easy to distinguish in large file lists. |
| `fi` | Regular file                 | `fi=1;37` | <b style=\"color: white; background-color: black;\">bold white</b> | Regular files are shown in bold white, useful for highlighting important data files. |
| `ln` | Symbolic link                | `ln=3;36` | <i style=\"color: cyan; background-color: black;\">italic cyan</i> | Symbolic links are displayed in italic cyan for visibility when linking files or directories.      |
| `ex` | Executable file              | `ex=1;32` | <b style=\"color: green\">bold green</b> | Executables are displayed in bold green, making them stand out among scripts or binaries. |
| `or` | Orphaned symbolic link       | `or=3;31` | <i style=\"color: red;\">italic red</i> | Broken links are shown in italic red, helping to identify and fix missing references. |
| `mi` | Missing file (broken link)   | `mi=5;31` | <span style=\"color:red;\">blinking red</span> | Similar to orphaned links, broken symbolic links are highlighted in blinking red. |
| `pi` | Named pipe (FIFO)            | `pi=33`   | <span style=\"color: yellow; background-color: black;\">yellow</span> | Pipes are displayed in yellow, indicating intermediate processing components in workflows. |
| `ow` | Other writable directory     | `ow=1;33` | <b style=\"color: yellow; background-color: black;\">bold yellow</b> | Writable directories are shown in bold yellow, alerting users to shared or risky access. |
| `tw` | Sticky, other writable dir   | `tw=1;33` | <b style=\"color: yellow; background-color: black;\">bold yellow</b> | Sticky writable directories are shown in bold yellow to identify them for permission management. |
| `ca` | File with capability set     | `ca=1;35` | <b style=\"color: purple;\">bold purple</b> | Files with special privileges are highlighted in bold purple, indicating extra caution is needed. |" %}

Besides the built-in keys like `di` or `fi`, you can define custom keys to apply specific colors and attributes to any file format based on its extension. 
To do this, use the file extension as the key in the `LS_COLORS` variable. 

For example:
```bash
LS_COLORS='*.log=1;31:*.png=1;35'
```
- `*.log=1;31` - highlights log files in <b style="color: red;">bold red</b>
- `*.png=1;35` - highlights PNG image files in <b style="color: purple;">bold purple</b>

This allows you to easily distinguish between different file types and prioritize them visually in directory listings.


### Customize LS_COLORS

To customize colors, you can define them directly by modifying the `LS_COLORS` variable in your startup script (`~/.bashrc`).

<div id="note-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">

Before assigning/exporting a new value to the `LS_COLORS` variable, check if it is already defined in your `~/.bashrc` to avoid duplicated definitions.
```bash
grep "LS_COLORS" ~/.bashrc
``` 
</div>
</div>

- edit your config file using nano (`nano ~/.bashrc`)
- assign a new settings to `LS_COLORS` variable and export it:
  ```bash
  export LS_COLORS='di=01;34:ln=01;36:so=01;35:*.sh=01;32:*.log=01;33'
  ```
- reload the shell configuration to apply changes also in a current shell:
  ```bash
  source ~/.bashrc
  ```

{% include alert class="tip" content="For more information on persisting variables for all future shells, including best practices, see the [Shell configuration persistence tutorial](../../persistence/)" %}

</div>

## Coloring `grep` with `GREP_COLORS`


Global Regular Expression Print, i.e., `grep` command is a powerful command-line utility used for searching text patterns in files or output streams, 
commonly used on high-performance computing (HPC) systems to find relevant information within massive log files, scripts or command outputs.
```bash
grep "Text" file
```


Unformatted text output from `grep` can be hard to parse visually when dealing with large data sets, especially on HPC systems where log files are enormous. 
Coloring the output helps you quickly distinguish matches, filenames, line numbers and contextual information.

<div id="note-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">

On both SCINet clusters, `grep` coloring by default highlights matched words in bold red, 
making it easier to spot search results quickly. This indicates that `grep` on Atlas and Ceres is by default an alias to `grep --color=auto`, 
automatically enabling color when outputting to a terminal.

![default grep coloring on scinet]({{ images_path }}/grep_coloring_scinet.png)
</div>
</div>

<div class="process-list ul" markdown="1">


### Useful grep flags for coloring


The `--color` flag is the main option in `grep` that controls whether matched text is highlighted using colors. <br>It has three variants:
- `--color=auto`: (default) text coloring only when the output is directed to a terminal
- `--color=always`: colorized, even when piping or redirecting (useful with commands like `less -R`)
- `--color=never`: disables coloring entirely, useful for plain-text output

The `--color` flag works in combination with `GREP_COLORS` to customize the color scheme.


<div class="usa-accordion">

{% include accordion title="Many other flags can enhance the colored output or provide context for colored matches" class="tip" controls="grep-coloring-1" icon=true %}
<div id="grep-coloring-1" class="accordion_content" markdown="1" hidden>

{% include table caption="grep flags" content="| flag           | description                                                      | example                                    |
| -------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `-H`           | Shows the filename before each match.                            | `grep -H \"pattern\" file1.txt file2.txt`    |
| `-n`           | Displays the line number of each match.                          | `grep -n \"pattern\" file.txt`               |
| `-C`           | Displays lines of context before and after each match.           | `grep -C 2 \"pattern\" file.txt`             |
| `-A`           | Displays lines after each match.                                 | `grep -A 3 \"pattern\" file.txt`             |
| `-B`           | Displays lines before each match.                                | `grep -B 3 \"pattern\" file.txt`             |
| `-e`           | Searches for multiple patterns.                                  | `grep -e \"error\" -e \"warning\" file.txt`    |
| `-r` / `-R`    | Searches directories recursively.                                | `grep -r \"pattern\" /path/to/logs/`         |
| `-i`           | Performs a case-insensitive search.                              | `grep -i \"pattern\" file.txt`               |
| `-o`           | Displays only the matched part of a line, not the entire line.   | `grep -o \"error\" file.log`                 |" %}

</div>
</div>




The environment variable `GREP_COLORS` allows you to customize the color scheme of various parts of the `grep` output.  
Here's how specific `grep` flags link directly to customizable components in `GREP_COLORS`:

| GREP_COLORS(key)    | example_settings_         | grep_option      | *What it affects?*                                                    |
|---------------------|-------------------------|------------------|-----------------------------------------------------------------------|
| `mt` (matched_text) | `mt=1;31` <b style="color: red;">bold_red</b> | `--color` | Colors the matching portion of the line. |
|                     |                         | `-o`             | Displays and colors only the matched part of a line. |
| `fn` (file_name)    | `fn=35` <span style="color: purple;">purple</span>    | `-H` | Colors the filename when searching through multiple files. |
|                     |                         | `-r` / `-R`      | Colors the filenames for matches across directories. |
| `ln` (line_number)  | `ln=32` <span style="color: green;">green</span>      | `-n` | Colors the line number in the output. |
| `se` (separator)    | `se=36` <span style="color: cyan; background-color: black;">cyan</span> | `-C`, `-A`, `-B` | Colors the `--` separator when showing lines <br>around the match. |


**SYNTAX:**
```bash
GREP_COLORS='mt=<codes>:fn=<codes>:ln=<codes>:se=<codes>'       #keys: mt, fn, ln, se
```

**DEFAULT:**
```bash
GREP_COLORS='mt=1;31:fn=35:ln=32:se=36'
```
This setting customizes grep output by highlighting matched text in bold red (`mt=1;31`), filenames in purple (`fn=35`), line numbers in green (`ln=32`) and context separators (--) in cyan (`se=36`).

Test the default settings:
```bash
grep --color=auto -Hn -C 2 "pattern" slurm-logfile.out 
```
This command is looking for occurrences of "pattern" in the log file, showing 2 lines of context before and after any match.
![grep coloring flags]({{ images_path }}/grep_coloring_flags.png)
- On the far left, you can see the filename repeated in every output line (`slurm-10652598.out`). 
  - This is because the `-H` option is being used, and filenames are color-coded in purple due to `fn` setting in GREP_COLORS.
- Next to the filename, you see `line numbers` in green (`24, 44`, etc.). 
  - This is enabled by the `-n` flag and colored using the `ln` setting in GREP_COLORS.
- The matching pattern /keyword `ortho` is highlighted in bold red. 
  - This is the default coloring for matches using the `mt` setting in GREP_COLORS.
- The `-C 2` option displays 2 lines before and after each match, giving you context about the log entries.
  - The `- -` seen between sections (colored cyan by default with using `se`) marks the break between different matches.
  - The `-C N` option in grep is particularly useful when you want to extract `N` lines that are positionally related to the matched lines but don't contain the shared pattern themselves.


#### Customize GREP_COLORS

To take full control of the colors, set the `GREP_COLORS` variable.

1.  Define it in your terminal for a current session only:
    ```bash
    export GREP_COLORS='mt=1;33:fn=3;31:ln=46:se=36'
    ```
  This setting customizes grep output by highlighting matched text in bold yellow (`mt=1;33`), filenames in italic red (`fn=3;31`), line numbers in cyan background (`ln=46`) and context separators (--) in cyan text (se=36).*
1.  Test it with `grep` command:
    ```bash
    grep --color=always "pattern" filename
    ```
  The `--color=always` forces colors even when the output is piped.  
  ![grep coloring customized]({{ images_path }}/grep_coloring_custom.png)

1.  Make it permanent by adding the variable to your shell config (`~/.bashrc`):
    - Check if it is already defined in your `~/.bashrc` to avoid duplicated definitions.
      ```bash
      grep "GREP_COLORS" ~/.bashrc
      ``` 
    - edit your config file using nano (`nano ~/.bashrc`)
    - assign a new settings to `GREP_COLORS` variable and export it:
      ```bash
      export GREP_COLORS='mt=1;33:fn=3;31:ln=46:se=36'
      ```
    - reload the shell configuration (to apply changes also in a current shell):
      ```bash
      source ~/.bashrc
      ``` 
{% include alert class="tip" content="For more information on persisting variables for all future shells, including best practices, see the [Shell configuration persistence tutorial](../../persistence/)" %}

</div>




## Troubleshooting common issues

<div class="usa-accordion">

{% include accordion title="No color in grep output" class="outline" controls="coloring-custom-1" %}
<div id="coloring-custom-1" class="accordion_content" markdown="1" hidden>

**SOLUTIONS:** Ensure your terminal supports [ANSI color codes](../ansi).
```bash
# test with echo -e 
echo -e "\033[31mRed Text\033[0m"
```

</div>
{% include accordion title="Color disappears when grep output is piped" class="outline" controls="coloring-custom-2" %}
<div id="coloring-custom-2" class="accordion_content" markdown="1" hidden>

**SOLUTIONS:** Use `--color=always` when you pipe grep:
```bash
grep --color=always "pattern" file.txt | less -R
```
The `-R` option in `less` preserves color codes.

</div>

</div>

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

Avoid conflicting grep settings, for example, ensure no existing aliases like  
`alias grep="grep --color=never"` are disabling color.
</div>
</div>
