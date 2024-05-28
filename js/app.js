import { coords, coordMatrix, idToCoordMap } from './data.js'
import { setRandomBGColor } from './randomBG.js'
import { drawWinningLine } from './drawingWinningLine.js'
import { Player } from './player.js'

const winnerIs = document.getElementById('winnerIs')
const playAgain = document.getElementById('playAgain')
const playerField1 = document.getElementById('player1')
const playerField2 = document.getElementById('player2')
const round = document.getElementById('roundNumber')
const scoreP1 = document.getElementById('score-p1')
const scoreP2 = document.getElementById('score-p2')

let lastSymbol
let gameOver = false
let roundNumber = 1
let player1
let player2

const inputPlayerName1 = prompt('nombre del jugador 1')
const inputPlayerName2 = prompt('nombre del jugador 2')

if (inputPlayerName1) {
  player1 = new Player(inputPlayerName1)
  playerField1.innerText = player1.name
}
if (inputPlayerName2) {
  player2 = new Player(inputPlayerName2)
  playerField2.innerText = player2.name
}

playAgain.addEventListener('click', resetGame)

coords.forEach((id) => {
  const element = document.getElementById(id)
  element.addEventListener('click', (e) => {
    let empty = e.target.innerText === ''

    if (empty && gameOver === false) {
      const [row, col] = idToCoordMap[id]

      if (lastSymbol === 'O') {
        e.target.innerText = 'X'
        lastSymbol = 'X'
        coordMatrix[row][col] = 'X'
      } else {
        e.target.innerText = 'O'
        lastSymbol = 'O'
        coordMatrix[row][col] = 'O'
      }
      validate()
    }
  })
})

function winnerName(symbol) {
  let winnerName = ''
  if (symbol === 'X') {
    winnerName = player1.name
  } else {
    winnerName = player2.name
  }
  return (winnerIs.innerText = `The Winner is ${winnerName}!`)
}

function validate() {
  // Verificar si todas las celdas están ocupadas
  const allCellsOccupied = coordMatrix.every((row) =>
    row.every((cell) => cell !== '')
  )

  // Validar filas y columnas
  for (let i = 0; i < 3; i++) {
    if (
      coordMatrix[i][0] !== '' &&
      coordMatrix[i][0] === coordMatrix[i][1] &&
      coordMatrix[i][1] === coordMatrix[i][2]
    ) {
      winnerName(coordMatrix[i][0])
      winnerIs.classList.remove('hide')
      playAgain.classList.remove('hide')
      gameOver = true
      drawWinningLine([i, 0], [i, 2])
      assignScore()

      return
    }

    if (
      coordMatrix[0][i] !== '' &&
      coordMatrix[0][i] === coordMatrix[1][i] &&
      coordMatrix[1][i] === coordMatrix[2][i]
    ) {
      winnerName(coordMatrix[0][i])
      winnerIs.classList.remove('hide')
      playAgain.classList.remove('hide')
      gameOver = true
      drawWinningLine([0, i], [2, i])
      assignScore()
      return
    }
  }

  // Validar diagonales
  if (
    coordMatrix[0][0] !== '' &&
    coordMatrix[0][0] === coordMatrix[1][1] &&
    coordMatrix[1][1] === coordMatrix[2][2]
  ) {
    winnerName(coordMatrix[0][0])
    winnerIs.classList.remove('hide')
    playAgain.classList.remove('hide')
    gameOver = true
    drawWinningLine([0, 0], [2, 2])
    assignScore()
    return
  }

  if (
    coordMatrix[0][2] !== '' &&
    coordMatrix[0][2] === coordMatrix[1][1] &&
    coordMatrix[1][1] === coordMatrix[2][0]
  ) {
    winnerName(coordMatrix[0][2])
    winnerIs.classList.remove('hide')
    playAgain.classList.remove('hide')
    gameOver = true
    drawWinningLine([0, 2], [2, 0])
    assignScore()
    return
  }

  if (allCellsOccupied) {
    winnerIs.innerText = 'There is no winner 🫠'
    winnerIs.classList.remove('hide')
    playAgain.classList.remove('hide')
    gameOver = true
    return
  }
}

function assignScore() {
  if (lastSymbol === 'X') {
    player1.increaseScore()
    scoreP1.innerText = player1.score
  }

  if (lastSymbol === 'O') {
    player2.increaseScore()
    scoreP2.innerText = player2.score
  }
}

function resetGame() {
  lastSymbol = roundNumber % 2 === 1 ? 'O' : 'X'
  gameOver = false

  let delay = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      setTimeout(() => {
        coordMatrix[i][j] = ''
        const element = document.getElementById(`coord-${i}-${j}`)
        element.innerText = ''
      }, delay)
      delay += 50
    }
  }

  setRandomBGColor()
  winnerIs.classList.add('hide')
  playAgain.classList.add('hide')
  document.querySelector('.line-winner').classList.add('hide')
  round.innerText = roundNumber
  roundNumber++
}

resetGame()
