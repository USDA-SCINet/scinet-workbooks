---

title: Command history
description: "A record of previously executed commands that allows users to recall, search and reuse past inputs in the CLI."
type: interactive tutorial
order: 3
tags: 
packages: 
level: 
author: Aleksandra Badaczewska

---

# Overview

This interactive tutorial explores command history, a powerful shell feature that allows users to recall, reuse and search previously executed commands. 
By leveraging history navigation and search tools, you can significantly improve efficiency and avoid repetitive typing, especially in HPC environments, 
where executing long and complex commands is common. You will learn how to view, search, and manage command history using built-in shortcuts like Up/Down arrows, 
`Ctrl + R` for reverse search and the `history` command. 
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Learn how to navigate and reuse previously entered commands efficiently.
* Explore reverse search (`Ctrl` + `R`) for quickly locating past commands.
* Understand how to manage and configure command history for improved usability.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Use history navigation shortcuts (`↑↓`, `!!`, `!n`, `!string`) to recall commands efficiently.
* Master incremental search (`Ctrl` + `R`) for quickly finding past commands.
* Customize history settings to optimize command recall in HPC workflows.
* Manage and clear history when necessary for privacy and organization.
</div>
</div>


### Tutorial scope

This tutorial provides a hands-on guide to efficiently using command history in the shell. It covers basic history navigation, 
advanced search techniques, and history management, helping users reduce redundant typing and improve workflow efficiency, 
particularly when working with long job submission commands and complex scripts in SCINet HPC environments.
<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **Command history:** A record of previously executed commands that can be recalled and reused.
* **Reverse search:** A shortcut for quickly searching past commands by keyword.
* **History expansion:** Methods for executing previous commands without retyping.
* **Persistent history:** A file storing past commands across sessions.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **`history` command:** Displays a list of past commands.
* **Keyboard shortcuts:** `Ctrl + R`, `!!`, `↑↓` for quick recall.
* **Shell configuration files (`.bashrc`):** Shell startup script used to enable and customize autocompletion behavior.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1"> 
* **Reusing long commands:** Quickly recall and modify frequently used HPC job submission commands.
* **Efficient troubleshooting:** Retrieve and rerun previous commands instead of manually retyping them. 
* **Enhanced productivity:** Use shortcuts to speed up navigation through command history.
* **History customization:** Adjust history settings for **long-term tracking** of command usage.
</div>
</div>

---

