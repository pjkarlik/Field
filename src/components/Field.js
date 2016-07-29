import Mouse from './Mouse';
/**
  Trying to make an Attractor Field.
*/
export default class Particle {
  constructor(obj) {
    this.x = this.vx = obj.x;
    this.y = this.vy = obj.y;
    this.index = {
      x: obj.index.x,
      y: obj.index.y,
    };
    this.size = this.originalSize = obj.size;
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
    const damp = this.size * 0.03;
    const distance = this.distance();
    this.vx = distance < this.radius ? this.x + (point.x * damp) : this.vx - (this.vx - this.x) * 0.1;
    this.vy = distance < this.radius ? this.y + (point.y * damp) : this.vy - (this.vy - this.y) * 0.1;
  }

  getPoints() {
    return {
      index: this.index,
      x: this.vx,
      y: this.vy,
    };
  }

  getVector() {
    const points = this.mouse.pointer();
    const position = {
      y: points.y - this.y,
      x: points.x - this.x,
    };
    return position;
  }

  distance() {
    const points = this.mouse.pointer();
    const x2 = Math.pow(points.x - this.x, 2);
    const y2 = Math.pow(points.y - this.y, 2);
    const square = ~~(Math.sqrt(x2 + y2)) - Math.round(this.size / 2);
    return square;
  }

  update() {
    const distance = this.distance();
    this.size = distance < this.radius ? ~~(this.originalSize + (this.radius - distance) / 4) :
      ~~(this.size - (this.size - this.originalSize) * 0.1);
    this.draw();
  }
}
