export function drawWinningLine(startCoord, endCoord) {
  const lineWinner = document.querySelector('.line-winner')
  const [startX, startY] = startCoord
  const [endX, endY] = endCoord

  const startElement = document.getElementById(`coord-${startX}-${startY}`)
  const endElement = document.getElementById(`coord-${endX}-${endY}`)

  const startRect = startElement.getBoundingClientRect()
  const endRect = endElement.getBoundingClientRect()
  const gameContainerRect = document
    .querySelector('.game-container')
    .getBoundingClientRect()

  const startXPos =
    startRect.left - gameContainerRect.left + startRect.width / 2
  const startYPos = startRect.top - gameContainerRect.top + startRect.height / 2
  const endXPos = endRect.left - gameContainerRect.left + endRect.width / 2
  const endYPos = endRect.top - gameContainerRect.top + endRect.height / 2

  const deltaX = endXPos - startXPos
  const deltaY = endYPos - startYPos
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  lineWinner.style.width = `${distance}px`
  lineWinner.style.transform = `rotate(${Math.atan2(deltaY, deltaX)}rad)`
  lineWinner.style.left = `${startXPos}px`
  lineWinner.style.top = `${startYPos}px`
  lineWinner.classList.remove('hide')
}
