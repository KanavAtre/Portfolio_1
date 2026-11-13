// Lightweight space banner: twinkling parallax stars, a drifting ringed planet,
// and shooting stars (random, or on click).
(() => {
  const canvas = document.getElementById("space-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  let w = 0, h = 0, frame = 0, last = 0, nextShot = 0;
  const mouse = { x: 0, y: 0 };
  const rand = (a, b) => a + Math.random() * (b - a);
  let stars = [];
  const shots = [];

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((w * h) / 2800);
    stars = Array.from({ length: count }, () => ({
      x: rand(0, w), y: rand(0, h),
      z: rand(0.4, 1),            // depth: drives size, brightness, parallax
      p: rand(0, Math.PI * 2),    // twinkle phase
    }));
  }

  function shoot(x, y) {
    const a = rand(0.35, 0.6);
    shots.push({ x, y, vx: Math.cos(a) * 520, vy: Math.sin(a) * 520, life: 1 });
  }

  function planet(t) {
    const px = w * 0.8 + Math.sin(t / 6000) * 14 + mouse.x * 10;
    const py = h * 0.5 + Math.cos(t / 7000) * 8 + mouse.y * 6;
    const r = Math.min(h * 0.18, 34);
    const g = ctx.createRadialGradient(px - r * 0.4, py - r * 0.4, r * 0.1, px, py, r);
    g.addColorStop(0, "#c7d2fe");
    g.addColorStop(1, "#4f46e5");
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(-0.35);
    // back half of ring, planet, front half of ring
    ctx.strokeStyle = "rgba(199,210,254,.55)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.9, r * 0.5, 0, Math.PI, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.9, r * 0.5, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
  }

  function draw(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    ctx.clearRect(0, 0, w, h);

    for (const s of stars) {
      s.x -= 6 * s.z * dt;                          // slow drift
      if (s.x < 0) s.x = w;
      const tw = 0.55 + 0.45 * Math.sin(now / 700 + s.p);
      ctx.globalAlpha = Math.min(1, s.z * tw * 1.4);
      ctx.fillStyle = "#fff";
      const px = s.x + mouse.x * 12 * s.z;
      const py = s.y + mouse.y * 8 * s.z;
      ctx.fillRect(px, py, s.z * 2.4, s.z * 2.4);
    }
    ctx.globalAlpha = 1;
    planet(now);

    if (now > nextShot) { shoot(rand(0, w * 0.6), rand(0, h * 0.4)); nextShot = now + rand(2500, 6000); }
    for (let i = shots.length - 1; i >= 0; i--) {
      const s = shots[i];
      s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 0.9;
      if (s.life <= 0) { shots.splice(i, 1); continue; }
      const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 0.12, s.y - s.vy * 0.12);
      g.addColorStop(0, `rgba(255,255,255,${s.life})`);
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 0.12, s.y - s.vy * 0.12); ctx.stroke();
    }
    frame = requestAnimationFrame(draw);
  }

  function start() { last = performance.now(); nextShot = last + 800; frame = requestAnimationFrame(draw); }

  resize();
  addEventListener("resize", resize);
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width - 0.5;
    mouse.y = (e.clientY - r.top) / r.height - 0.5;
  });
  canvas.parentElement.addEventListener("click", (e) => {
    const r = canvas.getBoundingClientRect();
    shoot(e.clientX - r.left, e.clientY - r.top);
  });
  // Pause when the tab is hidden
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(frame);
    if (!document.hidden && !reduce.matches) start();
  });

  if (reduce.matches) {
    // Static starfield for reduced motion
    draw(performance.now()); cancelAnimationFrame(frame);
  } else {
    start();
  }
})();
