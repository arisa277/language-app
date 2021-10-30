class Question {
    index = 0;
    question = '';
    answer = '';
    alternatives = [];
    open = false;

    constructor () {
        this.load();
    }

    next() {
        if (this.index === questions.length - 1) return;
        this.index = this.index + 1;
        this.load()
    }

    load() {
        let question = questions[this.index]
        this.question = question[0];
        this.answer = question[1];
        this.open = true;
        this.alternatives = [];
        for (let i = 0; i < question[2].length; i++) {
            this.alternatives.push(question[2][i]);
        }
        console.log(this.open);
    }
}

let questions = [
    ["Frukost", "Breakfast", ["Dinner", "Lunch", "Brunch"]],
    ["Middag", "Dinner", ["Breakfast", "Lunch", "Brunch"]],
    ["Lunch", "Lunch", ["Breakfast", "Dinner", "Brunch"]]
];

let answerButtons = document.querySelector('.answers');
answerButtons.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) return;
    answerQuestion(event.target);
})
document.querySelector('button.next').addEventListener('click', (event) => {
    nextQuestion();
})

let currentQuestion = new Question();
loadQuestion(currentQuestion);

function loadQuestion(question) {
    let questionElement = document.getElementById("question");
    questionElement.innerHTML = question.question;
    
    let answerElements = [];
    answerElements.push(document.getElementById("answer1"));
    answerElements.push(document.getElementById("answer2"));
    answerElements.push(document.getElementById("answer3"));
    answerElements.push(document.getElementById("answer4"));
    
    let alternatives = question.alternatives;
    alternatives.push(question.answer);
    let randomAlternatives = shuffleArray(alternatives);
    
    for (let i = 0; i < answerElements.length; i++) {
        answerElements[i].innerHTML = randomAlternatives[i];
        answerElements[i].classList.remove('disabled', 'correct', 'wrong');
    }

    document.querySelector('button.next').classList.add('disabled');
}

function nextQuestion() {
    currentQuestion.next();
    loadQuestion(currentQuestion);
}

function answerQuestion(answer) {
    if (!currentQuestion.open) return;
    currentQuestion.open = false;
    
    let buttons = document.querySelectorAll('.answers button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('disabled');
    }
    document.querySelector('button.next').classList.remove('disabled');

    if (currentQuestion.answer === answer.innerHTML) {
        answer.classList.add('correct');
        answer.classList.remove('disabled');
    } else {
        answer.classList.add('wrong');
        answer.classList.remove('disabled');
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML === currentQuestion.answer) {
                buttons[i].classList.add('correct');
                buttons[i].classList.remove('disabled');
            }
        }
    }
}

function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

