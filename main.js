const canvas = document.getElementById('staff');
const ctx = canvas.getContext('2d');
let notes = [];
let frames = 0;
let current;
let ticks = 0;
let score = 0;
let interval;
//let board;

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
let board = new Board();

class Note {
  constructor(options) {
    this.x = canvas.width;
    this.y = options.y;
    this.key = options.key;
    this.color = options.color;
  }
  draw() {
    this.x -= 2;
    //ctx.drawImage(this.quarterNote, this.x, this.y, this.width, this.height);
    ctx.save();
    ctx.font = '120px Metdemo';
    ctx.fillStyle = this.color;
    ctx.fillText('Q', this.x, this.y);
    ctx.restore();
  }
}

function generateNotes() {
  const notas = [
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 337, color: '#ff8000', key: 'd' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 289, color: '#9955ff', key: 'f' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 237, color: '#E0479E', key: 'a' },
    { y: 207, color: '#ffe203', key: 'b' },
    { y: 181, color: '#cf0000', key: 'c' },
    { y: 155, color: '#ff8000', key: 'd' },
    { y: 129, color: '#1789FC', key: 'e' },
    { y: 105, color: '#9955ff', key: 'f' },
    { y: 75, color: '#06d444', key: 'g' }
  ];
  const idx = Math.floor(Math.random() * notas.length);

  if (frames % 70 === 0) {
    notes.push(new Note(notas[idx]));
  }
  if (notes.length >= 10) {
    notes.shift(new Note(notas[idx]));
  }
}

function drawNotes() {
  notes.forEach(note => {
    note.draw();
  });
}

function update() {
  window.requestAnimationFrame(update);
  //se puede settear un time para llamar requestAnim.. con tiempo más corto
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frames++;
  //console.log(notes);
  board.draw();
  generateNotes();
  drawNotes();
  // easySong1();
  // drawEasySong();
  deleteNotes();
  drawScore();
}

function getCurrent() {
  let [note] = notes;
  if (note && note.x < 230) {
    return note.key;
  }
}

function deleteNotes() {
  let [note] = notes;
  if (note && note.x < 136) {
    notes.shift();
  }
}

function handleButtonClick(e) {
  keyPressed(e.target.dataset.key);
}

function playAudio(id) {
  let audio = document.getElementById(id);
  audio.play();
  notes.shift();
}

function drawScore() {
  let elmnt = document.getElementById('score');
  elmnt.innerText = score;
  return;
  // ctx.save();
  // ctx.font = '24px Courier';
  // ctx.fillStyle = 'white';
  // ctx.fillText(score, canvas.width / 2, 50);
  // ctx.restore();
}
function stop() {
  clearInterval(interval); // detiene el intervalo
  interval = null; // se reasigna el valor de interval
}
function keyPressed(key) {
  console.log(key, getCurrent());
  if (key !== getCurrent()) {
    return;
  }
  score += 10;
  switch (key) {
    case 'c':
      playAudio('do');
      break;
    case 'd':
      playAudio('re');
      break;
    case 'e':
      playAudio('mi');
      break;
    case 'f':
      playAudio('fa');
      break;
    case 'g':
      playAudio('sol');
      break;
    case 'a':
      playAudio('la');
      break;
    case 'b':
      playAudio('si');
      break;
    case 81:
      stop();
    default:
      break;
  }
  console.log(key);
}

//window.addEventListener('load', update);
window.addEventListener('keydown', e => {
  keyPressed(e.key);
});

document.querySelectorAll('button').forEach(element => {
  element.addEventListener('click', handleButtonClick);
});

addEventListener('click', e => {
  console.log(e);
});

document.getElementsByClassName('start-game-button')[0].onclick = function() {
  //hace un array de elementos que contengan esa clase y selecciono el primero
  document.querySelector('.start-game-button').style.display = 'none';
  document.querySelector('.front-page').style.display = 'none';

  update();
  //  document.querySelector('#staff').style.display = 'show';
};

/*
function easySong1() {
  let martinillo = [
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 337, color: '#ff8000', key: 'd' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 337, color: '#ff8000', key: 'd' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 289, color: '#9955ff', key: 'f' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 289, color: '#9955ff', key: 'f' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 237, color: '#E0479E', key: 'a' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 289, color: '#9955ff', key: 'f' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 363, color: '#cf0000', key: 'c' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 237, color: '#E0479E', key: 'a' },
    { y: 263, color: '#06d444', key: 'g' },
    { y: 289, color: '#9955ff', key: 'f' },
    { y: 315, color: '#1789FC', key: 'e' },
    { y: 363, color: '#cf0000', key: 'c' }
  ];

  if (frames % 70 === 0) {
    martinillo.push(new Note());
  }
  if (martinillo.length >= 10) {
    martinillo.shift(new Note());
  }
}

function drawEasySong() {
  martinillo.forEach(note => {
    note.draw();
  });
}
*/
