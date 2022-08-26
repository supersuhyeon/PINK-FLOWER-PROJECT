//field variables
const field = document.querySelector('.flowergame_field')
const fieldSize = field.getBoundingClientRect();
const pinkFlowerCount = 10
const purpleFlowerCount = 10
const redFlowercount = 10

//flower + popup variables
const flowerPlayBtn = document.querySelector('.playbtn')
const flowerTimer = document.querySelector('.timer')
const flowerScore = document.querySelector('.score')
const popup = document.querySelector('.popup')
const replayBtn = document.querySelector('.popup_replybtn')
const popUpMessage = document.querySelector('.popup_message')

//others
const gameDurationSec = 5

//audio
const pinkflowerSound = new Audio('/sound/pinkflower_pull.mp3')
const purpleflowerSound = new Audio('/sound/purpleflower_pull.mp3')
const bgSound = new Audio('/sound/bg2.mp3')
const gameWin = new Audio('/sound/win.mp3')
const alertSound = new Audio('/sound/alert.wav')


//Game status
let isstarted = false; //initial value
let score = 0; 
let timer = '';

//Game Main Title
const h1El = document.querySelector('h1')
h1El.innerText = `GET THE ${pinkFlowerCount} PINK FLOWERS`


field.addEventListener('click', fieldHandlerEvent)

//game popup button
replayBtn.addEventListener('click', ()=>{
    gameStarted();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    hidePopUp();
})

//game start button
flowerPlayBtn.addEventListener('click',()=>{

    if (isstarted){
        gameStopped();
    }else{ 
        gameStarted(); 
    }

})

//1. when game started
function gameStarted(){ 
    isstarted = true; 
    initGame(); 
    changeStopBtn(); 
    showTimerandScoreBtn();
    autoTimerStart();
    playSound(bgSound);
}

//2. when game stopped 
function gameStopped(){
    isstarted = false; 
    autoTimerStop();
    playBtnGone();
    showPopUpReplay('you want to replay?');
    stopSound(bgSound)
    playSound(alertSound)                                                                  
}

//3. the result of game
function finishGame(result){
    isstarted = false;
    autoTimerStop();
    playBtnGone();
    stopSound(bgSound)
    if(result){  
        playSound(gameWin)
    }else{
        playSound(purpleflowerSound)
    }
    showPopUpReplay(result? 'YOU WON 😍' : 'YOU LOST 💩')
}

// game on the field
function fieldHandlerEvent(event){                      

    if(!isstarted){ 
        return
    }
    const target = event.target
    if(target.classList.contains('pinkflower')){
        target.remove();
        score++
        playSound(pinkflowerSound);
        remainingScoreBoard();

        if(score === pinkFlowerCount){
            finishGame(true)
        }
    }else if(target.classList.contains('purpleflower')){
        playSound(purpleflowerSound);
        finishGame(false);
    }else{
        finishGame(false)
    }

}

//pop up
function showPopUpReplay(text){
    popup.style.display = 'block'
    popUpMessage.innerText = text;
}

function hidePopUp(){
    popup.style.display = 'none'
}

// game timer
function autoTimerStart(){

    let currentSec = gameDurationSec
    updatetimertext(currentSec)
   timer = setInterval(()=>{

        if(currentSec<=0){
            clearInterval(timer)
            finishGame(pinkFlowerCount===score);
            return
        }
        updatetimertext(--currentSec)
   },1000) 

}

function autoTimerStop(){
    clearInterval(timer)
}

function updatetimertext(sec){
    const minutes = Math.floor(sec / 60) // 5s / 60 = 0
    const seconds = sec % 60 //5
    flowerTimer.innerText = `${minutes}:${seconds}`
}

// score board
function remainingScoreBoard(){
    flowerScore.innerText = pinkFlowerCount - score;
}


// game button 
function changeStopBtn(){
    const popupBtn = flowerPlayBtn.querySelector('.fa-solid')
    popupBtn.classList.remove('fa-play')
    popupBtn.classList.add('fa-stop')
    flowerPlayBtn.style.visibility = 'visible'
}

function playBtnGone(){
    flowerPlayBtn.style.visibility = 'hidden'
}

function showTimerandScoreBtn(){
    flowerTimer.style.visibility = 'visible';
    flowerScore.style.visibility = 'visible';
}

// game sound
function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause()
}

//game reset and new start
function initGame(){
    score=0 //reset
    field.innerHTML = ''; //reset
    flowerScore.innerText = pinkFlowerCount //reset
    //creat pink and purple flowers and appendchild to field
    addItem('pinkflower',pinkFlowerCount,'/img/pinkflower.png')
    addItem('purpleflower',purpleFlowerCount,'/img/purpleflower.png')
    addItem('redflower',redFlowercount,'/img/redflower.png')

}

function addItem(className,Count,imgSrc){

    //need to know field size for position
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldSize.width - 80; //flowersize width 80px
    const y2 = fieldSize.height - 80; //flowersize height 80px

    for (let i = 0; i < Count; i++){
        //each item need to be assigned on the position
        const item = document.createElement('img')
        item.setAttribute('class',className)
        item.setAttribute('src', imgSrc)
        item.style.position = 'absolute' //field must have relative on css
        item.style.top = `${randomNumber(y1,y2)}px`
        item.style.left = `${randomNumber(x1,x2)}px`

        field.appendChild(item)
    }


}

function randomNumber(min,max){
    return Math.floor(Math.random() * (max - min)) + min; 
}

