import debounce from "debounce";

let stars = [];

const settings = { amount: 150, speed: 1, baseSize: 1, direction: "right" };

// generate stars with random x and y coordinates based on window size
const generateStars = () => {
  settings.amount = window.innerWidth < 768 ? 50 : 150;

  const s = [];
  for (let i = 0; i < settings.amount; i++) {
    s.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: settings.baseSize * Math.random() * 2 + 1,
    });
  }
  stars = s;
  return s;
};

const draw = () => {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  ctx.globalCompositeOperation = "destination-over";

  // clear canvas
  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    if (settings.direction === "left") {
      star.x -= settings.speed * (star.size / 2);
      star.y += settings.speed * (star.size / 2);
      ctx.moveTo(stars[i].x, stars[i].y);

      if (star.x < 0) {
        star.x = w;
      }
      if (star.y > h) {
        star.y = 0;
      }
    } else if (settings.direction === "right") {
      star.x += settings.speed * (star.size / 2);
      star.y -= settings.speed * (star.size / 2);
      ctx.moveTo(stars[i].x, stars[i].y);

      if (star.x > w) {
        star.x = 0;
      }
      if (star.y < 0) {
        star.y = h;
      }
    }

    const r = Math.floor(Math.random() * 200) + 200;
    const g = Math.floor(Math.random() * 200) + 200;
    const b = Math.floor(Math.random() * 200) + 200;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.random() * 0.2 + 0.7})`;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
  }
  ctx.fill();

  window.requestAnimationFrame(draw);
};

export default () => ({
  spaceshipVisible: false,
  init: () => {
    generateStars();
    addEventListener("resize", debounce(generateStars));
    window.requestAnimationFrame(draw);
  },
});
