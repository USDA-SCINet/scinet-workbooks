---
title: "Output styling examples"
description: "Practical examples of coloring your command outputs."
type: reference material
order: 3
tags: [unix, customization]
author: Aleksandra Badaczewska
---

{% include file_path folder=1 %}

Scripts that colorize and highlight important information and enhance the visibility of different types of text output, such as differentiating file types, emphasizing matched patterns, and distinguishing standard output from errors.

Here’s how it can be particularly useful:
* [Highlighting errors and warnings](#highlighting-errors-and-warnings)
  * Easily differentiate between error messages, warnings and regular logs to quickly identify critical information.
* [Monitoring system performance](#monitoring-system-performance)
  * Enhance readability of real-time metrics by using color-coded output for resource utilization, completion statuses or performance metrics.
* [Debugging and troubleshooting](#debugging-and-troubleshooting)
  * Visually separate successful and failed operations to streamline the debugging process.

## Highlighting errors and warnings 

By using colors to distinguish between different types of messages such as `errors`, `warnings` and `informational logs`, users can quickly interpret results, debug issues and monitor the progress of their jobs more effectively. 

In HPC environments, where job logs and outputs can be extensive, visually distinguishing errors from warnings and regular messages is critical. 

### Use color to highlight severity levels:
```bash
grep -nE "ERROR|Warning" job_output.log | awk '/ERROR/ {print "\033[31m" $0 "\033[0m"} /Warning/ {print "\033[33m" $0 "\033[0m"}'
```
This command searches for ERROR and WARNING and color-codes them (red for errors, yellow for warnings), helping you quickly spot critical issues without manually filtering large log files.

![coloring errors warnings]({{ images_path }}/coloring_errors_warnings.png)


### Set permanent solutions

<div class="usa-accordion">

{% include accordion title="Create persistent aliases for log highlighting" class="outline" controls="grep-coloring-solution1" %}
<div id="grep-coloring-solution1" class="accordion_content" markdown="1" hidden>

You can create shell aliases to quickly filter and colorize logs.
```bash
# Add this to your .bashrc file to make settings persistent
alias logcheck='grep -E "ERROR|Warning" | awk '\''/ERROR/ {print "\033[31m" $0 "\033[0m"} /Warning/ {print "\033[33m" $0 "\033[0m"}'\'''
```  

**How to use it:**
```bash
cat job_output.log | logcheck
```
Your custom `logcheck` command will instantly highlight errors (red) and warnings (yellow) without retyping the full command.

![alias logcheck]({{ images_path }}/alias_logcheck.png)

</div>

{% include accordion title="Create a more general-purpose log scanner function" class="outline" controls="grep-coloring-solution2" %}
<div id="grep-coloring-solution2" class="accordion_content" markdown="1" hidden>

```bash
# Add this to your .bashrc file to make settings persistent
logscan() {
  A=$(echo "$1" | awk -F"|" '{print $1}')
  B=$(echo "$1" | awk -F"|" '{print $2}')
  grep -E "$1" "$2" | awk -v A="$A" -v B="$B" '$0 ~ A {print "\033[31m" $0 "\033[0m"} $0 ~ B {print "\033[33m" $0 "\033[0m"}'
}
```

**How to use it:**
```bash
logscan "ERROR|WARNING" job_output.log            # test other search patterns, e.g., "False|True"
```
Your custom `logscan` command will instantly highlight first pattern (ERROR) in red and the second pattern (Warning) in yellow.

![function logscan]({{ images_path }}/function_logscan.png)


</div></div>

## Monitoring system performance 

Real-time system monitoring on HPC clusters involves tracking resource usage (CPU, memory, disk, network) to detect bottlenecks, 
optimize job performance and ensure efficient resource allocation. By using color-coded indicators, 
critical metrics such as high CPU or memory usage can be highlighted, making it easier to identify potential issues at a glance. 
This allows you to monitor resource usage in real time while testing and refining your pipeline in an interactive session on a compute node. Based on the observed metrics, you can accurately assess the resources needed to submit optimized production jobs to the cluster's queue.

<div class="usa-accordion">

{% include accordion title="Highlighting tasks with high CPU usage" class="outline" controls="performance-solution1" %}
<div id="performance-solution1" class="accordion_content" markdown="1" hidden>


```bash
top -b -n 1 | awk 'NR <= 7 {print} NR > 7 && $9 > 10 { if ($9 > 80) printf "\033[31m%s\033[0m\n", $0; else print $0 }'
```
This command runs `top` in batch mode and use `awk`-based filtering to:
- keep the headers: `NR <= 7 {print}`
- hides processes using 10% or less CPU: `NR > 7 && $9 > 10`
- highlights those using over 80% in red: `{ if ($9 > 80) printf "\033[31m%s\033[0m\n", $0; else print $0 }`

</div>

{% include accordion title="Real-time monitoring of CPU usage" class="outline" controls="performance-solution2" %}
<div id="performance-solution2" class="accordion_content" markdown="1" hidden>

Using `top` combined with `awk` displays a one-time snapshot of resource usage, while embedding it in `watch` continuously updates the output at regular intervals, providing real-time monitoring.

```bash
watch -c "top -b -n 1 | awk 'NR <= 7 {print} NR > 7 && \$9 > 10 { if (\$9 > 80) printf \"\033[31m%s\033[0m\n\", \$0; else print \$0 }'"
```
This monitors CPU usage every 2 seconds, filters jobs with CPU usage >10% and highlights processes with CPU >80% in red.
- The `-c` option in `watch` enables the display of ANSI colors in the output.

![monitor cpu usage]({{ images_path }}/monitor_cpu_usage.png)

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Customize thresholds or add memory checks to gain deeper insights into potential resource bottlenecks during job execution.
</div>
</div>

</div>

{% include accordion title="Monitor the status of your submitted jobs" class="outline" controls="performance-solution3" %}
<div id="performance-solution3" class="accordion_content" markdown="1" hidden>

Monitoring your jobs in the SLURM queue with color-coded output helps you quickly identify their status at a glance, saving time when managing multiple jobs.

For example, you can highlight running, pending and failed jobs in different colors to efficiently track the progress and prioritize troubleshooting.

```bash
squeue -u $USER | awk 'NR == 1 {print} 
    / R / {print "\033[32m" $0 "\033[0m"}             
    / PD / {print "\033[33m" $0 "\033[0m"}            
    / F / {print "\033[31m" $0 "\033[0m"}'

# Green (\033[32m) for running jobs # Yellow (\033[33m) for jobs waiting in the queue # Red (\033[31m) for jobs that have failed
```
![queue monitoring]({{ images_path }}/queue_monitoring.png)

</div>

{% include accordion title="Monitor resource usage of your jobs" class="outline" controls="performance-solution4" %}
<div id="performance-solution4" class="accordion_content" markdown="1" hidden>


You can extend the `squeue` command to check resource requests like CPU time or memory limits and color-code them.

```bash
squeue -u $USER -o "%.18i %.8j %.8u %.10M %.6D %.6C %.10L %.6t" | awk 'NR == 1 {print} 
    $6 > 8 {print "\033[31m" $0 "\033[0m"} 
    $6 >= 4 && $6 <= 8 {print "\033[33m" $0 "\033[0m"} 
    $6 < 4 {print "\033[32m" $0 "\033[0m"}'

# Green (\033[32m) for running jobs # Yellow (\033[33m) for jobs waiting in the queue # Red (\033[31m) for jobs that have failed
```
- The `-o` flag customizes the output to display columns like `job ID`, `name`, `user`, `memory` and `CPU usage`.
- The coloring logic is based on CPUs used (`$6`):*
    - more than 8 CPUs: Red for high usage
    - between 4 and 8 CPUs: Yellow for medium usage
    - less than 4 CPUs: Green for low usage

![monitoring resources is the queue]({{ images_path }}/queue_monitoring_resources.png)

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

You can use an awk-based coloring approach to easily analyze resource usage and job statuses in your completed jobs by combining it with the `sacct` command, helping you quickly spot high memory usage, long runtimes or failed jobs.
```bash
sacct -j JOBID --format=JobID,JobName,Elapsed,State,MaxRSS,CPUTime,ExitCode | awk 'NR == 1 {print} 
    /FAILED|CANCELLED/ {print "\033[31m" $0 "\033[0m"} 
    /COMPLETED/ && $5 ~ /[0-9]+G/ {print "\033[33m" $0 "\033[0m"} 
    /COMPLETED/ && $5 ~ /[0-9]+M/ {print "\033[32m" $0 "\033[0m"}'
```
In this example:
- Red: Failed or canceled jobs.
- Yellow: Completed jobs that consumed large memory (in GB).
- Green: Jobs with moderate memory usage (in MB).

***NOTE:*** *To use this method, you need to know the `JOBID` of the completed or running job.*
</div>
</div>

</div>
</div>

## Debugging and troubleshooting

<div id="note-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">
**Search patterns in aliases are not case-sensitive by default** unless specified, so they will only match exact cases (e.g., "ERROR" vs. "error"). Be sure to customize these patterns to match the specific messages or keywords relevant to your applications for effective filtering and debugging.
</div>
</div>


<div class="usa-accordion">

{% include accordion title="Catch errors in log files in real time" class="outline" controls="debug-solution1" %}
<div id="debug-solution1" class="accordion_content" markdown="1" hidden>

While running test job in the interactive session on a compute node, you can use `tail -f` to monitor the job’s progress and detect errors or warnings early.

By default, `tail` displays the last few lines of a file (typically the last 10 lines). The `-f` stands for follow, meaning it will keep running and display new lines as they are appended to the file. You might use this to monitor logs in real time, especially in SCINet HPC environment.
```bash
tail -f slurm-16364729.out 
```


You can create a custom alias like `taildebug` to filter and highlight only errors and warnings in real time from a log file, allowing you to skip all irrelevant lines and focus on critical debug information.
```bash
# Add this to your .bashrc file to make settings persistent
alias tailgrep='tail -f | grep --color=always -E "ERROR|WARNING"'
```
**How to use it:**  
For best results, run your job in one shell window and monitor the filtered log output in the other one (e.g., launched via OOD).
```bash
tailgrep slurm-16364729.out 
```
![alias for live time debug: tailgrep]({{ images_path }}/alias_debug_tailgrep.png)


</div>

{% include accordion title="Separate successful steps in real time" class="outline" controls="debug-solution2" %}
<div id="debug-solution2" class="accordion_content" markdown="1" hidden>

Efficient debugging in HPC requires clear identification of success and failure states, especially in complex multi-node jobs. <br>
Separate successful operations from errors:
```bash
# Add this to your .bashrc file to make settings persistent
alias tailawk='tail -f | awk '\''/SUCCESS/ {print "\033[32m" $0 "\033[0m"} /FAILED/ {print "\033[31m" $0 "\033[0m"}'\'''
# Other useful keywords include: DONE, FINISHED, DEBUG; 
```

**How to use it:**  
For best results, run your job in one shell window and monitor the filtered log output in the other one (e.g., launched via OOD).
```bash
tailawk slurm-16364729.out 
```
As job outputs are appended to logs in real time, this command highlights successful messages in green and failures in red, making it easy to spot problems while the job is still running.
![alias for live time debug: tailawk]({{ images_path }}/alias_debug_tailawk.png)

</div>

{% include accordion title="Advanced highlighting with multicolor debug" class="outline" controls="debug-solution3" %}
<div id="debug-solution3" class="accordion_content" markdown="1" hidden>

If you want to highlight more categories (e.g., `INFO`, `DEBUG`, `CRITICAL`) with distinct colors, you can define functions:
```bash
filter_logs() {
  awk '/\[ERROR\]/ {print "\033[31m" $0 "\033[0m"} 
       /WARNING/ {print "\033[33m" $0 "\033[0m"} 
       /\[INFO\]/ {print $0} 
       /DEBUG/ {print "\033[36m" $0 "\033[0m"}' "$1"
}
```
![]({{ images_path }}/function_debug_multi.png)

</div></div>