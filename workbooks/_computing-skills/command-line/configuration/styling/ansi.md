---
title: ANSI escape codes
description: ANSI escape codes for use in styling your prompts and shell
type: reference material
order: 1
---

ANSI escape codes are special sequences of characters (e.g., `\e[1m]`) used to control text formatting, color and other display attributes in the command-line interface. When processed by the terminal, these codes alter the appearance of the text output by:
- changing text colors (red, green, yellow, etc.),
- changing background colors,
- effects like making text bold or adding underline

ANSI codes are widely supported across various terminal emulators, making them a universal and portable tool for improving command-line interaction.

## Syntax of ANSI codes 

ANSI escape codes follow a standardized syntax that consists of a special escape character, followed by a sequence of characters that instruct the terminal to perform specific formatting actions. 

Text placed immediately after an ANSI escape code will take on the desired color or effect, and the sequence should always be terminated with the reset code to revert to normal formatting. 

The general syntax for an ANSI escape code in Bash is:

{:.no-copy}
```bash
\e[<code>m                # or using an alternative format:   \033[<code>m
```

* `\e` or `\033` is the escape character (`ESC`), which signals the terminal to interpret the following sequence as an ANSI code.
* `[` indicates the start of the control sequence.
* `<code>` is one or more numeric codes specifying the desired text attribute (e.g., colors or styles).
* `m` marks the end of the sequence, signaling that the specified styles should be applied.

Example usage in Bash:
```bash
echo -e "\e[33mThis text is yellow\e[0m"
```
![ansi code syntax](./assets/img/ansi_code_syntax.png)

<div class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
The specified color and formatting are applied to all text following the ANSI escape code until a reset code (`\e[0m`) is included, which restores the default terminal settings.
</div>
</div>


## Common ANSI code categories


{% include table caption="Text decoration" content="| Effect | Code | Example syntax |
| normal text /reset all attributes | 0 | `\e[0m` |
| **bold text** | 1 | `\e[1m` |
| dim text | 2 | `\e[2m` |
| *italic* | 3 | `\e[3m` |
| <u>underlined text</u> | 4 | `\e[4m` |
| blinking text | 5 | `\e[5m` |
| reverse text color with a background | 7 | `\e[7m` |
| ~~strikethrough~~ | 9 | `\e[9m` |" %}


{% include table caption="Color code examples" content="| Color | Text color code | Background color code |
| Black  | `30` - <span style=\"background-color: white; color: black;\"> black </span> | `40` - <span style=\"background-color: black; color: white;\"> black </span> |
| Red    | `31` - <span style=\"background-color: white; color: red;\"> red </span>     | `41` - <span style=\"background-color: red; color: white;\"> red </span>     |
| Green  | `32` - <span style=\"background-color: white; color: green;\"> green </span> | `42` - <span style=\"background-color: green; color: white;\"> green </span> |
| Yellow | `33` - <span style=\"background-color: black; color: yellow;\"> yellow </span> | `43` - <span style=\"background-color: yellow; color: black;\"> yellow </span> |
| Blue   | `34` - <span style=\"background-color: white; color: blue;\"> blue </span>   | `44` - <span style=\"background-color: blue; color: white;\"> blue </span>   |
| Purple | `35` - <span style=\"background-color: white; color: purple;\"> purple </span> | `45` - <span style=\"background-color: purple; color: white;\"> purple </span> |
| Cyan   | `36` - <span style=\"background-color: black; color: cyan;\"> cyan </span>   | `46` - <span style=\"background-color: cyan; color: black;\"> cyan </span>   |
| Light gray | `37` - <span style=\"background-color: black; color: lightgray;\"> light-gray </span> | `47` - <span style=\"background-color: lightgray; color: black;\"> light-gray </span> |" %}


## Combining multiple attributes

Multiple formatting codes can be combined by separating them with semicolons (`;`), like this:
```bash
echo -e '\e[1;32;44mBold green text on a blue background\e[0m'
```
This command applies bold (1), green text (32) and a blue background (44).

![text coloring multiple attributes](./assets/img/text_coloring_attributes.png)