let question = {
    question: "question 1",
    answer: "correct answer",
    alternatives: ["wrong answer 1", "wrong answer 2", "wrong answer 3"]
}

console.log("Loading question...");

let questionElement = document.getElementById("question");
questionElement.innerHTML = question.question;

let answerElements = [];
answerElements.push(document.getElementById("answer1"));
answerElements.push(document.getElementById("answer2"));
answerElements.push(document.getElementById("answer3"));
answerElements.push(document.getElementById("answer4"));


console.log(answerElements);