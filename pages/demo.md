---
title: "Component Demonstration Page"
layout: single
subtitle: "Temporary page for Component demos"
---

# Highlighted sections

These are components for highlighting information in tutorials.

## Highlight with icons

{% include note class="info" txt="
Highlight this text please" 
%}

{% include note class="success" txt="
Highlight this text please"
%}

{% include note class="emergency" txt="
Highlight this text please"
%}

{% include note class="highlighted" txt="
Highlight this text please"
%}

{% include note class="warning" txt="
Highlight this text please

* These can be styled using markdown within the coomponent
* It functions in a standard fashion
  * Subheaders should be h5 or have five pound symbols.

" 
%}

{% include note class="tip" txt="
Highlight this text please" 
%}

{% include note title="Knowledge Check" class="question" txt="
Highlight this text please

1. Titles can be included to override the automatic title" 
%}

{% include note class="note" txt="
Highlight this text please" 
%}

## Class Settings

{:.class--warning}  
Class settings - warning

{:.class--info}  
Class settings - info

{:.class--question}  
Class settings - question

{:.class--tip}  
Class settings - tip

{:.class--error}  
Class settings - error

{:.class--note}  
Class settings - note

{:.class--highlighted}  
Class settings - highlighted

{:.class--success}  
Class settings - success

{:.class--emergency}  
Class settings - emergency

## Standard Alert

<div class="shadow-2 usa-alert usa-alert--info">
    <div class="usa-alert__body">
        <h4 class="usa-alert__heading">Info</h4>
        <p class="usa-alert__text">
            This is a standard alert
        </p>
    </div>
</div>

# Copying Code Button
Include class "copy-code"

{:.copy-code}
```
This is a code test

Lorem ipsum dolor sit amet,
consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum.
```