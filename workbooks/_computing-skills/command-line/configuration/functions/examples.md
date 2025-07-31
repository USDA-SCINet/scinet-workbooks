---

title: "Shell Function examples"
description: "Examples of practical functions you may wish to use in your scripts."
type: reference material
order: 3
tags: [unix, customization]
author: Aleksandra Badaczewska

---



{% include file_path folder=1 %}

Examples of practical functions you may wish to use in your scripts.

<div class="usa-accordion">

{% include accordion title="Example function: Derive statistics on jobs in the queue" controls="functions-examples-1" %}
<div id="functions-examples-1" class="accordion_content" hidden markdown="1">


When working on a cluster you need to repeatedly check job statuses and derive statistics to monitor progress and identify any bottlenecks. Instead of typing multiple commands each time, 
you can create a function that encapsulates this entire routine and executes it with a single call. Once saved and stored in a project bash script or configuration file, it can be reused indefinitely by calling its name.


Example shell function to quickly derive statistics on jobs in the queue:

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
![function job stats]({{ images_path }}/function/function_job_stats.png)

By encapsulating all steps into a single shell function `job_stats` you can quickly get useful statistics such as:
- the total number of running and pending jobs
- the longest-running job
- the most recently started job

Additionally, this function offers flexibility by dynamically generating statistics for the current user (`$USER`) by default, 
while also allowing the option to specify any other user when submitting jobs in a team project.

</div>

{% include accordion title="Example function: Quick resource usage monitoring" controls="functions-examples-2" %}
<div id="functions-examples-2" class="accordion_content" hidden markdown="1">

Here’s a simple but illustrative and useful example for quick resource usage monitoring.

**Aliases** are limited to simple command substitutions, making them useful for quick tasks like displaying system usage:
```bash
alias node_usage='top -b -n1 | head -n 20'
# usage: node_usage
```
![alias node usage]({{ images_path }}/alias/alias_node_usage.png)



In contrast, a shell function like `monitor_cpu` not only integrates multiple system commands (e.g., `top` and `free`) to monitor CPU and memory usage on the current node but also supports argument handling (e.g., allowing users to set custom usage thresholds with each function call) and implements flow-control logic (e.g., using `if` conditions) to trigger warnings and critical alerts based on usage levels.
```bash
monitor_cpu() {
    cpu_warn=${1:-70}            # sets default warning threshold at 70% CPU usage
    cpu_usage=$(top -bn1 | awk '/Cpu\(s\)/ {print 100 - $8}' | cut -d'.' -f1)

    if [ "$cpu_usage" -ge "$cpu_warn" ]; then
        echo -e "\033[1;33mWARNING: CPU Usage at ${cpu_usage}%\033[0m"  # Yellow
    else
        echo "CPU Usage: ${cpu_usage}%"
    fi
}
# usage: monitor_cpu            # uses default warning threshold at 70% CPU usage
# usage: monitor_cpu 50         # uses custom threshold using $1 positional argument
```
![function to monitor cpu]({{ images_path }}/function/function_monitor_cpu.png)

