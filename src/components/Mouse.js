export default class Mouse {
  constructor(element) {
    this.element = element || window;
    this.x = 0;
    this.y = 0;
    this.pointer = this.pointer.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.mouseEvents = ['mouseenter', 'mousemove', 'touchmove'];
    this.mouseEvents.forEach((eventName) => {
      this.element.addEventListener(eventName, this.getCoordinates);
    });
  }
  getCoordinates(event) {
    event.preventDefault();
    let x;
    let y;
    if (event.type === 'touchmove') {
      x = event.changedTouches[0].clientX;
      y = event.changedTouches[0].clientY;
    } else {
      x = event.pageX;
      y = event.pageY;
    }
    this.x = x;
    this.y = y;
  }

  pointer() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
