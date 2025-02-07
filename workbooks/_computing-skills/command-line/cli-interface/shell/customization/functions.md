---

title: "Shell Functions: group command sequences and enable argument passing"
description: "Reusable system-wide shell utilities that combine multiple commands into a single function with dynamic input handling."
type: interactive tutorial
order: 4
tags: [UNIX, shell customization, shell function, custom function, argument, automation, bashrc]
packages: 
level:
author: Aleksandra Badaczewska

---

## Overview

This interactive tutorial introduces the concept of shell functions in Unix-like operating systems, which allow you to group sequences of commands and enable flexible argument passing. Shell functions serve as reusable, modular building blocks that enhance productivity by making complex or repetitive command sequences more manageable and efficient. This guide focuses on defining, using and managing shell functions through practical examples, with emphasis on how they can optimize workflows in SCINet HPC environment.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Understand the purpose, syntax and structure of shell functions. 
* Learn how to pass arguments and control function behavior dynamically.
* Explore practical applications of shell functions, especially for repetitive or complex tasks in an HPC environment.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Master the basics of defining, calling and passing arguments to shell functions.
* Create both simple and advanced shell functions with conditionals, loops and error handling.
* Understand key differences between shell functions, aliases and built-in shell commands.
* Gain insights into best practices for function design and troubleshooting common issues.
</div>
</div>


### Tutorial scope

This tutorial provides a step-by-step guide to creating and using shell functions in the shell environment. 
It covers everything from basic syntax to advanced concepts like argument parsing and modular design. 
You’ll explore how shell functions can be used to automate, streamline and optimize tasks, with practical examples relevant to HPC environment.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **Shell Functions:** Reusable blocks of commands grouped under a function name that can be invoked with arguments.
* **Function arguments:** The ability to pass dynamic inputs to shell functions using positional parameters like `$1`, `$2`, and `$@`.
* **Return values:** Mechanisms to output results or pass status codes back to the shell.
* **Function scope:** Understanding local vs. global variable scope within shell functions.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **Shell scripting:** Defining shell functions to automate tasks and improve workflow efficiency.
* **Shell configuration files:** Configuring functions to persist across sessions using files like `.bashrc` or `.bash_profile`.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1">    
* **Task automation:** Automate sequences such as data analysis pipelines, file operations or log monitoring using shell functions.
* **Customized workflows:** Create functions for initializing environments, loading modules or setting project-specific configurations.
* **Dynamic processing:** Use functions to process large datasets with argument-driven logic for tasks like file transformations or reporting.
* **Error handling and cleanup:** Simplify complex cleanup operations in scripts by encapsulating them within functions with error-handling capabilities.
</div>
</div>


### Prerequisites 