This example demonstrates:
* **[Argument handling](../functions#passing-arguments-to-functions):** Accepts optional CPU thresholds via positional argument ($1).
* **[Error handling](../functions#error-handling):** Basic, but detects missing arguments and defaults thresholds to safe values if not provided.
* **[Logic and Conditions](../functions#conditionals-and-loops):** Uses `if` conditions to determine output based on warning thresholds.
* **Workflow integration:*** *Integrates system commands like `top` to extract real-time system data.

</div>

{% include accordion title="List all functions defined in a shell" controls="practical-shell-1" %} 
<div id="practical-shell-1" class="accordion_content" markdown="1" hidden> 

* In Bash, you can list all function names using:
  ```bash
  declare -F | awk '{print $3}'
  ```
  (This outputs only the function names without definitions.)
* Another Bash-specific method to list functions:
  ```bash
  compgen -A function
  ```
  (This is concise and directly outputs function names.)
* To list both function names and their definitions:
  ```bash
  typeset -f
  ```
* To display the definition of a selected function:
  ```bash
  type <function_name>
  ```


</div>
{% include accordion title="Check quota on any SCINet cluster" controls="practical-shell-2" %} 
<div id="practical-shell-2" class="accordion_content" markdown="1" hidden> 

This method works on both Atlas and Ceres, but needs to be added to .bashrc on each separately.

This script unifies the way you check your quota on both SCINet clusters (i.e., same command for Atlas and Ceres).
```bash
check_quota() {
    case "$HOSTNAME" in
        ceres*) my_quotas ;;
        atlas*) quota -s ;;
        *) echo "Hostname does not match Atlas or Ceres." ;;
    esac
}

# usage: check_quota 
```


</div>
{% include accordion title="Quick stats on queued jobs" controls="practical-shell-3" %} 
<div id="practical-shell-3" class="accordion_content" markdown="1" hidden> 

This function offers flexibility by dynamically generating job statistics for the current user (`$USER`) by default, while also allowing the option to specify any other user when submitting jobs in a team project. Returned output includes:
- the total number of running and pending jobs
- the longest-running job
- the most recently started job

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
![function job_stats]({{ images_path }}/function/function_job_stats.png)



</div>
{% include accordion title="List sizes of items in a directory" controls="practical-shell-4" %} 
<div id="practical-shell-4" class="accordion_content" markdown="1" hidden> 

This checks your /home when no arguments (directory path) are provided
```bash
check_dir_usage() { dir=${1:-~}; du -sh "$dir"/*; }

# usage: check_dir_usage 
# usage: check_dir_usage <directory>
```
- `dir=${1:-~}`: If a directory provided ()`$1`), it will check that directory. Otherwise, it defaults to the home directory (`~`).
-  `du -sh "$dir"/*`: Displays the disk usage of each item in the specified directory.

![function check_dir_usage]({{ images_path }}/function/function_check_dir_usage.png)



</div>
{% include accordion title="Find large files in a directory" controls="practical-shell-5" %} 
<div id="practical-shell-5" class="accordion_content" markdown="1" hidden>  

Find, for example, files larger than 500 MB in the current directory.
```bash
find_large_files() {
    if [ -z "$1" ]; then
        echo "Usage: find_large_files <size> (e.g., 100M, 1G)"
        return 1
    fi

    dir=${2:-.}
    find "$dir" -type f -size +"$1" -exec ls -lh {} \;
}

# usage: find_large_files 500M
# usage: find_large_files 500M <directory> 
```
- `$1`: File size threshold (e.g., 100M, 1G).
  - If no size is specified, a help message will be displayed to guide the user on proper usage.
- `$2`: Directory to search in. If not provided, it defaults to the current directory (`.`).
- `find "$dir"`: Dynamically searches the provided directory.

![function find_large_files]({{ images_path }}/function/function_find_large_files.png)


</div>
{% include accordion title="GPU resources check" controls="practical-shell-6" %} 
<div id="practical-shell-6" class="accordion_content" markdown="1" hidden>  

{% include alert class="warning" content="This works on a GPU node only." %}

This function provides a quick and user-friendly summary of the key resources allocated to an interactive job on an HPC cluster, including CPU cores, memory usage, free memory and GPUs. 
It may help you monitor and optimize your job's performance and resource usage in real time.

```bash
check_interactive_resources() {
    # Step 1: Get interactive jobs for the current user
    job_info=$(squeue -u "$USER" | grep "interact")

    # If no job found, return
    if [ -z "$job_info" ]; then
        echo "No interactive jobs found for the current user."
        return 1
    fi

    # Extract the node name from the NODELIST field (8th column)
    node_name=$(echo "$job_info" | awk '{print $8}')

    # Step 2: Get node details
    node_details=$(scontrol show node="$node_name")

    # Step 3: Extract useful information
    cpu_alloc=$(echo "$node_details" | grep -oP 'CPUAlloc=\K[0-9]+')
    cpu_total=$(echo "$node_details" | grep -oP 'CPUTot=\K[0-9]+')
    mem_alloc=$(echo "$node_details" | grep -oP 'AllocMem=\K[0-9]+')
    mem_total=$(echo "$node_details" | grep -oP 'RealMemory=\K[0-9]+')
    free_mem=$(echo "$node_details" | grep -oP 'FreeMem=\K[0-9]+')
    gpu_alloc=$(echo "$node_details" | grep -oP 'AllocTRES=.*?gres/gpu:[^=]+=*\K[0-9]+' | head -1)
    gpu_total=$(echo "$node_details" | grep -oP 'CfgTRES=.*?gres/gpu:[^=]+=*\K[0-9]+' | head -1)

    # Step 4: Convert memory values from MB to GB
    mem_alloc_gb=$((mem_alloc / 1024))
    mem_total_gb=$((mem_total / 1024))
    free_mem_gb=$((free_mem / 1024))

    # Step 5: Display the user-friendly report
    echo "-------------------------------------------"
    echo "Resource Usage Report for Interactive Job"
    echo "-------------------------------------------"
    echo "Node: $node_name"
    echo "CPU Usage: $cpu_alloc / $cpu_total cores"
    echo "Memory Usage: ${mem_alloc_gb} GB / ${mem_total_gb} GB"
    echo "Free Memory: ${free_mem_gb} GB"
    echo "GPUs Allocated: $gpu_alloc / $gpu_total"
    echo "-------------------------------------------"
}

# usage: check_interactive_resources
```
![function check_interactive_resources]({{ images_path }}/function/function_check_interactive_resources.png)
*How to interpret results?*
- **Node:** The node on which the interactive job is running.
- **CPU Usage:** Shows the number of CPU cores allocated versus the total available.
- **Memory Usage:** Shows the amount of allocated memory versus total memory (in GB).
- **Free Memory:** Displays available memory on the node (in GB).
- **GPUs Allocated:** Shows the number of GPUs currently in use by your job versus the total available on the node.



</div>
{% include accordion title="CPU and memory on a node" controls="practical-shell-7" %} 
<div id="practical-shell-7" class="accordion_content" markdown="1" hidden> 

This function is useful in the interactive session on a compute node.

This code checks CPU and memory usage on the current node and displays them immediately with color-coded output:  
(<span style="color:green;">Normal usage</span> ; <span style="color: yellow; background-color: black;">Warning if usage exceeds a threshold</span> ; <span style="color: red;">Critical if usage is dangerously high</span>)
```bash
monitor_resources() {
    # Thresholds for warnings and critical alerts (can be overridden via user-provided arguments)
    cpu_warn=${1:-70}    # $1 for CPU Warning;  default at 70% CPU usage
    cpu_crit=${2:-90}    # $2 for CPU Critical; default at 90% CPU usage
    mem_warn=${3:-70}    # $3 for Mem Warning;  default at 70% memory usage
    mem_crit=${4:-90}    # $4 for Mem Critical; default at 90% memory usage

    # Get current usage
    cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}' | cut -d'.' -f1)
    mem_usage=$(free | awk '/Mem:/ {printf("%.0f", $3/$2 * 100)}')

    # Internal function to color output
    color_output() {
        if [ "$1" -ge "$cpu_crit" ] || [ "$2" -ge "$mem_crit" ]; then
            echo -e "\033[1;31mCRITICAL: CPU ${cpu_usage}% | Memory ${mem_usage}%\033[0m"  # Red
        elif [ "$1" -ge "$cpu_warn" ] || [ "$2" -ge "$mem_warn" ]; then
            echo -e "\033[1;33mWARNING: CPU ${cpu_usage}% | Memory ${mem_usage}%\033[0m"  # Yellow
        else
            echo -e "\033[1;32mNORMAL: CPU ${cpu_usage}% | Memory ${mem_usage}%\033[0m"  # Green
        fi
    }
    color_output "$cpu_usage" "$mem_usage"      # Display results
}
```
Run with default thresholds:
```bash
monitor_resources                     # no arguments provided; uses default thresholds
```
Run with custom thresholds (e.g., warning at 50% and critical at 80%):
```bash
monitor_resources 50 80 50 80         # arguments: $1=60 $2=80 $3=60 $4=80
```
![function for resource monitoring]({{ images_path }}/function/function_resource_monitoring.png)

This example demonstrates:
- **Argument handling:** Accepts optional CPU and memory thresholds via arguments (`$1`, `$2`, `$3`, `$4`).
- **Error handling:** Basic, but detects missing arguments and defaults thresholds to safe values if not provided.
- **Workflow integration:** Integrates system commands like `top` and `free` to extract real-time system data.
- **Logic and Conditions:** Uses if conditions to determine output based on warning and critical thresholds.
- **Nested/internal functions:** The main function defines internal functions to handle subtasks like resource checks or formatting. This modular design simplifies maintenance and enhances reusability.



</div>
{% include accordion title="Create backup file or dir" controls="practical-shell-8" %} 
<div id="practical-shell-8" class="accordion_content" markdown="1" hidden> 

Explore an example function depending on your needs:
- [`tar` based (hard-coded) backup:](../functions#redirecting-function-output-to-a-file)  compress a specific file/dir using its absolute path
- [`cp` based (dynamic) backup:](../functions#managing-arguments-effectively) copy any directory from source path (`$1`) to the destination path (`$2`)
- [`tar` based (dynamic) backup:](../functions#defining-functions) compress any directory in a current location to .tar.gz format
- [`tar` based (dynamic) backup with timestamp:](../functions#document-your-functions-to-keep-a-reference-for-future-use) compress any directory and add a date & time tag to the backup name to distinguish historical versions



</div>
{% include accordion title="Iterate files & process if exist" controls="practical-shell-9" %} 
<div id="practical-shell-9" class="accordion_content" markdown="1" hidden> 

This function iterates through the user-provided file arguments using a loop, checks their existence with a conditional, and processes them if found.
```bash
process_files() {
  for file in "$@"; do
    if [ -e "$file" ]; then
      echo "Processing $file"
      # Code your task here
    else
      echo "Warning: $file not found"
    fi
  done
}
# usage: process_files file1.txt file2.txt file3.txt
```


Explore {% include nav-hidden text="Using shift for processing variable-length arguments" url="../functions#argument-examples-1" %} to process a list of aruments one at a time. 
This is useful when you want to perform the same task on all items in the argument list within a single function call.



</div>
{% include accordion title="Function with named arguments" controls="practical-shell-10" %} 
<div id="practical-shell-10" class="accordion_content" markdown="1" hidden> 

Explore [Example: while loop and case](../functions#example-while-loop-and-case), 
if you create a function to provide an interactive menu options for executing different scenarios based on user input. 

You can also create {% include nav-hidden text="labeled options/arguments" url="../functions#argument-examples-3" %} instead of relying on positional parameters for better readability and maintenance.



</div>
</div>
