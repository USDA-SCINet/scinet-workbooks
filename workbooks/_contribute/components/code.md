---
title: Code Blocks
description: Copiable and non-copyiable blocks of relevant scripts and code.
---

Code blocks allow users to easily see and copy relevent code chunks from the workbooks.

*  **When to use the default copiable code block**
    * Users will benefit from being able to copy and paste the code chunk.

*  **When to use the non-copiable code block**
    * When demonstrating incorrect code.
    * When demonstrating code output results.

*  **When to consider something else**
    * The text does not include code.
    * You want to highlight a section of non-code text - consider an [Alert](./alerts).

Depending on how and where you are including your code, you will need to format it slightly differently.

## Component Examples

### Basic Code Blocks

{:.site-text-intro}
Basic code blocks can be included in standard paragraph text.  They render with a "Copy" button by default.

<div class="usa-accordion">

{% include accordion title="Component Preview" class="primary" controls="component-preview" %}
<div id="component-preview" class="accordion_content usa-prose"  markdown='1'>

~~~markdown
Copiable code block
~~~

{:.no-copy}
    Uncopiable code block


</div>
{% include accordion title="Component Code" class="outline" controls="component-codes" %}
<div id="component-codes" class="accordion_content" hidden markdown='1'>

<ul class="usa-content-list">

<li markdown="1">

#### Standard code blocks

* Copiable:
  ~~~markdown
  ```
  This code is copiable by default
  ```
  ~~~
* Not copiable:
  ~~~markdown
  Include a blank row after any text and before the no-copy class.  

  {% raw %}{:.no-copy}{% endraw %}
  ```
  The no-copy class selector
  indicates to not add a copy button
  ```
  ~~~
  * It is best practice to include a blank line above your `no-copy` class to avoid potential conflicting formatting.
</li>

<li markdown="1">

#### Code blocks using indentation

* Copiable:
  ```
      Indending four spaces turns 
      any text into a code snippet
  ```
* Not copiable:
  ```
  Include a blank row after any text and before the no-copy class.  

  {% raw %}{:.no-copy}{% endraw %}
      Do not indent the no-copy 
      class selector
  ```

</li>
<li markdown="1">



#### Language formatting

~~~markdown
```
Write your code here
```

```bash
Write your Bash code here
```

```r
Write your R code here
```

```python
Write your Python code here
```
~~~

</li>
</ul>

</div>
</div>

### Code Blocks in Lists

{:.site-text-intro}
Numbered and bulleted lists require slightly different formatting for code blocks to function as expected.  The key is to match the number of indented spaces to the line you want your code to be included in.

<div class="usa-accordion">

{% include accordion title="Component Code" class="outline" controls="component-codes-lists" %}
<div id="component-codes-lists" class="accordion_content" hidden markdown='1'>

<ul class="usa-content-list">

<li markdown="1">

#### Copiable code - Bulleted

For copiable code in bulleted lists to function as expected,
you need to have:  
* One space after each bullet and before the list content
* Two spaces before each line of the code block not in line with the bullet

This keeps markdown from adding unwanted extra spaces to your code
~~~markdown
* Including code in bulleted lists:
  ```
  <Insert code here>
  ```
  Any information you want in line with the code
* Next bullet in list
~~~

This functionally keeps your code in line with the indentation level of the bulleted text  


</li>
<li markdown="1">

#### Copiable code - Numbered

For copiable code in numbered lists to function as expected,
you need to have:  
* Two spaces after the number and before the list content
* Four spaces before each line of the code block

This keeps markdown from adding unwanted extra spaces to your code  

~~~markdown
1.  Including code in numbered lists:
    ```
    <Insert code here>
    ```
    Any information you want in line with the code
1.  Next number in list
1.  Markdown will automatically turn these 1's into a sequential list
1.  If the sequence is broken, your markdown is not formatted correctly!
~~~

Technically you could use three spaces with only one space after the number
without causing an issue, however keeping indentations in pairs makes
the code easier to maintain.  


</li>
<li markdown="1">

#### Copiable code - Nested

You can nest code following the same rules as above, just adding extra spaces
to match your current indentation level.

~~~markdown
1.  Including code in nested lists:
    ```
    <Insert code here>
    ```
    * Any information you want in bullets underneath the code
1.  Next number in list
    * A sublist with bullets
    * More information in sublist
      ```
      <Insert code into sublist here>
      ```
~~~  

Be sure your nested lists are not nested so deeply as to cause confusion.  


</li>
<li markdown="1">

#### Non-copiable code in lists

Using the `no-copy` class has the same space indentation requirements as copiable code blocks.  
It is best practice to also include a blank line above your `no-copy` class to avoid potential conflicting formatting.


1.  Including non-copiable code in nested lists:

    {:.no-copy}
    ```
    <Insert code here>
    ```
    * Any information you want in bullets underneath the code
1.  Next number in list
    * A sublist with bullets
    * More information in sublist
    
      {:.no-copy}
      ```
      <Insert code into sublist here>

      ## included comments
      <more code>
      ```

</li>
</ul>

</div>
</div>