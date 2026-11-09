const canvas = document.getElementById("slime-canvas");
const ctx = canvas.getContext("2d");
const container = document.querySelector(".stack-section");

const mouse = { x: 0, y: 0, active: false };
const blob = { x: 0, y: 0, vx: 0, vy: 0 };

let width = 0;
let height = 0;
let animationId;
let lastTime = 0;

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

function resize() {
  const rect = container.getBoundingClientRect();
  width = rect.width;
  height = rect.height;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (!mouse.active) {
    mouse.x = width / 2;
    mouse.y = height / 2;
  }

  blob.x = mouse.x;
  blob.y = mouse.y;
}

container.addEventListener("pointermove", (event) => {
  const rect = container.getBoundingClientRect();

  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
  mouse.active = true;
});

container.addEventListener("pointerleave", () => {
  mouse.active = false;
  mouse.x = width / 2;
  mouse.y = height / 2;
});

function draw(timestamp) {
  const dt = lastTime
    ? Math.min((timestamp - lastTime) / 16.67, 2)
    : 1;

  lastTime = timestamp;

  ctx.clearRect(0, 0, width, height);

  // Spring physics: follows cursor with elastic motion
  const stiffness = 0.035;
  const friction = Math.pow(0.84, dt);

  blob.vx += (mouse.x - blob.x) * stiffness * dt;
  blob.vy += (mouse.y - blob.y) * stiffness * dt;

  blob.vx *= friction;
  blob.vy *= friction;

  blob.x += blob.vx * dt;
  blob.y += blob.vy * dt;

  const speed = Math.hypot(blob.vx, blob.vy);
  const angle = Math.atan2(blob.vy, blob.vx);

  // Blob stretches in direction of travel
  const stretch = Math.min(speed * 1.8, 100);

  const radiusX = 150 + stretch;
  const radiusY = Math.max(90, 150 - stretch * 0.45);

  ctx.save();

  ctx.translate(blob.x, blob.y);
  ctx.rotate(angle);

  // Soft liquid gradient
  const gradient = ctx.createRadialGradient(
    0, 0, 10,
    0, 0, radiusX
  );

  gradient.addColorStop(0, "rgba(90, 90, 90, 0.25)");
  gradient.addColorStop(0.45, "rgba(140, 140, 140, 0.13)");
  gradient.addColorStop(1, "rgba(180, 180, 180, 0)");

  ctx.fillStyle = gradient;

  ctx.beginPath();
  ctx.ellipse(
    0, 0,
    radiusX,
    radiusY,
    0, 0, Math.PI * 2
  );
  ctx.fill();

  ctx.restore();

  animationId = requestAnimationFrame(draw);
}

resize();

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(container);

if (!prefersReducedMotion.matches) {
  animationId = requestAnimationFrame(draw);
}

prefersReducedMotion.addEventListener("change", (event) => {
  cancelAnimationFrame(animationId);

  if (!event.matches) {
    lastTime = 0;
    animationId = requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, width, height);
  }
});
