export class Car {
  constructor(name, position = 0) {
    this.name = name;
    this.position = position;
  }

  getName() {
    return this.name;
  }

  getPosition() {
    return this.position;
  }

  play(value) {
    if (value >= 4) {
      this.position++;
    }
  }
}
