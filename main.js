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
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const gameController = (() => {

    let currentPlayer = players[0]

    function switchPlayer() {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1]
        } else {
            currentPlayer = players[0]          
        }
    }
    
    function playRound(index) {
        const placed = gameboard.placeMarker(index, currentPlayer.marker)
        
        if (!placed) {
            console.log('Kotak sudah terisi.')
            return
        }

        console.log(gameboard.getBoard())

        const winner = checkWinner()

        if (winner) {
            console.log(`Selamat! ${winner} menang`)
            return
        }

        const draw =  checkDraw()
        
        if(draw) {
            console.log('Seri! semua kotak terisi penuh')
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

    return { playRound }

})()

const mark = document.querySelectorAll('.mark')

function renderBoard() {
    const board = gameboard.getBoard()

    board.forEach((item, index) => {
        console.log(`item ${item} dan index ke-${index}`)

        mark[index].textContent = item
    })
}

function restart(index) {
    const board = gameboard.getBoard()

    board[index] = ""

    console.log(board[index])
}

mark.forEach((item, index) => {
    item.addEventListener('click', () => {
        console.log('mark clicked')

        gameController.playRound(index)

        renderBoard()
    })
})

