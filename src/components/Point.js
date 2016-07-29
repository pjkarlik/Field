import Mouse from './Mouse';

export default class Particle {
  constructor(obj) {
    this.x = this.vx = obj.x;
    this.y = this.vy = obj.y;
    this.index = {
      x: obj.index.x,
      y: obj.index.y,
    };
    this.size = this.originalSize = obj.size;
    this.radius = obj.radius - 50;
    this.color = obj.color;
    this.mouse = new Mouse();
    this.canvas = obj.canvas;
    this.draw = this.draw.bind(this);
    this.effect = this.effect.bind(this);
    this.integrate = this.integrate.bind(this);
    this.getVector = this.getVector.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.draw();
  }

  integrate() {
    const point = this.getVector();
    const damp = this.size * 0.025;
    const distance = this.distance();
    this.vx = distance < this.radius ? this.x - (point.x * damp) : this.vx - (this.vx - this.x) * 0.1;
    this.vy = distance < this.radius ? this.y - (point.y * damp) : this.vy - (this.vy - this.y) * 0.1;
  }

  distance() {
    const points = this.mouse.pointer();
    const x2 = Math.pow(points.x - this.x, 2);
    const y2 = Math.pow(points.y - this.y, 2);
    const square = ~~(Math.sqrt(x2 + y2)) - Math.round(this.size / 2);
    return square;
  }

  effect() {
    const distance = this.distance();
    this.size = distance < this.radius ? ~~(this.originalSize + (this.radius - distance) / 4) :
      ~~(this.size - (this.size - this.originalSize) * 0.1);
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.strokeStyle =
      `rgb(${this.color.r + ~~(this.size * 6)},${this.color.g - ~~(this.size * 4)},${this.color.b})`;
    this.canvas.arc(this.vx, this.vy, this.size, 0, 2 * Math.PI, false);
    this.canvas.stroke();
  }

  getVector() {
    const point = this.mouse.pointer();
    const position = {
      y: point.y - this.y,
      x: point.x - this.x,
    };
    return position;
  }

  getPoints() {
    return {
      index: this.index,
      x: this.vx,
      y: this.vy,
    };
  }

  update() {
    this.effect();
    this.integrate();
    this.draw();
  }
}
