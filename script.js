const fairyData = [
  {
    image: 'Img/MorganaFoto01.jpg'
  },
  {
    image: 'Img/MorganaFoto03.jpg'
  },
  {
    image: 'Img/MorganaFoto02.jpg'
  },
  {
    image: 'Img/MorganaFoto05.jpg'
  },
  {
    image: 'Img/MorganaFoto04.jpg'
  }
];

const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero h2');
const thumbnails = document.querySelectorAll('.card');
const leftArrow = document.querySelector('.arrow-left');
const rightArrow = document.querySelector('.arrow-right');

let currentIndex = 0;
let autoSlideInterval;

//Função principal para trocar imagem e texto
function changeHero(index) {
  const fairy = fairyData[index];
  hero.classList.add('fade-out');
  hero.style.backgroundImage = `url('${fairy.image}')`;
  hero.style.backgroundSize = 'cover';
  hero.style.backgroundPosition = 'center';
  heroTitle.textContent = fairy.name;

  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });

  currentIndex = index;
}

// Avança para próxima fada
function nextHero() {
  const nextIndex = (currentIndex + 1) % fairyData.length;
  changeHero(nextIndex);
}

// Volta para a fada anterior
function previousHero() {
  const prevIndex = (currentIndex - 1 + fairyData.length) % fairyData.length;
  changeHero(prevIndex);
}

// Inicia o carrossel automático
function startAutoSlide() {
  autoSlideInterval = setInterval(nextHero, 2000); // troca a cada 2 segundos
}

// Para o carrossel automático
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Eventos nas miniaturas (cards)
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    changeHero(index);
    stopAutoSlide();
  });
});

// Eventos nas setas
if (leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    previousHero();
    stopAutoSlide();
  });

  rightArrow.addEventListener('click', () => {
    nextHero();
    stopAutoSlide();
  });
}

// Pausar o slider ao passar o mouse sobre o hero
if (hero) {
  hero.addEventListener('mouseenter', stopAutoSlide);
  hero.addEventListener('mouseleave', startAutoSlide);
}

// Inicia com a primeira fada
changeHero(0);
startAutoSlide();

//-------- PASTA = homenagem.html --------

const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
const maxFlakes = 150;

function createSnowflakes() {
  if (snowflakes.length < maxFlakes) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3 + 1;
    const speed = Math.random() * 1 + 0.5;
    snowflakes.push({ x, y, radius, speed });
  }
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  for (let flake of snowflakes) {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  updateSnowflakes();
}

function updateSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  }
}

function animateSnow() {
  drawSnowflakes();
  requestAnimationFrame(animateSnow);
}

setInterval(createSnowflakes, 100);
animateSnow();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

