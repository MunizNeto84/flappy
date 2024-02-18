function newElement(tagName, className) {
  const element = document.createElement(tagName);
  element.className = className;
  return element;
}

function Barrier(reverse = false) {
  this.element = newElement("div", "barrier");
  const edge = newElement("div", "edge");
  const body = newElement("div", "body");
  this.element.appendChild(reverse ? body : edge);
  this.element.appendChild(reverse ? edge : body);

  this.setHeight = (height) => (body.style.height = `${height}rem`);
}

//test
//const barrier = new Barrier(true);
//barrier.setHeight(12.5);
//document.querySelector("[flappy]").appendChild(barrier.element);

function barrierPair(height, space, x) {
  this.element = newElement("div", "barrier-pair");
  this.top = new Barrier(true);
  this.down = new Barrier(false);
  this.element.appendChild(this.top.element);
  this.element.appendChild(this.down.element);

  this.random = () => {
    const heightTop = Math.random() * (height - space);
    const heightDown = height - space - heightTop;
    this.top.setHeight(heightTop);
    this.down.setHeight(heightDown);
  };

  this.getX = () => parseInt(this.element.style.left.split("rem")[0]);
  this.setX = (x) => (this.element.style.left = `${x}rem`);
  this.getW = () => this.element.clientWidth;

  this.random();
  this.setX(x);
}

//test
const barrier = new barrierPair(43.7, 12.5, 25);
document.querySelector("[flappy]").appendChild(barrier.element);
