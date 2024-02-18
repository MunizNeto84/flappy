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

  this.setHeight = (height) => (body.style.height = `${height}px`);
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

  this.getX = () => parseInt(this.element.style.left.split("px")[0]);
  this.setX = (x) => (this.element.style.left = `${x}px`);
  this.getW = () => this.element.clientWidth;

  this.random();
  this.setX(x);
}

//test
//const barrier = new barrierPair(43.7, 12.5, 25);
//document.querySelector("[flappy]").appendChild(barrier.element);

function Barriers(height, width, space, gap, score) {
  this.pairs = [
    new barrierPair(height, space, width),
    new barrierPair(height, space, width + gap),
    new barrierPair(height, space, width + gap * 2),
    new barrierPair(height, space, width + gap * 3),
  ];

  const displacement = 3;
  this.animation = () => {
    this.pairs.forEach((pair) => {
      pair.setX(pair.getX() - displacement);

      if (pair.getX() < -pair.getW()) {
        pair.setX(pair.getX() + gap * this.pairs.length);
        pair.random();
      }

      const split = width / 2;
      const goal = pair.getX() + displacement >= split && pair.getX() < split;
      if (goal) {
        score;
      }
    });
  };
}

function Bird(gameHeight) {
  let fly = false;
  this.element = newElement("img", "bird");
  this.element.src = "./flappy.svg";

  this.getY = () => parseInt(this.element.style.bottom.split("px")[0]);
  this.setY = (y) => (this.element.style.bottom = `${y}px`);
  window.onkeydown = (e) => (fly = true);
  window.onkeyup = (e) => (fly = false);

  this.animation = () => {
    const newY = this.getY() + (fly ? 8 : -5);
    const maxHeight = gameHeight - this.element.clientHeight;

    if (newY <= 0) {
      this.setY(0);
    } else if (newY >= maxHeight) {
      this.setY(maxHeight);
    } else {
      this.setY(newY);
    }
  };
  this.setY(gameHeight / 2);
}

/*test
const barriers = new Barriers(700, 1200, 200, 400);
const bird = new Bird(700);
const area = document.querySelector("[flappy]");

area.appendChild(bird.element);
barriers.pairs.forEach((pair) => area.appendChild(pair.element));
setInterval(() => {
  barriers.animation();
  bird.animation();
}, 20);
*/
