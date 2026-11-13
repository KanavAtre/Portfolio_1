// Experience page: each card after the first sits behind a tiny memory puzzle.
// Watch a chess-piece sequence, repeat it, and the next card appears.
// Without JS everything is visible, and "skip puzzles" reveals it all.
(() => {
  const cards = [...document.querySelectorAll(".xp")];
  if (cards.length < 2) return;

  const PIECES = [["♞", "knight"], ["♜", "rook"], ["♝", "bishop"], ["♛", "queen"]];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  const gates = [];

  function reveal(card) {
    card.hidden = false;
    card.classList.add("xp-in");
  }

  function unlockNext(i) {
    if (gates[i + 1]) gates[i + 1].hidden = false;
  }

  function buildGate(card, i) {
    const length = i + 3; // 3, 4, 5 steps
    const gate = el("div", "xp-gate");
    gate.hidden = i !== 0;

    const text = el("div", "xp-gate-text");
    text.append(el("strong", "", "🔒 Next experience"));
    const status = el("span", "xp-status", `Repeat a ${length}-move pattern to unlock`);
    status.setAttribute("aria-live", "polite");
    text.append(status);

    const pads = el("div", "xp-pads");
    const play = el("button", "xp-play", "Play");
    play.type = "button";
    const buttons = PIECES.map(([glyph, name], k) => {
      const b = el("button", "xp-pad", glyph);
      b.type = "button";
      b.disabled = true;
      b.setAttribute("aria-label", name);
      b.addEventListener("click", () => onPad(k));
      return b;
    });
    pads.append(play, ...buttons);
    gate.append(text, pads);

    let seq = [];
    let pos = 0;
    let accepting = false;

    const flash = async (k, ms = 350) => {
      buttons[k].classList.add("on");
      await sleep(ms);
      buttons[k].classList.remove("on");
    };

    async function start() {
      play.disabled = true;
      buttons.forEach((b) => (b.disabled = true));
      status.textContent = "Watch...";
      seq = Array.from({ length }, () => Math.floor(Math.random() * PIECES.length));
      pos = 0;
      await sleep(400);
      for (const k of seq) {
        await flash(k);
        await sleep(250);
      }
      status.textContent = "Your turn";
      buttons.forEach((b) => (b.disabled = false));
      accepting = true;
    }

    async function onPad(k) {
      if (!accepting) return;
      flash(k, 180);
      if (k === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          accepting = false;
          status.textContent = "Unlocked";
          await sleep(500);
          gate.remove();
          reveal(card);
          unlockNext(i);
        }
      } else {
        accepting = false;
        buttons.forEach((b) => (b.disabled = true));
        gate.classList.add("shake");
        status.textContent = "Not quite - watch again";
        await sleep(900);
        gate.classList.remove("shake");
        start();
      }
    }

    play.addEventListener("click", start);
    return gate;
  }

  cards.slice(1).forEach((card, i) => {
    card.hidden = true;
    const gate = buildGate(card, i);
    card.before(gate);
    gates.push(gate);
  });

  // Escape hatch for anyone who just wants to read
  const note = document.querySelector("main > p");
  if (note) {
    const skip = el("button", "xp-skip", "skip puzzles");
    skip.type = "button";
    skip.addEventListener("click", () => {
      gates.forEach((g) => g.remove());
      cards.forEach((c) => { if (c.hidden) reveal(c); });
      skip.remove();
    });
    note.append(skip);
  }
})();