[Pre-setup for shell customization on SCINet HPC](/computing-skills/command-line/cli-interface/shell/customization/index#prerequisites)

----

## What is a Shell Function?

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
A shell function in Unix-like systems is a user-defined **block of commands** that can be grouped together and executed **under a single function name**. 
Shell functions are designed **to simplify repetitive tasks** or complex workflows by allowing users to write a sequence of commands once and then call them as needed, 
**with the added benefit of passing arguments** for dynamic behavior.
```bash
greet_user() {
    echo "Hello, $1! Welcome to the SCINet system."
}
# Function call with argument
greet_user "Alice"
```
Unlike [aliases](/computing-skills/command-line/cli-interface/shell/customization/aliases), which only provide a static shortcut for commands, 
functions allow for logic, argument passing, conditionals and loops, making them much more powerful and flexible.
</div>
</div>

When you define a shell function, you're essentially creating a mini-program within your shell session. Functions can take positional arguments (`$1`, `$2`, etc.), 
allowing users to provide input dynamically when calling the function. Functions are a core tool for automation and reusability, especially in HPC environments, 
where repetitive tasks such as job submissions, log monitoring and resource checks are common. By defining command sequences as functions, users can improve efficiency abd reduce errors.

| key characteristics | core benefits |
|--                   |--             |
| **Defined with a name and reusable** <br>Functions can be invoked anywhere within the shell session using their name.                                              | **Automation** <br>Automate complex multi-step tasks in a single reusable function. |
| **Dynamic and flexible** <br>They can accept arguments (`$1`, `$2`), which are passed during execution, making them ideal for handling different input scenarios.  | **Efficiency** <br>Eliminate repetitive manual commands while allowing flexibility through argument passing. |
| **Support complex logic** <br>Functions can include conditionals (`if` statements), loops and even other function calls, offering enhanced control and automation. | **Error reduction** <br>Minimize errors by writing logic once and reusing it, avoiding manual typos or omissions. |

Shell functions are integral to [shell customization](/computing-skills/command-line/cli-interface/shell/customization/index) and complement other tools like 
[aliases](/computing-skills/command-line/cli-interface/shell/customization/aliases), [environment variables](/computing-skills/command-line/cli-interface/shell/variables) 
and [startup scripts](/computing-skills/command-line/cli-interface/shell/customization/bashrc). 
Together, they form a robust environment for tailoring the command line to fit specific needs, including routine daily tasks in HPC infrastructure or hihly customized workflows specific to user or project.


### Purpose of Shell Functions

Shell functions are a powerful mechanism for **automating workflows and reducing code duplication**. By grouping commands, handling dynamic inputs and embedding logic, 
functions can streamline tasks that would otherwise require lengthy sequences of commands or repetitive code blocks in scripts.

The primary purpose of shell functions is to reduce redundancy and enable modular, reusable workflows in shell scripting. Functions enable users to:
* **group multiple commands** under one name to streamline complex tasks
* **use arguments** to dynamically change behavior or input parameters
* **enhance automation** by incorporating loops, conditionals and error handling

<div id="note-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body" markdown="1">
When working on a cluster you need to repeatedly check job statuses and derive statistics to monitor progress and identify any bottlenecks. Instead of typing multiple commands each time, 
you can create a function that encapsulates this entire routine and executes it with a single call. Once saved and stored in a configuration file (e.g., `~/.bashrc`), 
it can be reused indefinitely by calling its name.
</div>
</div>

*Example shell function to quickly derive statistics on jobs in the queue*

```bash
job_stats() {
    local user=${1:-$USER}          # specify user.name or use $USER as default
    
    # Count running and pending jobs
    running_jobs=$(squeue -u "$user" -t RUNNING | wc -l)
    pending_jobs=$(squeue -u "$user" -t PENDING | wc -l)
    
    # Find the job with the longest running time
    longest_running=$(squeue -u "$user" -o "%A %L %j" --sort=-L | head -n 2 | tail -n 1)
    
    # Find the most recently started job
    most_recent=$(squeue -u "$user" -o "%A %S %j" --sort=-S | head -n 2 | tail -n 1)

    # Display the results
    echo "Running jobs: $((running_jobs - 1))"  # Subtract header line
    echo "Pending jobs: $((pending_jobs - 1))"  # Subtract header line
    echo "Longest-running job: $longest_running"
    echo "Most recently started job: $most_recent"
}

# usage for current user:   job_stats()
# usage for any user:       job_stats() user.name
```
![function job stats](../../assets/img/function_job_stats.png)

By encapsulating all steps into a single shell function `job_stats` you can quickly get useful statistics such as:
- the total number of running and pending jobs
- the longest-running job
- the most recently started job

Additionally, a function offers flexibility by dynamically generating statistics for the current user (`$USER`) by default, 
while also allowing the option to specify any other user when needed.


### How Functions Differ from Aliases

- Comparison of scope: functions vs. aliases.
- When to use a function instead of an alias.
- Differences in complexity and flexibility (e.g., argument passing, logic control).

### How Functions Differ from Variables
- Variables store values, functions execute commands.
- Use cases where one is preferable over the other.



## Defining Shell Functions: Basic Syntax
- Syntax overview with examples of single-line and multi-line functions.

### Simple Common Shell Functions
- Examples of frequently used functions for productivity.
  - File processing.
  - System monitoring.

### Passing Arguments to Functions
- Using $1, $2, and other positional parameters.
- Managing arguments effectively (with examples).
- Advanced argument handling
  - Using shift for processing variable-length arguments.
  - Working with $@ and $* to handle all arguments.
  - Parsing named arguments for better readability and maintenance

### Conditionals and Loops Inside Functions
- Enhancing functions with control flow constructs.

### Capturing Function Output
- Returning values using echo or exit status codes.
- Redirecting output for further processing.
- Function Exit Codes and Error Handling
  - Understanding how functions return exit codes.
  - Using trap to handle errors or cleanup after failure.
  - Propagating exit codes to calling scripts or commands.



## Tips for Function Management
- Organizing functions in scripts or configuration files.
- Modular function design.

### Quoting and Escaping Special Characters in Functions
- Preventing errors due to improper quoting.
- Working with special characters like $, *, and &.

### Avoiding Conflicts with System Functions and Commands
- Checking for conflicts and using naming conventions.
- Shadowing system commands.

### Enhancing Functions with Debugging and Logging
- Using set -x and set -e for debugging.
- Logging function activities to files.

### Timing and Performance Monitoring
- Measuring the execution time of functions using built-in commands like time.
- Practical examples for performance-critical scenarios.

### Security Considerations
- Avoiding security risks when using shell functions.
  - Sanitizing user input.
  - Preventing command injection.
  - Using readonly functions where necessary.


## Persisting Functions
- Adding functions to .bashrc, .zshrc, or profile scripts for persistent usage.

### Environment and Scope of Shell Functions

- Understanding local vs. global scope of variables within functions.
- Using the local keyword for variable isolation.
- When and why functions inherit environment variables.

### Loading External Function Libraries

- Organizing reusable functions into external scripts or libraries.
- Sourcing files using source or . to make functions accessible across sessions.


## Practical Shell Functions for HPC
- Examples tailored to high-performance computing (HPC) environments.
  - Automating job submissions.
  - Monitoring resource usage.



## **Troubleshooting common issues**

- Common errors (e.g., unrecognized arguments, syntax errors).
- Debugging tips and best practices.

### Best practices

- Naming conventions.
- Efficient argument parsing.
- Avoiding common pitfalls.