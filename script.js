document.addEventListener('DOMContentLoaded', () => {
    const apologyContent = document.getElementById('apology');
    const thankContent = document.getElementById('if_okay');
    const playGameContent = document.getElementById('game');
    const ifLoseContent = document.getElementById('if_lose');
    const ifWinContent = document.getElementById('if_win');
    const playGameBtn = document.getElementById('playGameBtn');
    const forgiveBtn = document.getElementById('forgiveBtn');
    const board = document.getElementById('board');
    const status = document.getElementById('status');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Initialize the game board dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Show the apology content and hide the game content
    const showApologyContent = () => {
        thankContent.classList.remove('hidden');
        apologyContent.classList.add('hidden');
    };

    // Show the game content and hide the apology content
    const showGameContent = () => {
        playGameContent.classList.remove('hidden');
        apologyContent.classList.add('hidden');
        resetGame();
    };

    // Handle cell click for the game
    const handleCellClick = (index) => {
        if (!gameActive || boardState[index] !== '') return;

        boardState[index] = currentPlayer;
        renderBoard();
        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            makeComputerMove();
        }
    };

    // Make a move for the computer
    const makeComputerMove = () => {
        const emptyCells = boardState.reduce((acc, cell, index) => {
            if (cell === '') {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];
        
        boardState[computerMove] = currentPlayer;
        renderBoard();
        checkWinner();
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    // Render the game board
    const renderBoard = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = boardState[index];
        });

        status.textContent = gameActive ? `Ход: ${currentPlayer}` : `Победитель: ${currentPlayer}`;
    };

    // Check for a winner
    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                status.textContent = `Победитель: ${currentPlayer}`;
                if (currentPlayer === 'O') {
                    ifLoseContent.classList.remove('hidden');
                } else if (currentPlayer === 'X') {
                    ifWinContent.classList.remove('hidden');
                }
                return;
            }
        }

        if (!boardState.includes('')) {
            gameActive = false;
            status.textContent = 'Ничья!';
        }
    };

    // Restart the game
    const resetGame = () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        renderBoard();
    };

    // Event listeners for the buttons
    playGameBtn.addEventListener('click', showGameContent);
    forgiveBtn.addEventListener('click', showApologyContent);
});
