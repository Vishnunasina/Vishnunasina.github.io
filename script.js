const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

const STAR_COUNT = 150;
const SHOOTING_STAR_CHANCE = 0.005; // lower = rarer (important)

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create background stars
function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.1,
    });
  }
}
createStars();

// Shooting star generator
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.5,
    length: Math.random() * 300 + 200,
    speed: Math.random() * 15 + 10,
    angle: Math.PI / 4,
    opacity: 1,
  });
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Normal stars
  ctx.fillStyle = "rgba(216, 180, 254, 0.9)";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });

  // Randomly create shooting stars
  if (Math.random() < SHOOTING_STAR_CHANCE) {
    createShootingStar();
  }

  // Draw shooting stars
  shootingStars.forEach((s, index) => {
    ctx.strokeStyle = `rgba(216, 180, 254, ${s.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(
      s.x - Math.cos(s.angle) * s.length,
      s.y - Math.sin(s.angle) * s.length
    );
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.opacity -= 0.02;

    if (s.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });

  requestAnimationFrame(draw);
}

draw();