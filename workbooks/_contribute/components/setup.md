---
title: Setup
description: Standardized sections usually used for the Tutorial Setup Instructions section of your tutorial or lesson.

code: demo.Rmd
setup: [mkdir,conda,kernel,jupyter_terminal,code]

conda: [nodejs ruby compilers]

wget: [img/demoimg.png,demofile.pdf,demotxt.txt]

---

*  **When to use a setup component**
    * At the beginning of tutorials and lessons, after your introduction and overview component
    * If there is a component that exactly matches your use case
    * Use the specific `setups` component if a numbered list is desired.

*  **When to consider something else**
    * If you need to heavily modify the component
    * If you do not need a numbered setup list, consider calling each component separately.

## Component Examples

### Numbered list with Setups

Using `include setups` automatically adds your setup components to a numbered list, which you can then manually add to as needed for your tutorial.

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="setups-preview" expanded="true" %}
<div id="setups-preview" class="accordion_content usa-prose"  markdown='1'>

{% include setup/90daydata %}  

{% include setups %}

</div>

{% include accordion title="Component Code" class="outline" controls="setups-code" %}
<div id="setups-code" class="accordion_content usa-prose"  markdown='1' hidden>

```bash
{% raw %}---
code: demo.Rmd
setup: [mkdir,conda,kernel,jupyter_terminal,code]
---

{% include setup/90daydata %}  

{% include setups %}{% endraw %}
```

</div>
</div>

### Available components

Any of these components can be included in the setups component or called separately as needed.
<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="components-preview" %}
<div id="components-preview" class="accordion_content usa-prose"  markdown='1' hidden>
parent
<ul class="usa-content-list">
<li markdown='1'>

#### Variables to include

<div class="margin-x-3" markdown='1'>

You can include a number of variables in your include statement or frontmatter to alter the behavior of these components.
* Environment:
  * `environment: environment_name `
  * `environment=environment_name `
  * Defaults to the tutorial directory name
* Folder:
  * `folder=1`
  * Assumes all associated files are stored in the tutorial's parent directory instead of the tutorial's directory.
    * Increasing the number moves up in directories.
    
</div>
</li>
<li markdown='1'>

#### 90daydata

<div class="margin-x-3" markdown='1'>

{% include setup/90daydata %}

</div>
</li>
<li markdown='1'>

#### Launching the shell

<div class="margin-x-3" markdown='1'>

{% include setup/shell %}

</div>
</li>
<li markdown='1'>

#### Making your directory

<div class="margin-x-3" markdown='1'>

{% include setup/mkdir %}

</div>
</li>
<li markdown='1'>

#### Including code

<div class="margin-x-3" markdown='1'>

{% include setup/code %}

</div>
</li>
<li markdown='1'>

#### Including Conda

<div class="margin-x-3" markdown='1'>

##### By specifying packages

{% include setup/conda %}

##### With a yml file

{% include setup/conda conda="demo_file" %}

</div>


</li>
<li markdown='1'>

#### Setting up kernels from conda environments

<div class="margin-x-3" markdown='1'>

{% include setup/kernel %}

{% include setup/jupyter_terminal %}

</div>

</li>
<li markdown='1'>

#### Downloading with wget

<div class="margin-x-3" markdown='1'>

{% include setup/wget %}

</div>
</li>
<li markdown='1'>

#### Referencing an introduction

* You can set the variable in the frontmatter with: `intro: geospatial/machine-learning/image-ml#for-python`
* Can be to a tutorial, or reference a specific section of a tutorial.
* Will set the default environment to the `intro` page unless an `environment` variable is specified
  * For example, the above intro variable would set the environment to `image-ml-for-python`  

<div class="margin-x-3" markdown='1'>

{% include setup/intro %}

</div>
</li>
</ul>

</div>

{% include accordion title="Component Code" class="outline" controls="components-code" %}
<div id="components-code" class="accordion_content usa-prose"  markdown='1' hidden>

<ul class="usa-content-list">
<li markdown='1'>

#### 90daydata

```bash
{% raw %}{% include setup/90daydata %}{% endraw %}
```
</li>
<li markdown='1'>

#### Launching the shell

```bash
{% raw %}{% include setup/shell %}{% endraw %}
```
</li>
<li markdown='1'>

#### Making your directory

```bash
---
mkdir: desired_directory ## Not required. Will default to /90daydata/shared/$USER/tutorial_directory_name
---
{% raw %}{% include setup/mkdir %}{% endraw %}
```
</li>
<li markdown='1'>

#### Including code

```bash
---
code: filename.rmd # or filename.ipynb
---
{% raw %}{% include setup/code %}
<!--OR-->
{% include setup/code code="filename.ipynb" %}{% endraw %}
```
</li>
<li markdown='1'>

#### Including Conda

```bash
---
##### By specifying packages

conda: [nodejs ruby compilers]
---
{% raw %}{% include setup/conda %}{% endraw %}
```

```bash
---
##### With a yml file

conda: demo_file ## or you can specify in the include statement
### if you don't include either and call the function, it will assume there is a file named tutorial_directory_name.yml
---
{% raw %}{% include setup/conda conda="demo_file" %}{% endraw %}
```

</li>
<li markdown='1'>

#### Setting up kernels from conda environments

```bash
---
kernel: custom_kernel_name ## not required. Can also be used in the include
---
{% raw %}{% include setup/kernel %}

{% include setup/jupyter_terminal %}{% endraw %}
```

</li>
<li markdown='1'>

#### Downloading with wget

```bash
---
wget: [img/demoimg.png,demofile.pdf,demotxt.txt]
---
{% raw %}{% include setup/wget %}{% endraw %}
```
</li>
<li markdown='1'>

#### Referencing an introduction

```bash
---
intro: geospatial/machine-learning/image-ml#for-python
---
{% raw %}{% include setup/intro %}{% endraw %}
```
</li>
</ul>

</div>
</div>
