const gameContainer = document.getElementById("game");
let bestTime=999;
let currentGuesses = 0;
let clickCount = 0;
function randomColors(){
  const red = Math.floor(Math.random()*255);
  const green = Math.floor(Math.random()*255);
  const blue = Math.floor(Math.random()*255)
  return `rgb(${red},${green},${blue})`;
}
function gameComplete(){
  const allCards = document.querySelectorAll('#game div');
  for(let card of allCards){
    if(card.style.backgroundColor == 'white'){
      return false
    }
  }
  return true;
}
function startingProcess(){
  currentGuesses = 0;
  document.querySelector('#totalGuesses').innerText=currentGuesses;
  bestTime = localStorage.getItem('highScore')==null?bestTime: localStorage.getItem('highScore');
  document.querySelector('#bestTime').innerText =localStorage.getItem('highScore');
  const gameBoard = document.querySelector('#game');
  gameBoard.innerHTML = '';
  COLORS = [];
  if(parseInt(document.querySelector('#cardAmount').value)){
    const amountOfCards = document.querySelector('#cardAmount').value;

    for(i =0;i<(amountOfCards/2);i++){
      const randomColor = randomColors();
      COLORS.push(randomColor);
      COLORS.push(randomColor);
    }
    let shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
  }
}

function colorsMatch(color1,color2){
  if(color1==null||color2==null){
    return false;
  }
  else if(color1.className==color2.className){return true}else{return false;}
}

let clickedItems = [];
let COLORS = [];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}



// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
function handleCardClick(event) {
  console.log(clickedItems);

  if(clickedItems[0]==null|| clickedItems[1]==null){

    event.target.style.backgroundColor=event.target.className;
    if(event.target!=clickedItems[0]){
      clickedItems[clickCount]=event.target;
    }
  }
  // you can use event.target to see which element was clicked
  if(clickCount==1){
    if(colorsMatch(clickedItems[0],clickedItems[1])===false){
      setTimeout(function(){
        clickedItems[0].style.backgroundColor='white';
        clickedItems[1].style.backgroundColor = 'white'; 
        clickedItems[0]=null;
        clickedItems[1]=null;
      },1000);
      currentGuesses+=1;
    }else{
      currentGuesses+=1;
      clickedItems[0]=null;
      clickedItems[1]=null;
      if(gameComplete()){
        let highScore = bestTime<currentGuesses? bestTime:currentGuesses;
        console.log(highScore);
        localStorage.setItem('highScore',highScore);
        document.querySelector('#bestTime').innerText =highScore;
        if(document.querySelector('#restartGame').checked==true){
          setTimeout(function(){startingProcess()},1000);
        }
      }
    }
    clickCount=0;
    
    document.querySelector('#totalGuesses').innerText = currentGuesses;
  }else{
    clickCount+=1
  }
  
}
const startGame = document.querySelector('#newGame');
startGame.addEventListener('click',function(){startingProcess()});
// when the DOM loads

