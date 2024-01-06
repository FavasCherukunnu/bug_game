let topB = 0, leftB = 0, bottomB = 0;
const step = 57;
const boxHeight = 42
const boxWidth = 42
const boxRef = document.getElementById('box')
let rotation = 90;



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
    if (topB < 0) {
        topB = 0
    }

    boxRef.style.left = (leftB + 'px')
    boxRef.style.top = (topB + 'px')
    boxRef.style.transform = `rotate(${rotation}deg)`


}


let lefTimer, rightTimer, topTimer, bottomTimer;
let statusTimer
const controllKeystatus = {}

function isAnyControllKeyPressed() {
    for (const key in controllKeystatus) {
        if (controllKeystatus[key]) {
            return true
        }
    }

    return false
}


document.addEventListener('keydown', function (event) {
    
    if (isAnyControllKeyPressed()) {
        switch (event.code) {
            case 'ArrowUp':
                if (!topTimer) {
                    topTimer = setInterval(
                        () => moveTo('top'),
                        50
                    )
                }
                break;
            case 'ArrowRight':
                if (!rightTimer) {
                    rightTimer = setInterval(
                        () => moveTo('right'),
                        50
                    )
                }
                break;
            case 'ArrowLeft':
                if (!lefTimer) {
                    lefTimer = setInterval(
                        () => moveTo('left'),
                        50
                    )
                }
                break;
            case 'ArrowDown':
                if (!bottomTimer) {
                    bottomTimer = setInterval(
                        () => moveTo('bottom'),
                        50
                    )
                }
                break;
            // Add more cases if needed for other keys
        }
    } else {
        switch (event.code) {
            case 'ArrowUp':
                moveTo('top')
                break;
            case 'ArrowRight':
                moveTo('right')
                break;
            case 'ArrowLeft':
                moveTo('left')
                break;
            case 'ArrowDown':
                moveTo('bottom')
                break;
            // Add more cases if needed for other keys
        }
    }
    controllKeystatus[event.code] = true

});

document.addEventListener('keyup', function (event) {
    clearTimeout(statusTimer)
    statusTimer =  setTimeout(
        ()=>{controllKeystatus[event.code] = false},
        300
    )
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


window.addEventListener('resize', moveTo)