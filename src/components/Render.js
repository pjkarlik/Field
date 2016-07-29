import { fastfloor } from './MathUtils';
import Point from './Point';
// Switch import to other items to see examples - [Field.js, Wave.js, Parabola.js]

/** Parent Render Class */
export default class Render {
  constructor(element) {
    // Screen Set Up //
    this.element = element;
    // render const //
    this.grid = 40;
    this.width = fastfloor(document.documentElement.clientWidth, window.innerWidth || 0);
    this.height = fastfloor(document.documentElement.clientHeight, window.innerHeight || 0);
    this.rows = fastfloor(this.width / this.grid);
    this.cols = fastfloor(this.height / this.grid);
    this.points = [];
    // Set Up canvas and surface object //
    this.canvas = this.createCanvas('canvas');
    this.surface = this.canvas.getContext('2d');
    this.surface.scale(1, 1);
    // Bind Stuff //
    this.createPoints = this.createPoints.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
    // run function //
    this.createPoints();
    this.renderLoop();
  }

  createCanvas(name) {
    const canvasElement = document.createElement('canvas');
    canvasElement.id = name;
    canvasElement.width = this.width;
    canvasElement.height = this.height;
    this.element.appendChild(canvasElement);
    return canvasElement;
  }

  createPoints() {
    for (let y = 0; y < this.cols; y++) {
      for (let x = 0; x < this.rows; x++) {
        const point = new Point({
          x: (this.grid / 2) + x * this.grid,
          y: (this.grid / 2) + y * this.grid,
          index: {
            x,
            y,
          },
          size: 2,
          radius: 150,
          color: {
            r: 0,
            g: 255,
            b: 0,
          },
          canvas: this.surface,
        });
        this.points.push(point);
      }
    }
  }
  connectPoints(x) {
    const point1 = this.points[x].getPoints();
    let point2 = this.points[x + 1].getPoints();
    if (point1.index.x > -1 && point1.index.x < this.rows - 1) {
      this.drawLine(point1, point2);
    }
    if (point1.index.y > -1 && point1.index.y < this.cols - 1) {
      point2 = this.points[x + (this.rows)].getPoints();
      this.drawLine(point2, point1);
    }
  }
  drawLine(point1, point2) {
    this.surface.beginPath();
    this.surface.strokeStyle = '#006666';
    this.surface.moveTo(point1.x, point1.y);
    this.surface.lineTo(point2.x, point2.y);
    this.surface.stroke();
  }
  renderLoop() {
    this.surface.clearRect(0, 0, this.width, this.height);
    for (let x = 0; x < this.points.length; x++) {
      const point = this.points[x];
      if (x < this.points.length - 1) {
        this.connectPoints(x);
      }
      point.update();
    }
    window.requestAnimationFrame(this.renderLoop);
  }
}
