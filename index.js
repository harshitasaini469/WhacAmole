const squares = document.querySelectorAll('.square');
const mole = document.querySelector('mole')
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const start = document.getElementById('start-game')

let result = 0;
let hitPosition = 0
let currentTime = 60;
let timerId = null;
let countDownTimeId = null;


function randomeSquare() {
    squares.forEach(square => {
        square.classList.remove('mole') // gets each square and remove the mole class
    })

    let randomeSquare = squares[Math.floor(Math.random() * 9)] // getting a random square
    randomeSquare.classList.add('mole') // adding mole class to the random square we got

    hitPosition = randomeSquare.id
}

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id === hitPosition) {
            result++;
            console.log(result);
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function moveMole() { // calling random square function at regular interval to move mole
    timerId = setInterval(randomeSquare, 500)
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimeId)
        clearInterval(timerId)
        alert(`GAME OVER!\nYOUR SCORE IS ${result}`)
        start.innerHTML = 'Restart'
        start.addEventListener('click', restart)


    }
}


function startGame() {
    moveMole();
    countDownTimeId = setInterval(countDown, 1000)

}

function restart() {
    timeLeft.innerHTML = '60';
    score.innerHTML = '0'
    startGame();
}

start.addEventListener('click', startGame)