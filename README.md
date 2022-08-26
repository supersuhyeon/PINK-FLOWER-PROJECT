## Mini Flower Garden Game

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/94214512/186960305-53721f91-b85b-4f99-8ec2-2446c965df9d.gif) <br>
This is a mini-game with a 5 second timer. To win, you must click on all 10 pink flowers before time is up. <br>
[Mini-flower-game](https://warm-granita-4598c8.netlify.app/)

### Goal of the project

1. Practice timer function
2. Arrange elements randomly in the field and utilizing event delegation

### Lauguages

HTML, CSS, JavaScript

### Features

![logic](https://user-images.githubusercontent.com/94214512/187000841-2dfe48be-84eb-4725-899f-1db8799bbd2c.png)

1. Timer function

```js
// game timer
function autoTimerStart() {
  let currentSec = gameDurationSec;
  updatetimertext(currentSec);
  timer = setInterval(() => {
    if (currentSec <= 0) {
      clearInterval(timer);
      finishGame(pinkFlowerCount === score);
      return;
    }
    updatetimertext(--currentSec);
  }, 1000);
}

function autoTimerStop() {
  clearInterval(timer);
}

function updatetimertext(sec) {
  const minutes = Math.floor(sec / 60); // 5s / 60 = 0
  const seconds = sec % 60; //5
  flowerTimer.innerText = `${minutes}:${seconds}`;
}
```

2. event delegation

```js
// game on the field
function fieldHandlerEvent(event) {
  if (!isstarted) {
    return;
  }
  const target = event.target;
  if (target.classList.contains("pinkflower")) {
    target.remove();
    score++;
    playSound(pinkflowerSound);
    remainingScoreBoard();

    if (score === pinkFlowerCount) {
      finishGame(true);
    }
  } else if (target.classList.contains("purpleflower")) {
    playSound(purpleflowerSound);
    finishGame(false);
  } else {
    finishGame(false);
  }
}
```

### Self-reflection

I always wanted to make a mini-game with only vanilla JavaScript.
At the beginning of this project, I felt a bit lost because I wasn't sure where to start. But when I started making the logic, drawing a diagram, and trying to bundle the functions for each case, it helped me a lot to code.
I also had some trouble with the timer function. At first it was difficult to set up and caused a lot of errors but I figured it out eventually.
I will continue to practice these skills in another project.
