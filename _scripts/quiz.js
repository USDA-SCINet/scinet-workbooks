const quizload = require("./js/quiz");

const initQuiz = () => {
  quizload();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initQuiz, { once: true });
} else {
    initQuiz();
}