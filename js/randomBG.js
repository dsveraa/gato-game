export function setRandomBGColor() {
  const hue = Math.floor(Math.random() * 360)
  const color = `hsl(${hue}, 50%, 40%)`
  const cells = document.querySelectorAll('.row.ancho.juego .col')

  cells.forEach((cell) => {
    cell.style.backgroundColor = color
  })
}
