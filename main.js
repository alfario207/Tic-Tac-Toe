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
            return 'gameOver'
        }

        const placed = gameboard.placeMarker(index, currentPlayer.marker)
        
        if (!placed) {
            return 'occupied'
        }

        const winner = checkWinner()

        if (winner) {
            gameOver = true
            return 'winner'
        }

        const draw = checkDraw()
        
        if(draw) {
            gameOver = true
            return 'draw'
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

    return { getCurrentMarker, playRound, checkWinner, restartGame }

})()


function renderBoard() {
    const board = gameboard.getBoard()

    board.forEach((item, index) => {
        mark[index].textContent = item
    })
}

function renderMessage(result) {
    const message = document.getElementById('message-player')
    const marker = gameController.getCurrentMarker()

    if (!result) {
        message.textContent = `Giliran: ${marker}`
        return
    }

    if (result === 'gameOver') {
        message.textContent = 'Game berakhir'
        return
    } 
    
    if (result === 'occupied') {
        message.textContent = 'Kotak sudah terisi'
        return
    }
    
    if (result === 'winner') {
        const winner = gameController.checkWinner()
        message.textContent = `Selamat! ${winner} menang`
        return
    } 
    
    if (result === 'draw') {
        message.textContent = 'Seri! semua kotak terisi penuh'
    } else {
        message.textContent = `Giliran: ${marker}`
    }
}

const restart = document.querySelector('#restart-btn')

restart.addEventListener('click', () => {    
    gameController.restartGame()
    
    renderBoard()

    renderMessage()
})

const mark = document.querySelectorAll('.mark')

mark.forEach((item, index) => {
    item.addEventListener('click', () => {
        const result = gameController.playRound(index)
        
        renderBoard()
        
        renderMessage(result)
    })
})

