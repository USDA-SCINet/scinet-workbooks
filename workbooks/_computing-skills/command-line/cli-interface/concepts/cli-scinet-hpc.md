---

title: Accessing the CLI on the SCINet HPC
description: "(Page description here)"
type: interactive tutorial
order: 2
tags: [command line]
packages: 
level: 
author: Aleksandra Badaczewska

---



## Overview

This interactive tutorial focuses on guiding you through the process of accessing the command line interface (CLI) on the SCINet High-Performance Computing (HPC) systems. 
The lesson introduces the essential steps required to connect to the HPC environment on Atlas and Ceres computing clustres securely and efficiently. By understanding 
how to access the CLI, you will take your first steps toward effectively utilizing the SCINet HPC infrastructure for your research and computational needs. <br>
*This tutorial is designed for newcomers transitioning from graphical user interfaces (GUIs) to the command line interface (CLI).*

<div id="info-alerts-1" class="highlighted highlighted--info ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">Main Objectives</h4>
        <ul>
            <li>Learn the methods and tools required to access the CLI on the SCINet HPC systems.</li>
            <li>Understand authentication protocols and secure connection methods.</li>
            <li>Demonstrate the CLI environments available on Atlas and Ceres computing clusters.</li>
        </ul>

    </div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">Goals</h4>
        <p>By the end of this tutorial, you will:</p>
        <ul>
            <li>Successfully establish a secure connection to the selected SCINet HPC cluster using the SSH protocol or OOD service.</li>
            <li>Gain the confidence to transition from using a GUI to leveraging the CLI effectively.</li>
            <li>Acquire knowledge of the CLI environments available on the SCINet HPC systems (Atlas, Ceres).</li>
        </ul>
    </div>
</div>


### Tutorial scope

This tutorial demostrates practical steps for accessing the command line interface (CLI) of SCINet HPC clusters (Atlas and Ceres) through Open OnDemand (OOD) and Secure Shell (SSH).

