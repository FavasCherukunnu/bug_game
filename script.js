const step = 57;
const boxHeight = 42
const boxWidth = 42
const foodwidth = 30;
const foodHeight = 30;
const boxRef = document.getElementById('box')
const topSection = document.getElementById('topSection');
const playGround = document.getElementById('playGround');
const secondElement = document.getElementById('second');
const errorToast = document.getElementById('errorMessage')
let second = 5
boxRef.style.top = (topSection.offsetHeight + 'px')
let topB = topSection.offsetHeight, leftB = 0;
let rotation = 90;
let score = 0;
let secondstep = 5;
let gameStarted = false
secondElement.innerHTML = second;


const food = document.createElement('div')
food.classList.add('bug_food')
food.id = 'food'
document.body.appendChild(food)


function rotateBug(step) {

    if (rotation % 360 !== step) {
        const currentAngle = rotation % 360;
        let diff = step - currentAngle;
        if (diff > 90 || diff < -90) {
            if (diff < 0) {
                diff = 360 + diff
            } else {
                diff = diff - 360
            }
        }
        rotation += diff
    }

}


function moveTo(diretion) {
    switch (diretion) {
        case 'right':
            leftB += step
            rotateBug(90)
            break
        case 'left':
            leftB -= step
            rotateBug(270)
            break
        case 'top':
            topB -= step
            rotateBug(0)
            break
        case 'bottom':
            topB += step
            rotateBug(180)
            break

    }

    if (leftB >= window.innerWidth - boxWidth) {
        leftB = window.innerWidth - boxWidth
    }
    if (topB >= window.innerHeight - boxHeight) {
        topB = window.innerHeight - boxHeight
    }
    if (leftB < 0) {
        leftB = 0
    }
    if (topB < topSection.offsetHeight) {
        topB = topSection.offsetHeight
    }



    boxRef.style.left = (leftB + 'px')
    boxRef.style.top = (topB + 'px')
    boxRef.style.transform = `rotate(${rotation}deg)`


}


let lefTimer, rightTimer, topTimer, bottomTimer;
let statusTimer, holdedTimout
let controllKeystatus = {}

function isAnyControllKeyPressed() {
    for (const key in controllKeystatus) {
        if (controllKeystatus[key]) {
            return true
        }
    }

    return false
}




document.addEventListener('keydown', function (event) {
    // clearTimeout(statusTimer)

    controllKeystatus[event.code] = true
    if (controllKeystatus['ArrowUp']) {
        if (!topTimer) {
            topTimer = setInterval(
                () => moveTo('top'),
                50
            )
        }
    }
    if (controllKeystatus['ArrowRight']) {
        if (!rightTimer) {
            rightTimer = setInterval(
                () => moveTo('right'),
                50
            )
        }
    }
    if (controllKeystatus['ArrowLeft']) {
        if (!lefTimer) {
            lefTimer = setInterval(
                () => moveTo('left'),
                50
            )
        }
    }
    if (controllKeystatus['ArrowDown']) {
        if (!bottomTimer) {
            bottomTimer = setInterval(
                () => moveTo('bottom'),
                50
            )
        }
    }
    // Add more cases if needed for other keys


});

document.addEventListener('keyup', function (event) {
    // clearTimeout(statusTimer)
    controllKeystatus[event.code] = false

    switch (event.code) {
        case 'ArrowUp':
            clearInterval(topTimer)
            topTimer = undefined
            break;
        case 'ArrowRight':
            clearInterval(rightTimer)
            rightTimer = undefined
            break;
        case 'ArrowLeft':
            clearInterval(lefTimer)
            lefTimer = undefined
            break;
        case 'ArrowDown':
            clearInterval(bottomTimer)
            bottomTimer = undefined
            break;
        // Add more cases if needed for other keys
    }
});


//food

let foodTimer;
var foodLeft = window.innerWidth / 2;
var foodTop = window.innerHeight / 2;


function showBuggInRandom() {
    var min = 1;
    var minH = topSection.offsetHeight;
    var maxW = window.innerWidth - 30;
    var maxH = window.innerHeight - 30;
    foodLeft = Math.floor(Math.random() * (maxW - min + 1)) + min;
    foodTop = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
    const food = document.getElementById('food');
    food.style.transitionProperty = 'opacity'
    food.style.visibility = 'visible'
    food.style.left = (foodLeft + 'px')
    food.style.top = (foodTop + 'px')
    food.style.transitionProperty = 'opacity, transform'

    food.style.transform = 'scale(1)'
}



function displayBugg(timeout) {

    clearInterval(foodTimer)

    foodTimer = setInterval(
        showBuggInRandom, timeout
    )

}


function disAppearBugg() {
    foodLeft = -1000;
    foodTop = -1000;
    const food = document.getElementById('food');
    food.style.transitionProperty = 'opacity, transform';
    food.style.transform = 'scale(0)';
    // food.style.visibility = 'hidden';
}



const positionTimer =  setInterval(
    () => {
        //check food eaten
        const foodRight = foodLeft + foodwidth;
        const foodBottom = foodTop + foodHeight;
        const bottomB = topB + boxHeight;
        const rightB = leftB + boxWidth;

        if ((topB < foodTop && leftB < foodLeft && bottomB > foodTop && rightB > foodLeft) || (topB < foodTop && bottomB > foodTop && rightB > foodRight && leftB < foodRight) || (topB < foodBottom && bottomB > foodBottom && rightB > foodLeft && leftB < foodLeft) || (topB < foodBottom && bottomB > foodBottom && rightB > foodRight && leftB < foodRight)) {
            if (gameStarted === false) {
                startTimer()
            }
            gameStarted = true;

            disAppearBugg()
            setTimeout(
                showBuggInRandom, 500
            )
            displayBugg(5000)
            score++;
            second += secondstep
            secondElement.innerHTML = second
            document.getElementById('score').innerHTML = score

        }


        // console.log(boxRef.offsetLeft, boxRef.offsetTop)
    }, 1
)

let secondDuration = 1000
//time
let secondTimer;

function startTimer() {

    secondTimer = setTimeout(
        () => {
            if (second <= 0) {
                gameStarted = false;
                clearInterval(positionTimer)
                clearInterval(foodTimer)
                errorToast.style.zIndex = 50;
                errorToast.style.transition = '1s all'
                errorToast.style.transform = 'scale(1)'
            }
            if (gameStarted) {
                second--;
                secondElement.innerHTML = second
                startTimer()
            }

        }, secondDuration
    )

}


//dicreaseTime
setInterval(
    () => {
        if (secondDuration > 300)
            secondDuration -= 50;
        else
            secondDuration = 300

    }, 10000
)

//Error element



window.addEventListener('resize', moveTo)