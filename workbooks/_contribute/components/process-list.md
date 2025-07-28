---
title: Process List
description: A process list displays the steps or stages of the workbook tutorial instructions.
---

*  **When to use the process list component**
    * Displaying high-level steps of your tutorial.

*  **When to consider something else**
    * Your content is nested within another structure, such as an accordion or parent process list.

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/process-list/)


## Component Examples

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="component-preview" expanded="true" %}
<div id="component-preview" class="accordion_content">
<ul class="usa-content-list">
<li>
<h4>Ordered process</h4>

<ol class="usa-process-list">
  <li class="usa-process-list__item h3list">
    <h3 class="usa-process-list__heading rm-a">Start a process</h3>
      <p class="margin-top-05">
        Step 1 content
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
  <li class="usa-process-list__item h3list">
    <h3 class="usa-process-list__heading rm-a">Proceed to the second step</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo,
      ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio
      lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula
      volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla
      facilisi. Nulla libero. Vivamus pharetra posuere sapien.
    </p>
  </li>
  <li class="usa-process-list__item h3list">
    <h3 class="usa-process-list__heading rm-a">Complete the step-by-step process</h3>
    <p>
      Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat
      condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla
      libero. Vivamus pharetra posuere sapien.
    </p>
  </li>
</ol>

</li>

<li>
<h4>Unordered process</h4>
<ul class="usa-process-list">
  <li class="usa-process-list__item">
    <h4 class="usa-process-list__heading h4list rm-a">First section</h4>
    <p>
      Section 1 content
    </p>
  </li>
  <li class="usa-process-list__item">
    <h4 class="usa-process-list__heading h4list rm-a">Second Section</h4>
    <p>
      Section 2 content
    </p>
  </li>
  <li class="usa-process-list__item">
    <h4 class="usa-process-list__heading h4list rm-a">Third Section</h4>
    <p>
      Section 3 content
    </p>
  </li>
</ul>
</li>
</ul>


</div>

{% include accordion title="Component Code" class="outline" controls="component-codes" %}
<div id="component-codes" class="accordion_content" hidden markdown='1'>

<ul class="usa-content-list">
<li markdown="1">
<h4>Default Process List</h4>
By default, all h3 headers in your process list will be numbered.

```
<div class="process-list" markdown="1">

### Start a process

Step 1 content.
* Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.
* Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.
* Aliquam erat volutpat. Sed quis velit

### Proceed to the second step

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.

### Complete the step-by-step process

Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.

</div>
```
</li>
<li markdown="1">
<h4>Ordered process with h4 headers</h4>
You can specify that your process list should use h4 headers by adding class `h4`.

```
<div class="process-list h4" markdown="1">

#### Start a process

Step 1 content

#### Proceed to the second step

Step 2 content

#### Complete the step-by-step process

Final step content

</div>
```
</li>
<li markdown="1">
<h4>Unordered process</h4>
Adding class `ul` returns an unordered process list.

As with the ordered process lists, you can add class `h4` to have the list use h4 headers instead of h3.

```
<div class="process-list h4 ul" markdown="1">

#### First Section

Section 1 content

#### Second Section

Section 2 content

#### Third Section

Section 3 content

</div>
```
</li>
</ul>

</div>
</div>