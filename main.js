// buat papan untuk tempat main menggunakan array kosong (gameboard)

const gameboard = (() => {
    // const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
    const board = Array(9).fill("")
    console.log('Game Start')

    const getBoard = () =>  board
    
    const placeMarker = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker
            return true
        }

        return false
    }

    const resetBoard = () => {
        board.forEach((_, index) => {
            board[index] = ""
        })
    }

    return { getBoard, placeMarker, resetBoard }

})()

// buat factory function untuk create user

function createPlayer(name, marker) {
    return { name, marker }
}

const players = [
    createPlayer('alfario', 'X'),
    createPlayer('putra', 'O')
]

// buat logit wasit untuk menentukan pemenang 

const winningCombinations = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const gameController = (() => {

    let currentPlayer = players[0]
    let gameOver = false

    function  getCurrentMarker() {
        return currentPlayer.marker
    }
    
    function switchPlayer() {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
        } else {
            currentPlayer = players[0]          
        }
    }
    
    function playRound(index) {
        if (gameOver) {
            return
        }

        const placed = gameboard.placeMarker(index, currentPlayer.marker)
        
        if (!placed) {
            console.log('Kotak sudah terisi.')
            return
        }

        const winner = checkWinner()

        if (winner) {
            console.log(`Selamat! ${winner} menang`)
            gameOver = true
            return
        }

        const draw = checkDraw()
        
        if(draw) {
            console.log('Seri! semua kotak terisi penuh')
            gameOver = true
            return
        }

        switchPlayer()
    }
    
    function checkWinner() {
        const board = gameboard.getBoard()   
        
        for (const combination of winningCombinations) {
            const first = board[combination[0]]
            const second = board[combination[1]]
            const third = board[combination[2]] 

            if (first === second && second === third && first !== "") {
                return first
            }
        }
        return null
    }

    function checkDraw() {
        const board = gameboard.getBoard()

        if (board.includes("")) {
            return false
        }
        return true
    }

    function restartGame() {
        gameboard.resetBoard()
        currentPlayer = players[0]
        gameOver = false
    }

    return { getCurrentMarker, playRound, checkWinner, checkDraw, restartGame }

})()

const board = gameboard.getBoard()

function renderBoard() {
    board.forEach((item, index) => {
        mark[index].textContent = item
    })
}

function renderMessage() {
    const message = document.getElementById('message-player')
    const marker = gameController.getCurrentMarker()
    const winner = gameController.checkWinner()
    const draw = gameController.checkDraw()
    
    if (winner) {
        message.textContent = `Selamat! ${winner} menang`
    } else if (draw) {
        message.textContent = 'Seri! semua kotak terisi penuh'
    } else {
        message.textContent = `Giliran: ${marker}`
    }
}

const restart = document.querySelector('#restart-btn')

restart.addEventListener('click', () => {    
    gameController.restartGame()
    
    renderBoard()
})

const mark = document.querySelectorAll('.mark')

mark.forEach((item, index) => {
    item.addEventListener('click', () => {
        gameController.playRound(index)
        
        renderMessage()

        renderBoard()
    })
})

