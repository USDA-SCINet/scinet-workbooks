---
title: Process List
description: A process list displays the steps or stages of the workbook tutorial instructions.
---

*  **When to use the process list component**
    * Displaying high-level sequential steps of your tutorial.

*  **When to consider something else**
    * If you are writing a lesson module or reference materials
    * The steps are non-sequential
    * Your numbered content is nested within another structure, such as an accordion or parent process list.

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/process-list/)


## Component Examples

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="component-preview" expanded="true" %}
<div id="component-preview" class="accordion_content">

<ol class="usa-process-list">
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading rm-a">Start a process</h3>
    <p class="margin-top-05">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
      ipsum sed pharetra gravida, orci magna rhoncus neque.
    </p>
    <ul>
      <li>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
        ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio
        lorem non turpis.
      </li>
      <li>
        Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat
        condimentum.
      </li>
      <li>Aliquam erat volutpat. Sed quis velit.</li>
    </ul>
  </li>
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading rm-a">Proceed to the second step</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
      ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio
      lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula
      volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla
      facilisi. Nulla libero. Vivamus pharetra posuere sapien.
    </p>
  </li>
  <li class="usa-process-list__item">
    <h3 class="usa-process-list__heading rm-a">Complete the step-by-step process</h3>
    <p>
      Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat
      condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla
      libero. Vivamus pharetra posuere sapien.
    </p>
  </li>
</ol>

</div>

{% include accordion title="Component Code" class="outline" controls="component-codes" %}
<div id="component-codes" class="accordion_content" markdown='1'>

```
<div class="process-list" markdown="1">

### Start a process

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
ipsum sed pharetra gravida, orci magna rhoncus neque.
* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.
* Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.
* Aliquam erat volutpat. Sed quis velit

### Proceed to the second step

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.

Complete the step-by-step process

Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.

</div>
```

</div>
</div>