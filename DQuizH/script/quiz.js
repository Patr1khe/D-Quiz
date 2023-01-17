const answerAltGridBoxEl = document.querySelector('#answer-alt-grid-box');
const questionImgCol = document.querySelector('#col-12');
const pickAlts = Array.from(document.querySelectorAll('.answer-textalt'));
const scoreText = document.querySelector('#score-counter');
const progressCount = document.querySelector('#image-counter');
const mainW = document.querySelector('.quiz-holder');






let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let copyCurrentQ = [{}];



const SCORE_POINTS = 1;
let MAX_QUESTIONS;
const startOptButton = document.querySelector('.btn');
const boxesR = document.querySelector('.hide');



startOptButton.addEventListener('click', (e) => {
    e.preventDefault();


    if (e.target.tagName === "BUTTON") {
        
        MAX_QUESTIONS = Number(e.target.innerText);

        console.log("clicked", e.target, MAX_QUESTIONS)
        //const clickedValue = e.target.dataset.value;


        
    }
    
    startGame()
});


// shuffle all 41 heroes inside arrayn
const shuffleArr = ((array, NewIndex = 0) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
})  

//shuffle Array index between 1-4
function shuffleArrayIn(array, startingIndex = 0) {
    for (let currentIndex = startingIndex; currentIndex < array.length; currentIndex++) {
      let randomIndex = startingIndex + (Math.floor(Math.random() * (array.length - startingIndex)));
      let tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  }
  
let startingIndex = 1;

startGame = () => {
    console.log("started");
    startOptButton.classList.add('hide');
    highScore.classList.add('hide')
    questionCounter = 0;
    acceptingAnswers = true;
    scoreText.innerText = score;
    score = 0;
    availableQuestions = [...Dota2Heroes];
    shuffleArr(availableQuestions)
    console.log(availableQuestions)
    getNewQuestion()
   
    

}

let correctHeroes = [];
let addIndexZero = [];
let checkCorrect = []; 

getNewQuestion = () => {
    // Game ends after answer 10/20/41 Images
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        
            localStorage.setItem('mostRecentScore', scoreText.innerText)
            localStorage.setItem('mostRecentRound', progressCount.innerText)
            return window.location.assign("index.html")
  
        
    }

    questionCounter++;
    progressCount.innerText = `${questionCounter}/${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
  
    questionImgCol.innerHTML = `<img src="${availableQuestions[0].image}">`;
   
    console.log(availableQuestions[0])
    
    

    copyCurrentQ.push(availableQuestions[0].name)
    copyCurrentQ.push(availableQuestions[1].name)
    copyCurrentQ.push(availableQuestions[2].name)
    copyCurrentQ.push(availableQuestions[3].name)
    correctHeroes = availableQuestions[0].name;
    addIndexZero.push(availableQuestions[0])
    checkCorrect.push(availableQuestions[0])

    
   
  

    // This shuffle pickalts answer will referesh everytime i click on the alternative.
    shuffleArrayIn(copyCurrentQ, startingIndex)
    
    


    
    pickAlts.forEach((pickAlt) => {
        const number = pickAlt.dataset['number'];
        pickAlt.innerText ="";
        pickAlt.innerText += copyCurrentQ[number]
        console.log(availableQuestions[0])
        console.log(availableQuestions)
        
        
    });
    
    copyCurrentQ.splice(-4);

    // remove e.target questionsindex while randomise a name
    // selectedpickAlt = availableQuestions.splice(questionsIndex, 1);
    
    
    // remove starting index of array while e.target the 1st option box that's index 0 of availableQuestion Arrayn.
    availableQuestions.shift(questionsIndex, 1);
    acceptingAnswers = true;



    
    
}




// Show randomise image in javascript 
const qImage = () => {
    questionImgCol.innerHTML ="";
    const hqImg = Dota2Heroes.map(() => {
        questionImgCol.innerHTML = `
        <img src="${Dota2Heroes[Math.floor(Math.random()*41)].image}">
        `
        return Dota2Heroes[0]
    });
    
}
qImage();

const highScore = document.querySelector('.result');
const mostRecentScore = localStorage.getItem("mostRecentScore");
const mostRecentRound = localStorage.getItem("mostRecentRound");

highScore.innerText = `Most Recent Highscore: Images-Counter: ${mostRecentRound} -> Guessed: ${mostRecentScore}`;