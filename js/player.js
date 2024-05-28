export class Player {
  constructor(name) {
    this.name = name
    this.score = 0
  }

  setName(name) {
    this.name = name
  }

  increaseScore() {
    this.score++
  }

  decreaseScore() {
    if (this.score > 0) {
      this.score--
    }
  }
}