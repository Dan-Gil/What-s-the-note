const canvas = document.getElementById('staff');
const ctx = canvas.getContext('2d');
let notes = [];
let frames = 0;
let current;
let ticks = 0;

class Board {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = './img/staff.png';
    this.img.onload = () => {
      this.draw();
    };
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Note {
  constructor(options) {
    this.x = canvas.width;
    this.y = options.y;
    this.color = options.color;
  }
  draw() {
    this.x--;
    //ctx.drawImage(this.quarterNote, this.x, this.y, this.width, this.height);
    ctx.font = '120px Metdemo';
    ctx.fillStyle = this.color;
    ctx.fillText('Q', this.x, this.y);
  }
}

function generateNotes() {
  const notas = [
    { y: 363, color: '#cf0000' },
    { y: 337, color: '#ff8000' },
    { y: 315, color: '#1789FC' },
    { y: 289, color: '#9955ff' },
    { y: 263, color: '#06d444' },
    { y: 237, color: '#E0479E' },
    { y: 207, color: '#ffe203' },
    { y: 181, color: '#cf0000' },
    { y: 155, color: '#ff8000' },
    { y: 129, color: '#1789FC' },
    { y: 105, color: '#9955ff' },
    { y: 75, color: '#06d444' }
  ];

  if (frames % 200 === 0) {
    const idx = Math.floor(Math.random() * notas.length);
    notes.push(new Note(notas[idx]));
  }
}

function drawNotes() {
  notes.forEach(note => {
    note.draw();
  });
}

function update() {
  window.requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  board.draw();
  generateNotes();
  drawNotes();
}

const board = new Board();

window.addEventListener('load', update);

document.querySelectorAll('button').forEach(element => {
  element.addEventListener('click', handleButtonClick);
});

window.addEventListener('keydown', e => {
  keyPressed(e.key);
});

function handleButtonClick(e) {
  keyPressed(e.target.dataset.key);
}

function keyPressed(key) {
  switch (key) {
    case 'c':
      break;
    case 'd':
      break;
    case 'e':
      break;
    case 'f':
      break;
    case 'g':
      break;
    case 'a':
      break;
    case 'b':
      break;

    default:
      break;
  }
  console.log(key);
}

addEventListener('click', e => {
  console.log(e);
});
