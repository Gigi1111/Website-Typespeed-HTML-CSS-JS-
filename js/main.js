//gglobals
//available levels
//.split(/[\s,]+/)
const wordInput = document.querySelector('.startTyping');
const timeDisplay = document.querySelector('.countDown');
const wm = document.querySelector('.wmCount');
const cm = document.querySelector('.cmCount');
const acc = document.querySelector('.accCount');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const end = document.querySelector('.end');
const sample = document.querySelector('.sampleWords');
const typed = document.querySelector('.typedWords');

let resume = document.querySelector('.resume');
let time = 60;
let gameStatus;
let key;
let c = 0;
let notWrong;
let newCount = true;
window.addEventListener('load', init);

const words = "The wind roars up the avenue. Trees stoop and bend this way and that. Moonbeams splash and spill wildly in the rain. But the beam of the lamp falls straight from the window. The candle burns stiff and still. Wandering through the house, opening the windows, whispering not to wake us, the ghostly couple seek their joy."
console.log(words);
//initialize game
function init() {
  //show number of seconds in ui
  timeDisplay.innerHTML = 60;
  gameStatus = 0; //haven't started
  time = 60;
  c = 0;
  notWrong = true
  //start matching on word Input
  for (i = 1, sample.innerHTML = words[0]; i < words.length; i++) {
    sample.innerHTML = sample.innerHTML.concat('&nbsp' + words[i]);
  }
  wordInput.onkeydown = function() {
    key = event.keyCode || event.charCode;


  };
  wordInput.addEventListener('input', startMatch);
  //  start.addEventListener('click', startType);
  pause.addEventListener('click', pauseMatch);
  resume.addEventListener('click', resumeMatch);
  pause.disabled = true;
  end.disabled = true;
  resume.disabled = true;

  //  wordInput.addEventListener('input', startType);
  //count down every seconds
  //check game status
}

function startType() {

  pause.disabled = false;
  end.disabled = false;
  gameStatus = 1;
  start.style.display = "none";

  wordInput.addEventListener('input', startMatch);

}

function startMatch() {
  if (newCount) {
    gameStatus = 1;
    setInterval(countdown, 1000);

    newCount = false;
  }
  console.log(c);
  console.log(typed.innerHTML);
  console.log(wordInput.value[c]);
  console.log(sample.innerHTML[0]);


  if (wordInput.value[c] === sample.innerHTML[0] && notWrong > 0) {
    typed.innerHTML = typed.innerHTML.concat(sample.innerHTML.substr(0, 1));
    sample.innerHTML = sample.innerHTML.substr(1, sample.innerHTML.length - 1);
    c++;
  } else if (wordInput.value[c] === ' ' && sample.innerHTML[0] === '&' && notWrong > 0) {
    typed.innerHTML = typed.innerHTML.concat(sample.innerHTML.substr(0, 6));
    sample.innerHTML = sample.innerHTML.substr(6, sample.innerHTML.length - 6);
    c++;
  } else if ((key == 8 || key == 46) && notWrong > 0) {
    if (typed.innerHTML.slice(-1) !== ';') {
      sample.innerHTML = typed.innerHTML.slice(-1) + sample.innerHTML;
      typed.innerHTML = typed.innerHTML.substr(0, typed.innerHTML.length - 1);
      c--;
    } else {
      //if you want to back space
      sample.innerHTML = '&nbsp;' + sample.innerHTML;
      typed.innerHTML = typed.innerHTML.substr(0, typed.innerHTML.length - 6);
      c--;
    }
  } else if ((key == 8 || key == 46) && notWrong < 1) {

    typed.innerHTML = typed.innerHTML.substr(0, typed.innerHTML.length - 1);
    notWrong++;

    console.log(notWrong);
    c--;
  } else {
    //just wrong
    notWrong--;
    console.log(notWrong);
    typed.innerHTML = typed.innerHTML.concat(wordInput.value[c]);
    c++;

  }

}


function pauseMatch() {
  gameStatus = 0;
  pause.style.display = "none";
  resume.style.display = "block";
  resume.disabled = false;
}

function resumeMatch() {
  gameStatus = 1;
  pause.style.display = "block";
  resume.style.display = "none";
}

function countdown() {
  //make sure time is not run output
  if (gameStatus) {
    if (time > 0) {
      time--;
    } else if (time === 0) {
      //game revolver
      //no longer playing
      gameStatus = 'Game Over';
      result();
      return true;
    }
    //show time
    timeDisplay.innerHTML = time;
  }
}
function result(){
  console.log('gg');
  cm.innerHTML=typed.innerHTML.length;
    console.log(typed.innerHTML.length);

 let str= typed.innerHTML.split("&nbsp;");

wm.innerHTML=str.length;
  console.log(typed.innerHTML.split("&nbsp;"));
    console.log(wm.innerHTML);
acc.innerHTML=100;
return true;

}
