//field variables
const field = document.querySelector('.flowergame_field')
const fieldSize = field.getBoundingClientRect();
const pinkflowerCount = 5

//flower main variables
const flowerPlayBtn = document.querySelector('.playbtn')
const flowerTimer = document.querySelector('.timer')
const flowerScore = document.querySelector('.score')
const popup = document.querySelector('.popup')
const replayBtn = document.querySelector('.popup_replybtn')
const popUpMessage = document.querySelector('.popup_message')

//Side variables
const gameDurationSec = 5

//audio
const pinkflowerSound = new Audio('/sound/pinkflower_pull.mp3')
const purpleflowerSound = new Audio('/sound/purpleflower_pull.mp3')
const bgSound = new Audio('/sound/bg2.mp3')
const gameWin = new Audio('/sound/win.mp3')
const alertSound = new Audio('/sound/alert.wav')


//게임의 상태를 알고있어야할 변수
let isstarted = false; //whether game started or not
let score = 0; //점수 담을 공간
let timer = ''; //timer 담을 공간

field.addEventListener('click', FieldHandlerEvent)

replayBtn.addEventListener('click', ()=>{
    gameStarted();
    hidePopUp();
})

flowerPlayBtn.addEventListener('click',()=>{
    console.log('working!!')

    //total 2 functions needed to be called

    if (isstarted){
        gameStopped(); //게임도중에 눌렀으면?
    }else{ 
        gameStarted(); //첫게임시작전 초기화면은?
    }

    // isstarted = !isstarted

})

//when game started, when gamestopped make each function
//1)게임시작전 초기화면
function gameStarted(){ 
    isstarted = true;
    initGame();
    playBtnGone();
    changeStopBtn();
    showTimerandScoreBtn();
    autoTimerStart();
    playSound(bgSound);
    
}

//2)게임도중에 눌렀으면?
function gameStopped(){
    isstarted = false;
    autoTimerStop();
    showPopUpReplay('replay?');
    stopSound(bgSound)
}

function finishgame(result){
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

function stopSound(sound){
    sound.pause()
}

function FieldHandlerEvent(event){
    console.log(event)

    if(!isstarted){
        return
    }

    const target = event.target
    if(target.classList.contains('pinkflower')){
        target.remove();
        score++
        playSound(pinkflowerSound);
        remainingScoreBoard();

        if(score === pinkflowerCount){
            
            finishgame(true)
        }


    }else if(target.classList.contains('purpleflower')){
        playSound(purpleflowerSound);
        finishgame(false);
    }

   
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function remainingScoreBoard(){
    flowerScore.innerText = pinkflowerCount - score;
}


function showPopUpReplay(text){
    popup.style.display = 'block'
    popUpMessage.innerText = text;

}

function hidePopUp(){
    popup.style.display = 'none'
}


function autoTimerStart(){

    let currentSec = gameDurationSec
    updatetimertext(currentSec)
   //const myInterval = setInterval(myFunction,2000); clearInterval(myInterval)
   timer = setInterval(()=>{

        if(currentSec<=0){
            clearInterval(timer)
            finishgame(pinkflowerCount===score);
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


function showTimerandScoreBtn(){
    flowerTimer.style.visibility = 'visible';
    flowerScore.style.visibility = 'visible';
    

}

function changeStopBtn(){
    const popupBtn = flowerPlayBtn.querySelector('.fa-solid')
    popupBtn.classList.remove('fa-play')
    popupBtn.classList.add('fa-stop')
    flowerPlayBtn.style.visibility = 'visible'
    
}

function playBtnGone(){
    flowerPlayBtn.style.visibility = 'hidden'
}


function initGame(){
    score=0 //reset
    field.innerHTML = ''; //reset
    flowerScore.innerText = pinkflowerCount //reset
    //creat pink and purple flowers and appendchild to field

    addItem('pinkflower',pinkflowerCount,'/img/pinkflower.png')
    addItem('purpleflower',20,'/img/purpleflower.png')

}

function addItem(className,Count,imgSrc){

    //need to know field size for position
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldSize.width - 80; //flowersize width 80px
    const y2 = fieldSize.height - 80; //flowersize height 80px

    for (i = 0; i < Count; i++){
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

