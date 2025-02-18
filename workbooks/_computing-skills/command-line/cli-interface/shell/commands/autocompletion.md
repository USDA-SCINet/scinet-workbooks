---

title: Command autocompletion
description: "A shell feature that predicts and completes commands, filenames and options based on partial input from a user."
type: interactive tutorial
order: 2
tags: 
packages: 
level: 
author: Aleksandra Badaczewska

---

# Overview

This interactive tutorial focuses on command autocompletion, a powerful shell feature that enhances efficiency by predicting and completing command names *(built-in, aliases, function names, binaries on $PATH)*, filenames and arguments. By learning how to use `Tab`-based autocompletion, you can minimize typing errors and navigate the command line more effectively. This tutorial provides hands-on exercises for mastering autocompletion in Bash (Unix shell), particularly within SCINet HPC clusters.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Learn how `Tab` completion works for commands, filenames and arguments in the shell.
* Understand how Bash autocompletion improves command-line efficiency.
* Explore advanced autocompletion features for handling command options and custom scripts.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Efficiently use `Tab`-based autocompletion to reduce typing errors and speed up command entry.
* Navigate file paths and directories using intelligent autocompletion.
* Learn how to enable and extend Bash autocompletion for additional commands.
</div>
</div>


### Tutorial scope

This tutorial provides a practical, hands-on guide to command autocompletion, covering both built-in features and custom enhancements. 
It focuses on real-world applications in HPC environments, where fast and error-free command entry is essential. 
You will explore default shell completion, how to enable advanced features and how to troubleshoot autocompletion issues.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **Command autocompletion:** A shell feature that suggests and completes commands, filenames, and arguments.
* **Tab completion:**  Pressing the `Tab` key to complete partially typed commands or file paths.
* **Bash completion:** An extended autocompletion framework that enables smart suggestions for various commands.
* **Custom autocompletion:** Defining personalized completion rules for scripts, aliases and custom commands.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **Tab key (`⇥`):** The primary input method for triggering shell autocompletion.
* **`bash-completion` package:** A tool that extends default Bash autocompletion capabilities.
* **Shell configuration files (`.bashrc`):** Shell startup script used to enable and customize autocompletion behavior.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1"> 
* **Faster command execution:** Use autocompletion to quickly recall commands, files and paths.
* **Error reduction:** Minimize typos and incorrect paths by letting the shell autocomplete inputs.
* **Navigating directories efficiently:** Autocomplete long or complex file paths without excessive typing.
</div>
</div>

---

