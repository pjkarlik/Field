import Mouse from './Mouse';
// import { dist } from './MathUtils';

export default class Particle {
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.index = {
      x: obj.index.x,
      y: obj.index.y,
    };
    this.vx = this.x;
    this.vy = this.y;
    this.size = obj.size;
    this.originalSize = this.size;
    this.radius = obj.radius;
    this.color = obj.color;
    this.mouse = new Mouse();
    this.canvas = obj.canvas;
    this.draw = this.draw.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.draw();
  }

  draw() {
    const point = this.getVector();
    const damp = this.size * 0.01;
    this.vx = this.x - (point.x * damp);
    this.vy = this.y - (point.y * damp);
    this.canvas.beginPath();
    this.canvas.strokeStyle =
      `rgb(${this.color.r + ~~(this.size * 6)},${this.color.g - ~~(this.size * 4)},${this.color.b})`;
    this.canvas.arc(this.vx, this.vy, this.size * damp, 0, 2 * Math.PI, false);
    this.canvas.stroke();
  }

  getPoints() {
    return {
      index: this.index,
      x: this.vx,
      y: this.vy,
    };
  }

  getVector() {
    const mouse = this.mouse;
    const points = mouse.pointer();
    const deg = {
      y: points.y - this.y,
      x: points.x - this.x,
    };
    return deg;
  }

  distance() {
    const mouse = this.mouse;
    const points = mouse.pointer();
    return Math.floor(
      Math.sqrt(
        Math.pow(points.x - (this.x + (this.size / 2)), 2) +
        Math.pow(points.y - (this.y + (this.size / 2)), 2)
      )
    ) - Math.round(this.size / 2);
  }

  update() {
    const distance = this.distance();
    if (distance < this.radius) {
      this.size = this.originalSize + (this.radius - distance) / 4;
    } else {
      this.size = this.size - (this.size - this.originalSize) * 0.05;
    }
    this.draw();
  }
}
