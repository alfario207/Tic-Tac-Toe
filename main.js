// buat papan untuk tempat main menggunakan array kosong (gameboard)

const gameboard = (() => {
    // const board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"]
    const board = Array(9).fill("-")
    console.log('Game Start')
    console.log(board)

    const getBoard = () =>  board
    
    const placeMarker = (index, marker) => {
        if (board[index] === '-') {
            board[index] = marker
            return true
        }

        return false
    }
    return { getBoard, placeMarker }

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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const gameController = (() => {

    let currentPlayer = players[0]
    
    function switchPlayer() {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
            console.log(gameboard.getBoard())
        } else {
            currentPlayer = players[0]          
        }
    }
    
    function playRound(index) {
        const placed = gameboard.placeMarker(index, currentPlayer.marker)

        if(!placed) return

        const winner = checkWinner()

        if (winner) {
            console.log(`Selamat! ${winner} menang`)
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

            if (first === second && second === third && first !== '-') {
                return first
            }
        }
        return null
    }
    return { playRound }

})()

gameController.playRound(4)
gameController.playRound(7)
gameController.playRound(6)
gameController.playRound(2)
gameController.playRound(0)
gameController.playRound(3)
gameController.playRound(8)
console.log(gameboard.getBoard())
