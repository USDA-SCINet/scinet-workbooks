---
---
const quizdata = [{% include quiz.json  %}];
// Get the quiz questions for the current page and store globally
const questions = getQuizQuestions(quizdata);

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

  return false
  
}

// handler for single question forms
function submitQuestion(form){
  // get form data
  var fdata = new FormData(form)
  var dataqid = form.getAttribute("data-qid");
  var formid = form.getAttribute("id");

  quizSuccess(formid, dataqid, fdata); 

  return false
  
}

// Get answers and responses from json

function quizSuccess(formid, idval, myResponses) {
  var displayDivId = formid + "-result";
  var displayDiv = $('#' + displayDivId);

  // Find the question by qid (ensure idval is number if needed)
  var mySolutions = questions ? questions.find(q => String(q.qid) === String(idval)) : null;
  var myAnswer = mySolutions ? mySolutions.answer : null;
  var mySolution =  mySolutions ? mySolutions.solution : null;
  var myCorrections = mySolutions ? mySolutions.responses : null;
  
  // Get the user's response(s) as array or value
  var userResponse = myResponses.getAll(idval);
  
  // If multiple checkboxes, FormData returns array, else string
  // Normalize for comparison
  let responseArr = Array.isArray(userResponse) ? userResponse.map(String) : (userResponse !== undefined ? [String(userResponse)] : []);
  let solutionArr = Array.isArray(myAnswer) ? myAnswer.map(String) : (myAnswer !== undefined ? [String(myAnswer)] : []);
  let correctionArr = Array.isArray(myCorrections) ? myCorrections.map(String) : (myCorrections !== undefined ? [String(myCorrections)] : []);
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
    const sortedResp = [...responseArr].sort();
    const sortedSol = [...solutionArr].sort();
    const isMatch = sortedResp.length === sortedSol.length && sortedResp.every((v, i) => v === sortedSol[i]);
    if (isMatch) {
      resultMsg = "Success!";
      solutionMsg = mySolution ? mySolution : "";
      alertClass = "usa-alert usa-alert--success";
    } else {
      resultMsg = "Incorrect";
      solutionMsg = "Please try again";
      alertClass = "usa-alert usa-alert--error";
    }
  } else if (responseArr.length === 1 && solutionArr.length === 1) {
    // Compare single values
    if (String(responseArr[0]) === String(solutionArr[0])) {
      resultMsg = "Success!";
      solutionMsg = myCorrections ? correctionArr[userResponse-1] : (mySolution ? mySolution : "");
      alertClass = "usa-alert usa-alert--success";
    } else {
      resultMsg = "Incorrect";
      solutionMsg = myCorrections ? correctionArr[userResponse-1] : "Please try again";
      alertClass = "usa-alert usa-alert--error";
    }
  } else {
    resultMsg = "Incorrect";
    solutionMsg = "Please try again";
    alertClass = "usa-alert usa-alert--error";
  }

  //const solProcess = $.parseHTML( solutionMsg );
  //const solHtml = solProcess[0] ? solProcess[0].data : "";

  var htmlSolution = solutionMsg ? $.parseHTML( solutionMsg ) : null;
  var solPrint = solutionMsg ? htmlSolution[0].data : " ";

  // Wrap the result in a USWDS Alert
   const alertHtml = $("<div/>", {
      "class": alertClass + " margin-2",
    }).append($('<div/>',{
      "class": "usa-alert__body",
    }).append($("<h4/>", {
      "class":"usa-alert__heading",
      text:resultMsg,
    })).append($("<div/>", {
      "class":"usa-alert__text"
    }).html(solPrint))); 

    
    displayDiv.html(alertHtml)

}

// Returns the "questions" array from quizdata
function getQuizQuestions(quizdata) {
  const path = window.location.pathname;
  const entry = quizdata.find(q => q.ref === path);
  return entry ? entry.questions : null;
}