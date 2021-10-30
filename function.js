const targetButton = document.querySelector('.target-button');
const cube = document.querySelector('.cube');
const rollBtn = document.querySelector('.roll');
const newBtn = document.querySelector('.new');
const holdBtn = document.querySelector('.hold');
const targetScore = document.getElementById('target');
let target = 20;
let currentClass = ''; //for cube
let wrapperClass = '.wrapper-1';



function start() {
    const scores = document.querySelectorAll('.score')
    scores.forEach(score=> score.innerText = 0)
}

function roll() {
    let randNum = rollDice()
    const currentScore = document.querySelector(`${wrapperClass} .current .score`)
    if(randNum != 1) {
        let current = parseInt(currentScore.innerText)
        current += randNum
        currentScore.innerText = current
    } else {
        currentScore.innerText = 0
        hold()
    }
}

function hold() {
    const currentScore = document.querySelector(`${wrapperClass} .current .score`)
    const totalScore = document.querySelector(`${wrapperClass} .total .score`)
    toggle()
    let score = parseInt(totalScore.innerText)
    score  += parseInt(currentScore.innerText)
    currentScore.innerText = 0
    totalScore.innerText = score
    if(score >= target){
        let player = wrapperClass.charAt(wrapperClass.length-1)
        openModal(player)
        start()
    }
}

function rollDice() {
 let randNum =getRandomInt(1,7)
  let showClass = 'show-' + randNum;
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;
  return randNum;
}



function toggle() {
  const wrappers = document.querySelectorAll('.wrapper')
  wrappers.forEach(wrapper => wrapper.classList.toggle('opacity'))
  if (wrapperClass == '.wrapper-1'){
    wrapperClass = '.wrapper-2'
  } else {
    wrapperClass = '.wrapper-1'
  }
}



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

rollBtn.addEventListener("click", roll);
holdBtn.addEventListener("click", hold);
newBtn.addEventListener('click',start);


//Modal
let modal = document.getElementById("myModal");
let p = document.querySelector('#myModal p');
let span = document.getElementsByClassName("close")[0];

function openModal(player) {
  modal.style.display = "block";
  p.innerText = `Player${player-1 == 0 ? 2 : player-1} Wins`
}

span.onclick = function() {
  modal.style.display = "none";
}

//Target Modal
targetFunction = () => {
  targetScore.innerText = document.getElementById("target-score").value || 20
  target = parseInt(targetScore.innerText)
  document.getElementById('targetModal').style.display = 'none';
}

targetButton.addEventListener('click',targetFunction);