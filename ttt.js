const squares = document.querySelectorAll('.square');
const turnAnnouncer = document.getElementById('turn');
const gameOverArea = document.getElementById('game-over');
const gameOverText = document.getElementById('game-over-text');
const reset = document.getElementById('reset');

const player_x = 'X';
const player_o = 'O';


let turn = player_x;

const boardState = Array(squares.length);
boardState.fill(null);
reset.addEventListener('click', resetGame);

squares.forEach(square=>square.addEventListener('click', squareClick));

function setHoverText() {
    squares.forEach(square=>{
        square.classList.remove('x-hover');
        square.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    squares.forEach(square=>{
        if(square.innerText == ''){
            square.classList.add(hoverClass);
        }
    });
}

setHoverText();

function squareClick(action) {
    if(gameOverArea.classList.contains('visible')){
        return;
    }

    const square = action.target
    const squareNumber = square.dataset.index;
    if(square.innerText != '') {
        return;
    }
    
    if (turn === player_x){
        square.innerText = player_x;
        boardState[squareNumber-1] = player_x;
        turn = player_o;
        turnAnnouncer.innerText = "O's Turn";
    }
    else {
            square.innerText = player_o;
            boardState[squareNumber-1] = player_o;
            turn = player_x;
            turnAnnouncer.innerText = "X's Turn";
    }
    setHoverText();
    checkWinner();
}

function checkWinner(){
    for(const winningScenario of winningScenarios) {
        const combo = winningScenario.combo;
        const squareValue1 = boardState[combo[0]-1];
        const squareValue2 = boardState[combo[1]-1];
        const squareValue3 = boardState[combo[2]-1];

        if(squareValue1 != null && squareValue1 === squareValue2 && squareValue1 === squareValue3){
            gameOverScreen(squareValue1);
            return;
        }
    }

const allSquareFilledIn = boardState.every((square)=> square !== null);
if(allSquareFilledIn) {
    gameOverScreen(null);
}
}

function gameOverScreen(winnerText) {
    let text = 'Draw!';
    if(winnerText !=null) {
        text = `Winner is ${winnerText}!`;
    }
    gameOverArea.className = 'visible';
    gameOverText.innerText = text;
    turnAnnouncer.className = 'hidden';
}

function resetGame() {
    gameOverArea.className = 'hidden';
    turnAnnouncer.className = 'visible';
    turnAnnouncer.innerText = "X's Turn";
    boardState.fill(null);
    squares.forEach((square) => (square.innerText = ''));
    turn = player_x
    setHoverText();
}

const winningScenarios = [
    { combo: [1,2,3] },
    { combo: [4,5,6] },
    { combo: [7,8,9] },
    { combo: [1,4,7] },
    { combo: [2,5,8] },
    { combo: [3,6,9] },
    { combo: [1,5,9] },
    { combo: [3,5,7] },
];