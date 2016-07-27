import Mouse from './Mouse';
// import { dist } from './MathUtils';

export default class Particle {
  constructor(obj) {
    this.x = obj.x;
    this.y = obj.y;
    this.size = obj.size;
    this.originalSize = this.size;
    this.radius = obj.radius;
    this.maxSize = 80;
    this.time = 0;
    this.color = obj.color;
    this.mouse = new Mouse();
    this.canvas = obj.canvas;
    this.draw = this.draw.bind(this);
    this.draw();
  }

  draw() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
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
      this.size = this.originalSize + (this.radius - distance) / 7;
    } else {
      this.size = this.originalSize;
    }
    this.draw();
  }
}
