const { codeProcess } = require("./copycode");

var questions = [];

// handler for quizzes
function submitQuiz(form){
  // get form data
  var fdata = new FormData(form);

  var formid = form.getAttribute("id");

  var uniqueKeys = new Set();

  // get only unique keys
  // avoid duplicate submissions on multiple choice questions
  for (const key of fdata.keys()) {
    if (!(uniqueKeys.has(key))) {
      let thisquestionid = formid + "-" + key;
      quizSuccess(thisquestionid, key, fdata);
      uniqueKeys.add(key);
    }
  }

  //return false;
  
}

// handler for single question forms
function submitQuestion(form){
  // get form data
  var fdata = new FormData(form);
  var dataqid = form.getAttribute("data-qid");
  var formid = form.getAttribute("id");

  quizSuccess(formid, dataqid, fdata); 
  //return false;
  
}

function processCodeBlocks (solutionhtml){
  let copyingcode = solutionhtml.find( "code.copy" );
  solutionhtml.find( "code.nocopy" ).wrap("<div class='language-plaintext highlighter-rouge'><div class='highlight'><pre class='highlight'></pre></div></div>");
  
  if (copyingcode.length > 0) {
    copyingcode.wrap("<div class='language-plaintext copy-code highlighter-rouge'><div class='highlight'><pre class='highlight'></pre></div></div>");
    // add the copycode section here.
    let copycodediv = solutionhtml.find( "div.copy-code" );
    codeProcess(copycodediv[ 0 ] );
  }
}

// Get answers and responses from json

function quizSuccess(formid, idval, myResponses) {
  var displayDivId = formid + "-result";
  var displayDiv = $('#' + displayDivId);

  // Find the question by qid (ensure idval is number if needed)
  console.log(questions);
  var mySolutions = questions ? questions.find(q => String(q.qid) === String(idval)) : null;
  console.log(mySolutions);
  var myAnswer = mySolutions ? mySolutions.answer : null;
  var mySolution =  mySolutions ? mySolutions.solution : null;
  var myCorrections = mySolutions ? mySolutions.responses : null;
  
  // Get the user's response(s) as array or value
  var userResponse = myResponses.getAll(idval);
  
  // If multiple checkboxes, FormData returns array, else string
  // Normalize for comparison
  let responseArr = Array.isArray(userResponse) ? userResponse.map(String) : (userResponse !== undefined ? [ String(userResponse) ] : [ ]);
  let solutionArr = Array.isArray(myAnswer) ? myAnswer.map(String) : (myAnswer !== undefined ? [ String(myAnswer) ] : [ ]);
  let correctionArr = Array.isArray(myCorrections) ? myCorrections.map(String) : (myCorrections !== undefined ? [ String(myCorrections) ] : [ ]);
  let resultMsg = "";
  let solutionMsg = "";
  let alertClass = "";

  if (myAnswer === undefined || myAnswer === null) {
    // No solution, just show the answer
    resultMsg = "Answer:";
    solutionMsg = mySolution ? mySolution : "No answer available.";
    alertClass = "usa-alert usa-alert--info";
  } else if (responseArr.length > 1 && solutionArr.length === 1) {
    // User selected multiple answers but only one is correct
    resultMsg = "Error";
    solutionMsg = "Please only select one answer";
    alertClass = "usa-alert usa-alert--error";
  } else if (responseArr.length > 1 && solutionArr.length > 1) {
    // Compare arrays (order-insensitive)
    const sortedResp = [ ...responseArr ].sort();
    const sortedSol = [ ...solutionArr ].sort();
    const isMatch = sortedResp.length === sortedSol.length && sortedResp.every((v, i) => v === sortedSol[ i ]);
    if (isMatch) {
      resultMsg = "Success!";
      solutionMsg = mySolution ? mySolution : "";
      alertClass = "usa-alert usa-alert--success";
    } else {
      resultMsg = "Incorrect";
      solutionMsg = "<p>Please try again</p>";
      alertClass = "usa-alert usa-alert--error";
    }
  } else if (responseArr.length === 1 && solutionArr.length === 1) {
    // Compare single values
    if (String(responseArr[ 0 ]) === String(solutionArr[ 0 ])) {
      resultMsg = "Success!";
      solutionMsg = myCorrections ? correctionArr[ userResponse-1 ] : (mySolution ? mySolution : "");
      alertClass = "usa-alert usa-alert--success";
    } else {
      resultMsg = "Incorrect";
      solutionMsg = myCorrections ? correctionArr[ userResponse-1 ] : "<p>Please try again</p>";
      alertClass = "usa-alert usa-alert--error";
    }
  } else {
    resultMsg = "Incorrect";
    solutionMsg = "<p>Please try again</p>";
    alertClass = "usa-alert usa-alert--error";
  }

  var htmlSolution = solutionMsg ? $.parseHTML( solutionMsg ) : null;
  var solPrint = solutionMsg ? htmlSolution[ 0 ].data : " ";

  // Wrap the result in a USWDS Alert
   const alertHtml = $("<div/>", {
      "class": alertClass + " margin-2 shadow-3",
    }).append($('<div/>',{
      "class": "usa-alert__body",
    }).append($("<h4/>", {
      "class":"usa-alert__heading",
      text:resultMsg,
    })).append($("<div/>", {
      "class":"usa-alert__text",
    }).html(solPrint))); 

    processCodeBlocks(alertHtml);

    displayDiv.html(alertHtml);

  }

// Returns the "questions" array from quizdata
function getQuizQuestions() {  
  const baseURL = window.location.origin;
  var path = window.location.pathname;
  $.ajax({
      type: 'GET',
      url: baseURL + '/assets/js/quiz/quiz.json',
      data: { get_param: 'value' },
      dataType: 'json',
      success: function (data) {
        
        var entry = data.find(q => q.ref === path);
        console.log(entry.questions);
        var questionsarray = entry ? entry.questions : null;
        questions = questionsarray;
      },
      error: function () {
        console.log("Failed to fetch quiz questions");
      },
  });
}

function quizload(){

  getQuizQuestions();

  document.querySelectorAll('.sn-quiz').forEach(quiz => {
    //quiz.addEventListener("submit", () => submitQuiz(quiz));
    quiz.addEventListener("submit", function (e) {
      e.preventDefault();
      submitQuiz(this); 
    });
  });
  document.querySelectorAll('.sn-question').forEach(question => {
    //question.addEventListener("submit", () => submitQuestion(question));
    question.addEventListener("submit", function (e) {
      e.preventDefault();
      submitQuestion(this); 
    });
  });
}

module.exports = quizload;