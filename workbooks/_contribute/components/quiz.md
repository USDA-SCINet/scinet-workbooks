---
title: Quiz
description: A self-check learning assessment tool


questions:
  - question: "All questions, solutions, responses, and answers can display basic markdown formatting."
    qid: 1 ## This is the id of the question and is used to call it in the markdown
    solution: "This is a solution to the first question and `includes code formatting` in the response." ## This shows on a Success, or Show Answer if there are no Answers provided
  - question: "Custom question titles can be included in the yml if you would like one to be different from the rest"
    title: Each answer has its own response 
    qid: 2
    answers: ## These are the answers users can pick between for this question
      - answer 1 
      - answer 2
      - answer 3
    responses: ## These are the responses users can pick between for this question. This is optional, but if used there should be an entry for every answer
      - This shows up if you select answer 1
      - This shows up if you select answer 2
      - "Answer 3 is correct - Note that when you are including \"responses\", any included \"solution\" variable will be ignored."
    answer: 3  ## this indicates which answer is correct
  - question: "Your questions can be multiple choice. In this case, questions 2 and 3 are marked as correct"
    qid: 3
    answers: 
      - answer 1
      - answer 2
      - answer 3
    answer: [2,3]  
  - question: "This question doesn't have a solution or responses, so will render without a \"Submit\" or \"Show Answer\" button"
    title: "Thought Question" ## The custom title helps signal that the difference is intentional.
    qid: 4
  - question: "Answer 2 is correct"
    qid: 5
    answers: 
      - answer1
      - answer2
      - answer3
    answer: 2  
    solution: "This is printed if the user gets the answer correct. If this is not included, and there is no \"Response\" attribute, the result will just show \"Success!\" instead"
  - question: "This question has code in the solution.  You can specify that code should be copiable or not."
    qid: 6
    solution: "The code for this component will look something like:  

    <code class='copy'>This code can be copied</code>  
    
    <code class='no-copy'>This code can not be copied</code>"
---

## Component Examples

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="component-preview" expanded="true" %}
<div id="component-preview" class="accordion_content usa-prose"  markdown='1'>

Each question can be used in a "question" component **one time**.

{% include question qid=1 %} 
{% include question qid=5 %}
{% include question qid=6 %}

You can put a question by itslf, or you can call it in a group.

{% include question qid="2,3" %}  

You can also group questions into a self-assessment quiz.  
If you would like the same question on the page twice, you can use it once in a question component and again in a quiz component.

{% include quiz qid="1,3,5" %}  

If you want to include a question that does not require an answer, and do not want to include it in the frontmatter with the other questions, you may use the alert component with type "question".

{% include alert class="question" title="You try!" content="Include your content here" %}

</div>
{% include accordion title="Component Code" class="outline" controls="component-codes" %}
<div id="component-codes" class="accordion_content" markdown='1' hidden>

#### Frontmatter example
```bash
questions:
  - question: "All questions, solutions, responses, and answers can display basic markdown formatting."
    qid: 1 ## This is the id of the question and is used to call it in the markdown
    solution: "This is a solution to the first question and `includes code formatting` in the response." ## This shows on a Success, or Show Answer if there are no Answers provided
  - question: "Custom question titles can be included in the yml if you would like one to be different from the rest"
    title: Each answer has its own response 
    qid: 2
    answers: ## These are the answers users can pick between for this question
      - answer 1 
      - answer 2
      - answer 3
    responses: ## These are the responses users can pick between for this question. This is optional, but if used there should be an entry for every answer
      - This shows up if you select answer 1
      - This shows up if you select answer 2
      - "Answer 3 is correct - Note that when you are including \"responses\", any included \"solution\" variable will be ignored."
    answer: 3  ## this indicates which answer is correct
  - question: "Your questions can be multiple choice. In this case, questions 2 and 3 are marked as correct"
    qid: 3
    answers: 
      - answer 1
      - answer 2
      - answer 3
    answer: [2,3]  
  - question: "This question doesn't have a solution or responses, so will render without a \"Submit\" or \"Show Answer\" button"
    title: "Thought Question" ## The custom title helps signal that the difference is intentional.
    qid: 4
  - question: "Answer 2 is correct"
    qid: 5
    answers: 
      - answer1
      - answer2
      - answer3
    answer: 2  
    solution: "This is printed if the user gets the answer correct. If this is not included, and there is no \"Response\" attribute, the result will just show \"Success!\" instead"
  - question: "This question has code in the solution.  You can specify that code should be copiable or not."
    qid: 6
    solution: "The code for this component will look something like:  

    <code class='copy'>This code can be copied</code>  
    
    <code class='no-copy'>This code can not be copied</code>"
```

#### Using the components
```
{% raw %}Each question can be used in a "question" component **one time**.

{% include question qid=1 %} 
{% include question qid=5 %}
{% include question qid=6 %}

You can put a question by itslf, or you can call it in a group.

{% include question qid="2,3" %}  

You can also group questions into a self-assessment quiz.  
If you would like the same question on the page twice, you can use it once in a question component and again in a quiz component.

{% include quiz qid="1,3,5" %}  

If you want to include a question that does not require an answer, and do not want to include it in the frontmatter with the other questions, you may use the alert component with type "question".

{% include alert class="question" title="You try!" content="Include your content here" %}
{% endraw %}

```
</div>
</div>