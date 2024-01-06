let topB = 0, leftB = 0, bottomB = 0;
const step = 57 ;
const boxHeight = 42
const boxWidth = 42
const boxRef = document.getElementById('box')




function moveTo(diretion) {
    switch (diretion) {
        case 'right':
            leftB += step
            boxRef.style.transform = 'rotate(90deg)'
            break
        case 'left':
            leftB -= step
            boxRef.style.transform = 'rotate(-90deg)'
            break
        case 'top':
            topB -= step
            boxRef.style.transform = 'rotate(0deg)'
            break
        case 'bottom':
            topB += step
            boxRef.style.transform = 'rotate(180deg)'
            break

    }

    if(leftB>=window.innerWidth-boxWidth){
        leftB =window.innerWidth-boxWidth
    }
    if(topB>=window.innerHeight-boxHeight){
        topB =window.innerHeight-boxHeight
    }
    if(leftB<0){
        leftB=0
    }
    if(topB<0){
        topB=0
    }

    boxRef.style.left = (leftB + 'px')
    boxRef.style.top = (topB + 'px')

    
}

window.addEventListener('resize',moveTo)