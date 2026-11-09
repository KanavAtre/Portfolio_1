
(() => {
  // Remove previous instance if the script is run again
  window.__bugCleanup?.();

  const bug = document.createElement("div");
  bug.textContent = "🐞";

  Object.assign(bug.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "36px",
    height: "36px",
    fontSize: "30px",
    lineHeight: "36px",
    textAlign: "center",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: "2147483647",
    willChange: "transform",
    filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.2))",
  });

  document.body.appendChild(bug);

  const SIZE = 36;
  const FLEE_RADIUS = 160;
  const SAFE_RADIUS = 260;
  const WANDER_SPEED = 35;
  const FLEE_SPEED = 450;
  const ACCEL = 7;
  const WALL_MARGIN = 65;

  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(v, b));

  const bounds = () => ({
    w: Math.max(0, innerWidth - SIZE),
    h: Math.max(0, innerHeight - SIZE),
  });

  let { w, h } = bounds();
  let x = rand(0, w);
  let y = rand(0, h);

  let vx = 0;
  let vy = 0;
  let heading = rand(-Math.PI, Math.PI);
  let desiredHeading = heading;

  let state = "wander";
  let stateUntil = 0;
  let nextDecision = 0;
  let lastFlee = -Infinity;

  const mouse = { x: -9999, y: -9999 };

  function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function onMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseleave", onMouseLeave);

  function chooseWander(now) {
    state = Math.random() < 0.15 ? "idle" : "wander";

    // Small directional adjustments instead of teleporting
    // the movement target to the other side of the screen.
    desiredHeading += rand(-1.2, 1.2);

    stateUntil = now + rand(500, 1800);
    nextDecision = stateUntil;
  }

  let last = performance.now();
  let frame;

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ({ w, h } = bounds());

    const cx = x + SIZE / 2;
    const cy = y + SIZE / 2;

    const mx = cx - mouse.x;
    const my = cy - mouse.y;
    const mouseDist = Math.hypot(mx, my);

    // Flee directly away from the cursor
    if (mouseDist < FLEE_RADIUS) {
      if (state !== "flee") {
        lastFlee = now;
      }

      state = "flee";
      stateUntil = now + 350;

      // Slight random variation makes escape less robotic
      desiredHeading =
        Math.atan2(my, mx) + rand(-0.18, 0.18);
    } else if (state === "flee") {
      if (mouseDist > SAFE_RADIUS || now > stateUntil) {
        chooseWander(now);
      }
    } else if (now > nextDecision) {
      chooseWander(now);
    }

    // Screen-edge avoidance
    let avoidX = 0;
    let avoidY = 0;

    if (x < WALL_MARGIN)
      avoidX += (WALL_MARGIN - x) / WALL_MARGIN;

    if (x > w - WALL_MARGIN)
      avoidX -= (x - (w - WALL_MARGIN)) / WALL_MARGIN;

    if (y < WALL_MARGIN)
      avoidY += (WALL_MARGIN - y) / WALL_MARGIN;

    if (y > h - WALL_MARGIN)
      avoidY -= (y - (h - WALL_MARGIN)) / WALL_MARGIN;

    if (avoidX || avoidY) {
      const wallAngle = Math.atan2(avoidY, avoidX);

      const strength = state === "flee" ? 0.65 : 1;

      const dx =
        Math.cos(desiredHeading) +
        Math.cos(wallAngle) * strength * 2;

      const dy =
        Math.sin(desiredHeading) +
        Math.sin(wallAngle) * strength * 2;

      desiredHeading = Math.atan2(dy, dx);
    }

    // Smooth heading changes
    const angleDiff = Math.atan2(
      Math.sin(desiredHeading - heading),
      Math.cos(desiredHeading - heading)
    );

    const turnRate = state === "flee" ? 12 : 3.5;

    heading +=
      angleDiff * (1 - Math.exp(-turnRate * dt));

    const speed =
      state === "flee"
        ? FLEE_SPEED
        : state === "idle"
          ? 0
          : WANDER_SPEED;

    const targetVx = Math.cos(heading) * speed;
    const targetVy = Math.sin(heading) * speed;

    const acceleration =
      state === "flee" ? ACCEL * 2 : ACCEL;

    const k = 1 - Math.exp(-acceleration * dt);

    vx += (targetVx - vx) * k;
    vy += (targetVy - vy) * k;

    x = clamp(x + vx * dt, 0, w);
    y = clamp(y + vy * dt, 0, h);

    // Tiny scuttling animation
    const actualSpeed = Math.hypot(vx, vy);

    const scuttle =
      actualSpeed > 10
        ? Math.sin(now * (state === "flee" ? 0.065 : 0.025)) * 2
        : 0;

    bug.style.transform = `
      translate3d(${x}px, ${y + scuttle}px, 0)
      rotate(${heading + Math.PI / 2}rad)
    `;

    frame = requestAnimationFrame(tick);
  }

  frame = requestAnimationFrame(tick);

  // Cleanup
  window.__bugCleanup = () => {
    cancelAnimationFrame(frame);
    removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseLeave);
    bug.remove();
    delete window.__bugCleanup;
  };
})();