<div class="usa-accordion">

    {% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
    <div id="scope-concepts" class="accordion_content">
        <ul>
            <li><b>Command Line Interface (CLI)</b>, A text-based method to interact with computing systems.</li>
            <li><b>Accessing HPC Systems</b>, Techniques for connecting to SCINet HPC infrastructure and accessing the CLI.</li>
            <ul>
                <li>- <b>Secure Connections</b>, Ensuring access through authenticated and secure methods (e.g., SSH).</li>
                <li>- <b>Browser-Based Access</b>, Using Open OnDemand for web-based CLI functionality.</li>
            </ul>
        </ul>
    </div>

    {% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
    <div id="scope-tools" class="accordion_content">
        <ul>
            <li><b>Open OnDemand (OOD)</b>, A browser-based platform to access CLI functionality on HPC systems.</li>
            <li><b>SSH (Secure Shell)</b>, A secure connection protocol for direct CLI access from local machines.</li>
            <li>Supported Local Tools for SSH Access:</li>
            <ul>
                <li>- <b>Windows:</b> PuTTY, Windows Terminal, WSL</li>
                <li>- <b>macOS:</b> built-in Terminal</li>
                <li>- <b>Linux:</b> built-in Terminal</li>
            </ul>
        </ul>
    </div>

    {% include accordion title="Applications" class="primary " controls="scope-apps" %} 
    <div id="scope-apps" class="accordion_content">    
        <ul>
            <li>Web-Based Access: <em>Logging in and interacting with HPC CLI through Open OnDemand on any device.</em> <b>(recommended)</b></li>
            <li>Accessing HPC CLI: <em>Establishing secure connections via SSH from a local machine.</em></li>
            <li>Getting Started with HPC Systems: <em>Becoming comfortable with the interface to support future computational workflows.</em></li>
        </ul>
    </div>
</div>


----

## Accessing SCINet HPC


<div id="info-alerts-0" class="highlighted highlighted--info ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">What is SCINet HPC?</h4>
        <p>
            The HPC infrastructure as part of the <a href="https://scinet.usda.gov/" target="_blank">SCINet initiative</a> consists of two <a href="https://scinet.usda.gov/guides/resources/#scinet-computing-resources/" target="_blank">computing clusters</a> (<b>Atlas</b> and <b>Ceres</b>) and <a href="https://scinet.usda.gov/guides/data/storage#juno-archive-storage" target="_blank">archive storage</a>  (<b>Juno</b>).
            The <b>computing clusters</b> provide a robust environment equipped with a broad range of <a href="https://scinet.usda.gov/guides/start#software" target="_blank">pre-installed tools and software packages</a>,  
            supporting diverse computational needs. These tools can be accessed and executed efficiently through the Command Line Interface (CLI). 
            This powerful infrastructure enables USDA researchers and collaborators to perform advanced computational tasks with ease and efficiency.
        </p>
        *<em>Users who are new to the HPC environment may benefit from the <a href="https://www.youtube.com/watch?v=d7oKSL4aitw" target="_blank">SCINet/Ceres onboarding video</a>.</em>
    </div>
</div>


### What do you need to access Atlas or Ceres?

Before you get started actively using the SCINet resources, follow these steps:

<div class="usa-accordion">

{% include accordion title="Sign up for a SCINet account (required)" class="outline " controls="access-scinet-1" %} 
<div id="access-scinet-1" class="accordion_content">    
<p>
The SCINet account is required to get an access to the SCINet HPC clusters and specialized content of the SCINet resources, 
such as <a href="https://scinet.usda.gov/training/free-online-training" target="_blank">trainings</a>, <a href="https://scinet.usda.gov/events/scinet-corner#scinet-corner" target="_blank">SCINet Corner recordings</a> or <a href="https://scinet.usda.gov/training/learningpath#scinet-forum" target="_blank">SCINet Forum</a>.
</p> <br>
<b>To obtain a SCINet account</b>, a SCINet Account Request must be submitted:
<li><b>A.</b> for ARS-affiliated users:<a href="https://scinet.usda.gov/about/signup#ars-employees" target="_blank"> SCINet Account Request</a></li>
<li><b>B.</b> for non-ARS users:<a href="https://scinet.usda.gov/about/signup#non-ars-employees" target="_blank"> Non-ARS SCINet Account Request</a></li>
*<em>The approval process depends on the affiliation of the requester.</em>
</div>

{% include accordion title="Request a project directory (required)" class="outline " controls="access-scinet-2" %} 
<div id="access-scinet-2" class="accordion_content">    
<p>
<a href="https://scinet.usda.gov/guides/data/storage#project-directories" target="_blank">Project directories</a> are usually associated with ARS Research Projects. 
While it’s possible to run simulations on Ceres or Atlas using only <code>home</code> directories and <a href="https://scinet.usda.gov/guides/data/storage#large-short-term-storage" target="_blank">Large Short-term Storage</a> 
in <code>/90daydata/shared</code>, it is recommended to <a href="https://forms.office.com/g/wD9rYarVyn" target="_blank">request a project directory</a>. 
</p>
<div id="note-alerts-1" class="highlighted highlighted--tip ">
    <div class="highlighted__body">
        <p>
            <b>Registered SCINet users without project directories can still access the CLI.</b> However, submitting computing jobs is restricted to using 
            a temporary <code>sandbox</code> <a href="https://scinet.usda.gov/guides/resources/CeresAtlasDifferences#slurm-account" target="_blank">slurm account</a> 
            for testing and basic usage. To run jobs on compute nodes of either cluster, the jobs need to be associated with a slurm account. 
            For users that have access to one or more project directories, their slurm accounts have same names as the project directories.
        </p>
    </div>
</div>
</div>

{% include accordion title="Read the SCINet Policy (optional)" class="outline " controls="access-scinet-3" %}
<div id="access-scinet-3" class="accordion_content">
<p>
Reading the SCINet Policy before you get started using the SCINet resources is important for several reasons. 
In particular, the SCINet policy is concise and contain important information about how the resource may be used, 
including any restrictions or limitations on use. This can help you understand what you can and cannot do with the resource. 
</p> <br>
In particular, you can learn about:
<table markdown="1">
<tr>
<td><a href="https://scinet.usda.gov/about/policies#accounts" target="_blank">accounts</a></td>
<td><a href="https://scinet.usda.gov/about/policies#software" target="_blank">storage</a></td>
<td><a href="https://scinet.usda.gov/about/policies#job-queues" target="_blank">job queues</a></td>
<td><a href="https://scinet.usda.gov/about/policies#software" target="_blank">software</a></td>
<td><a href="https://scinet.usda.gov/about/policies#data-management" target="_blank">data management</a></td>
</tr>
</table>
</div>

{% include accordion title="Know where to find help (optional)" class="outline " controls="access-scinet-4" %} 
<div id="access-scinet-4" class="accordion_content">

<div class="usa-accordion">

{% include accordion title="1. read FAQs" class="outline " controls="cli-usage-1" %} 
<div id="cli-usage-1" class="accordion_content">    
<p>
It is generally a good idea to browse the Frequently Asked Questions (<a href="https://scinet.usda.gov/support/faq#faqs" target="_blank">SCINet FAQ</a>) section first because it can save you time and effort. 
The FAQ section is designed to provide answers to common questions that users may have about the SCINet service.
</p>

<div id="note-alerts-1" class="highlighted highlighted--tip ">
    <div class="highlighted__body">
        <p>
            By browsing the FAQ section, you may be able to <b>quickly find the answer to your question</b> without having 
            to contact SCINet support team or search through other parts of the website. Overall, browsing the FAQ section can be a useful first step 
            in getting the information you need and can help you save time and effort in the process.
        </p>
    </div>
</div>
</div>

{% include accordion title="2. read GUIDEs" class="outline " controls="cli-usage-2" %}
<div id="cli-usage-2" class="accordion_content">
<p>
Reading <a href="https://scinet.usda.gov/guides/" target="_blank">User Guides</a> can be a good starting point to get an overview on how to use the SCINet services. 
You can easily find the links to the User Guides in the top dropdown menu on the <a href="https://scinet.usda.gov/" target="_blank">SCINet website</a>.
</p>
<p align="center"><img width="1000" src="../assets/img/scinet-user-guides.png"></p>
</div>

{% include accordion title="3. contact VRSC" class="outline " controls="cli-usage-3" %} 
<div id="cli-usage-3" class="accordion_content">    
<p>
If your question is not on the FAQs list or the answer in the guide is not comprehensive, <b>contact the VRSC support team</b>. 
Email is a good way to contact SCINet support team for information or direct help. 
</p>
<li><b>scinet_vrsc@usda.gov</b></li>
<ul>
<li>use it for questions or feedback about the website, SCINet newsletter or to contribute content</li>
<li>to get technical assistance with your SCINet account</li>
<li>to get broad HPC support from the <a href="https://scinet.usda.gov/about/vrsc#the-scinet-virtual-research-support-core" target="_blank">Virtual Research Support Core</a> (VRSC)</li>
*<em>Learn more about <a href="https://scinet.usda.gov/support/contact#how-and-when-to-contact-the-vrsc" target="_blank">How and When to Contact the VRSC?</a></em>
</ul>
</div>

{% include accordion title="4. use SCINet Forum" class="outline " controls="cli-usage-4" %} 
<div id="cli-usage-4" class="accordion_content">    
<p>
Finally, contact other SCINet users on the <a href="https://forum.scinet.usda.gov/login" target="_blank">SCINet Forum</a> to get a quick response to your question.
</p>
<p align="center"><img width="1000" src="../assets/img/scinet_forum.png"></p>

<div id="note-alerts-1" class="highlighted highlighted--tip ">
    <div class="highlighted__body">
        <p>
            The forum is actively monitored by community members who are willing to help others, so you may be able to get an answer to your question in a short amount of time. 
            Another benefit is that you can get a variety of perspectives on your question. By asking your question on a forum, you can get input from multiple people 
            who may have different experiences and expertise. Finally, the SCINet forum can be a good resource for learning more about a particular topic. 
            By reading through previous discussions and questions on the forum, you may be able to learn more about the issue and get ideas for your own questions.
        </p>
    </div>
</div>
</div>
</div>
</div>
</div>


## Web-based access to HPC CLI

SCINet provides several <a href="https://scinet.usda.gov/guides/access/#web-based-access-to-scinet" target="_blank">web-based interfaces</a> 
for interacting with its computing clusters, each serving distinct purposes. These interfaces allow users to utilize graphical tools, manage workflows and access specialized features. 
In particular, <a href="https://galaxy.scinet.usda.gov/" target="_blank">Galaxy on Ceres</a> supports graphical data analysis workflows 
and <a href="https://www.globus.org/" target="_blank">Globus GUI</a> facilitates efficient file transfers.

Among SCINet web-based user interfaces, the <a href="https://scinet.usda.gov/guides/use/open-ondemand#open-ondemand-interface" target="_blank">Open OnDemand (OOD) services</a> for Ceres and Atlas offer the ability to directly launch a Unix shell for a selected cluster, enabling you to <b>access the cluster's CLI in a web browser</b>. 

<div id="note-alerts-1" class="highlighted highlighted--note ">
    <div class="highlighted__body">
        <p>
            Open OnDemand (OOD) is a web-based interface that provides users with convenient access to high-performance computing (HPC) resources, 
            including graphical tools, file management and direct CLI access, through a web browser. 
            The key benefit for SCINet users is that they can use any web browser, including browsers on a mobile phone, to access both clusters.
        </p>
        <li><b>Ceres OOD: </b> <a href="http://ceres-ood.scinet.usda.gov/" target="_blank">http://ceres-ood.scinet.usda.gov/</a></li>
        <li><b>Atlas OOD:</b> <a href="https://atlas-ood.hpc.msstate.edu/" target="_blank">https://atlas-ood.hpc.msstate.edu/</a></li>
    </div>
</div>

<div id="warning-alerts-0" class="highlighted highlighted--warning ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">SCINet login</h4>
        <p>
            For the most accurate and up-to-date instructions on logging into each cluster via OOD services, please refer to the <a href="https://scinet.usda.gov/guides/access/web-based-login#accessing-web-based-interfaces" target="_blank">SCINet website/User Guides/<b>Accessing Web-Based Interfaces</b></a>.
        </p>

    </div>
</div>

### Access Ceres CLI via OOD

Follow these steps for accessing command line interface on Ceres via Open onDemand interface in web browser.

**1.** Open a web browser and navigate to the URL for the <a href="[https://](http://ceres-ood.scinet.usda.gov/)" target="_blank">Ceres OOD service</a>. *Click on a link or copy-paste the URL.*
```bash
# URL to Ceres OOD
http://ceres-ood.scinet.usda.gov/
```

**2.** Log in using your user SCINet credentials. *Follow the instructions for <a href="https://scinet.usda.gov/guides/access/web-based-login#accessing-web-based-interfaces" target="_blank"><b>Accessing Web-Based Interfaces</b></a>*

  - You will initially be presented with the SCINet login page.

  ![scinet login in web browser](../assets/img/scinet-login.png)

  - Choose “Login.gov or USDA LincPass” as your sign-in option.
    - A. If you have a LincPass/AltLinc or PIV Exemption, you will authenticate as usual with eAuth.
    - B. If you do not have a LincPass/AltLinc or PIV Exemption, you will authenticate using Login.gov.
      - *Please see the detailed instructions for <a href="https://scinet.usda.gov/guides/access/login/logingov" target="_blank">logging on to SCINet using Login.gov</a>.*

  After successful authentication, you will automatically be redirected to Open OnDemand web interface.

  ![ceres ood in web browser](../assets/img/ceres-ood.png)

**3.** In the OOD interface, locate the <b>Clusters</b> tab in the top menu bar and select <b>Shell Access</b>.

  ![ceres shell access in web browser](../assets/img/ceres-shell-access.png)


**4.** A new browser tab will open with a terminal emulator, providing a Unix shell loaded and starting in your home directory by default.

  ![ceres cli in web browser](../assets/img/ceres-cli.png)


### Access Atlas CLI via OOD


## Command-line access to HPC CLI