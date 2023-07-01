const Game = (() => {

    let playerOneName = 'Jack';
    let playerTwoName = 'Shrek';

    const GameBoard = {
        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],

        player: [
            {
                name: playerOneName,
                number: 1
            },
            {
                name: playerTwoName,
                number: 2
            }
        ]
    }

    let activePlayer = GameBoard.player[0];

    function drawMark (row, column) {
        if(activePlayer.number === 1){
            GameBoard.board[row][column] = 'X';
            checkWinner();
            /* switchPlayer(); */
        }
        else {
            GameBoard.board[row][column] = 'O';
            checkWinner();
            /* switchPlayer(); */
        }
    
        console.table(GameBoard.board);
    }
    
    function switchPlayer() {
        console.log("Switching...")
        if (activePlayer === GameBoard.player[0]) {
            activePlayer = GameBoard.player[1];
            console.log(activePlayer);
        }
        else if (activePlayer === GameBoard.player[1]) {
            activePlayer = GameBoard.player[0];
            console.log(activePlayer);
        }
    }    

    function checkWinner() {
        //rows
        for (i=0; i <= 2; i++) {
            if (GameBoard.board[i][0] === 'X' && GameBoard.board[i][1] === 'X' && GameBoard.board[i][2] === 'X') {
                alert('Player X Wins! With a row')
            }
        }
        //columns
        for (i=0; i <= 2; i++) {
            if (GameBoard.board[0][i] === 'X' && GameBoard.board[1][i] === 'X' && GameBoard.board[2][i] === 'X') {
                alert('Player X Wins! With a column')
            }
        }
        //diagonals

        if (GameBoard.board[0][0] === 'X' && GameBoard.board[1][1] === 'X' && GameBoard.board[2][2] === 'X') {
            alert('Player X Wins! With FIRST diagonal')
        }
        else if (GameBoard.board[0][2] === 'X' && GameBoard.board[1][1] === 'X' && GameBoard.board[2][0] === 'X') {
            alert('Player X Wins! With SECOND diagonal')
        }

    }

    return {drawMark};
})();



