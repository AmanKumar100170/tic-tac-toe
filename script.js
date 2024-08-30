document.addEventListener('DOMContentLoaded', () => {
    const info = document.querySelector('.info');
    const gameBoard = document.querySelector('.game-board');
    const startContainer = document.querySelector('.start-container');

    let player1;
    let player2;
    const cellSize = 150;
    let gameStarted = false;
    let Oarray = [];
    let Xarray = [];
    let turn = 0;       // 0 -> player 1, 1 -> player 2

    function isPresent(x, y, player){
        if (player == 'O'){
            for (const item of Oarray){
                if (item.x === x && item.y === y) return true;
            }
            return false;
        }
        else{
            for (const item of Xarray){
                if (item.x === x && item.y === y) return true;
            }
            return false;
        }
    }

    function gameOver(x, y){
        if (turn == 0){ 
            if (player1 == 'O'){    
                let win = false;
                // row check
                win = (isPresent(0, y, 'O') && isPresent(1, y, 'O') && isPresent(2, y, 'O'));
                if (win) return true;

                // column check
                win = (isPresent(x, 0, 'O') && isPresent(x, 1, 'O') && isPresent(x, 2, 'O'));
                if (win) return true;

                // left diagonal check
                win = (isPresent(0, 0, 'O') && isPresent(1, 1, 'O') && isPresent(2, 2, 'O'));
                if (win) return true;

                // right diagonal check
                win = (isPresent(2, 0, 'O') && isPresent(1, 1, 'O') && isPresent(0, 2, 'O'));
                if (win) return true;
            }
            else{
                let win = false;
                // row check
                win = (isPresent(0, y, 'X') && isPresent(1, y, 'X') && isPresent(2, y, 'X'));
                if (win) return true;

                // column check
                win = (isPresent(x, 0, 'X') && isPresent(x, 1, 'X') && isPresent(x, 2, 'X'));
                if (win) return true;

                // left diagonal check
                win = (isPresent(0, 0, 'X') && isPresent(1, 1, 'X') && isPresent(2, 2, 'X'));
                if (win) return true;

                // right diagonal check
                win = (isPresent(2, 0, 'X') && isPresent(1, 1, 'X') && isPresent(0, 2, 'X'));
                if (win) return true;
            }
        }
        else{
            if (player2 == 'O'){
                let win = false;
                // row check
                win = (isPresent(0, y, 'O') && isPresent(1, y, 'O') && isPresent(2, y, 'O'));
                if (win) return true;

                // column check
                win = (isPresent(x, 0, 'O') && isPresent(x, 1, 'O') && isPresent(x, 2, 'O'));
                if (win) return true;

                // left diagonal check
                win = (isPresent(0, 0, 'O') && isPresent(1, 1, 'O') && isPresent(2, 2, 'O'));
                if (win) return true;

                // right diagonal check
                win = (isPresent(2, 0, 'O') && isPresent(1, 1, 'O') && isPresent(0, 2, 'O'));
                if (win) return true;
            }
            else{
                let win = false;
                // row check
                win = (isPresent(0, y, 'X') && isPresent(1, y, 'X') && isPresent(2, y, 'X'));
                if (win) return true;

                // column check
                win = (isPresent(x, 0, 'X') && isPresent(x, 1, 'X') && isPresent(x, 2, 'X'));
                if (win) return true;

                // left diagonal check
                win = (isPresent(0, 0, 'X') && isPresent(1, 1, 'X') && isPresent(2, 2, 'X'));
                if (win) return true;

                // right diagonal check
                win = (isPresent(2, 0, 'X') && isPresent(1, 1, 'X') && isPresent(0, 2, 'X'));
                if (win) return true;
            }
        }
    }

    function draw(x, y){
        const ele = document.createElement('div');
        ele.classList.add('box');
        ele.style.height = '150px';
        ele.style.width = '150px';
        if (turn == 0){
            if (player1 == 'O'){
                ele.textContent = 'O';
            }
            else{
                ele.textContent = 'X';
            }
        }
        else{
            if (player2 == 'O'){
                ele.textContent = 'O';
            }
            else{
                ele.textContent = 'X';
            }
        }

        ele.style.left = `${x*cellSize + x*10}px`;
        ele.style.top = `${y*cellSize + y*10}px`;
        gameBoard.appendChild(ele);
    }

    function markTurn(x, y){
        if (turn == 0){
            if (player1 == 'O'){
                Oarray.push({x, y});
            }
            else{
                Xarray.push({x, y});
            }
        }
        else{
            if (player2 == 'O'){
                Oarray.push({x, y});
            }
            else{
                Xarray.push({x, y});
            }
        }
    }

    function gameFinished(){
        Oarray = [];
        Xarray = [];
        turn = 0;
        
        gameStarted = false;
        gameBoard.removeEventListener('click', start);
        gameStarting();
        return;
    }

    function start(e){
        y = Math.floor(e.offsetY / cellSize);
        x = Math.floor(e.offsetX / cellSize);
        
        if ((!e.target.classList.contains('grid-line')) && !(e.target.classList.contains('box')) && (x < 3 && y < 3)){
            markTurn(x, y);
            draw(x, y);
            if(gameOver(x, y)){
                info.innerHTML = `<h1>Player ${turn+1} WON!</h1>`;
                gameFinished();
                return;
            };

            // game draw
            if (Oarray.length + Xarray.length == 9){
                info.innerHTML = `<h1>Game Drawn!</h1>`;
                gameFinished();
                return;
            }
            turn = !turn;
            info.innerHTML = `<h1>Player ${turn+1}'s turn</h1>`;
        }
    }

    function runGame(){
        info.innerHTML = `<h1>Player ${turn+1}'s turn</h1>`;
        gameBoard.addEventListener('click', start);
    }

    function initiateGame(){
        for (let child = gameBoard.children.length - 1; child >= 0; child--){
            if (gameBoard.children[child].classList.contains('box')){
                console.log(gameBoard.children[child]);
                gameBoard.children[child].remove();
            }
        }
        startContainer.innerHTML = '';
        info.innerHTML = `<h1>Player ${turn+1}'s turn</h1>`;

        const choice = document.createElement('div');
        choice.innerHTML = `Player 1's choice: <button id="o-btn">O</button><button id="x-btn">X</button>`;
        startContainer.appendChild(choice);

        document.getElementById('o-btn').addEventListener('click', () => {
            player1 = 'O';
            player2 = 'X';
            startContainer.style.display = 'none';
            runGame();
        })

        document.getElementById('x-btn').addEventListener('click', () => {
            player1 = 'X';
            player2 = 'O';
            startContainer.style.display = 'none';
            runGame();
        })
    }

    function gameStarting(){
        if (!gameStarted){
            startContainer.style.display = 'block';
            startContainer.innerHTML = '';
            gameStarted = true;

            const btn = document.createElement('button');
            btn.classList.add('start-button');
            btn.textContent = 'Start Game';
            startContainer.appendChild(btn);
            btn.addEventListener('click', initiateGame);
        }
    }

    gameStarting();

})

