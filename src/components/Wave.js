import Mouse from './Mouse';
/**
  Sine/CoSine waves applied to Field Grid.
*/
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
    this.maxSize = 80;
    this.time = 0;
    this.color = obj.color;
    this.mouse = new Mouse();
    this.canvas = obj.canvas;
    this.draw = this.draw.bind(this);
    this.draw();
  }

  draw() {
    const amp = 125;
    const damp = this.size * 0.1;
    const distance = this.distance();
    const cosProp = (amp * Math.cos(distance * Math.PI / 180) * 0.1) * damp;
    // const sinProp = (amp * Math.sin(distance * Math.PI / 180) * 0.1) * damp;
    this.vx = this.x; // + sinProp;
    this.vy = this.y + cosProp;
    this.canvas.beginPath();
    this.canvas.strokeStyle =
      `rgb(${this.color.r + ~~(this.size * 6)},${this.color.g - ~~(this.size * 4)},${this.color.b})`;
    this.canvas.arc(this.vx, this.vy, this.size * (damp * 0.05), 0, 2 * Math.PI, false);
    this.canvas.stroke();
  }

  getPoints() {
    return {
      index: this.index,
      x: this.vx,
      y: this.vy,
    };
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
