// open desensitizer
// One file, no dependencies. The page is a document; the session is an
// overlay on top of it. The dot follows a sine wave, the optional tone pans
// with it, and Space at any time replaces both with a breathing exercise.

const STORAGE_KEY = "open-desensitizer";
const TONE_HZ = 160;
const TONE_GAIN = 0.15;
const BREATH_PHASE_MS = 4000;

const $ = (id) => document.getElementById(id);

const ui = {
  speed: $("inp-speed"),
  size: $("inp-size"),
  audio: $("inp-audio"),
  valSpeed: $("val-speed"),
  valSize: $("val-size"),
  start: $("btn-start"),
  ground: $("btn-ground"),
  stage: $("stage"),
  canvas: $("canvas"),
  stageGround: $("btn-stage-ground"),
  stageStop: $("btn-stage-stop"),
  grounding: $("grounding"),
  breath: $("breath"),
  breathWord: $("breath-word"),
  back: $("btn-return"),
};

const state = {
  speed: 0.5,
  size: 30,
  audio: false,
  running: false,
  grounding: false,
  startedAt: 0,
  frame: 0,
  colors: { bg: "#fff", text: "#000", trail: "rgba(255,255,255,0.3)" },
};

const audio = { ctx: null, panner: null, gain: null, osc: null };
const ctx = ui.canvas.getContext("2d");

// Settings

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (typeof saved.speed === "number") state.speed = saved.speed;
    if (typeof saved.size === "number") state.size = saved.size;
    if (typeof saved.audio === "boolean") state.audio = saved.audio;
  } catch {
    // Storage may be unavailable; defaults are fine.
  }
  ui.speed.value = state.speed;
  ui.size.value = state.size;
  ui.audio.checked = state.audio;
  render();
}

function save() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ speed: state.speed, size: state.size, audio: state.audio }),
    );
  } catch {
    // Ignore; the session works without persistence.
  }
}

function render() {
  ui.valSpeed.textContent = `${state.speed.toFixed(2)} Hz`;
  ui.valSize.textContent = `${state.size} px`;
}

// Colors: the tokens are oklch; the canvas gets the resolved values from its
// own computed style so it follows the color scheme without a second palette.

function readColors() {
  const style = getComputedStyle(ui.canvas);
  const bg = style.backgroundColor;
  const text = style.color;
  const m = bg.match(/[\d.]+/g) || ["255", "255", "255"];
  state.colors = {
    bg,
    text,
    trail: `rgba(${m[0]}, ${m[1]}, ${m[2]}, 0.3)`,
  };
}

function resize() {
  const dpr = window.devicePixelRatio || 1;
  const w = ui.stage.clientWidth;
  const h = ui.stage.clientHeight;
  ui.canvas.width = Math.round(w * dpr);
  ui.canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = state.colors.bg;
  ctx.fillRect(0, 0, w, h);
}

// Audio: a sine tone through a stereo panner. Created on the first user
// gesture that needs it, so the browser lets it play.

function ensureAudio() {
  if (audio.ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  audio.ctx = new AC();
  audio.panner = audio.ctx.createStereoPanner();
  audio.gain = audio.ctx.createGain();
  audio.gain.gain.value = 0;
  audio.panner.connect(audio.gain);
  audio.gain.connect(audio.ctx.destination);
}

function startTone() {
  ensureAudio();
  if (!audio.ctx) return;
  if (audio.ctx.state === "suspended") audio.ctx.resume();
  stopTone(true);
  const t = audio.ctx.currentTime;
  audio.osc = audio.ctx.createOscillator();
  audio.osc.type = "sine";
  audio.osc.frequency.value = TONE_HZ;
  audio.osc.connect(audio.panner);
  audio.gain.gain.cancelScheduledValues(t);
  audio.gain.gain.setValueAtTime(0, t);
  audio.gain.gain.linearRampToValueAtTime(TONE_GAIN, t + 0.5);
  audio.osc.start();
}

function stopTone(immediate = false) {
  if (!audio.osc || !audio.ctx) return;
  const osc = audio.osc;
  audio.osc = null;
  const t = audio.ctx.currentTime;
  const fade = immediate ? 0 : 0.2;
  audio.gain.gain.cancelScheduledValues(t);
  audio.gain.gain.setValueAtTime(audio.gain.gain.value, t);
  audio.gain.gain.linearRampToValueAtTime(0, t + fade);
  osc.stop(t + fade + 0.05);
  osc.onended = () => osc.disconnect();
}

function pan(x) {
  if (audio.panner) audio.panner.pan.value = x * 0.85;
}

// Session

function startSession() {
  if (state.running) return;
  state.running = true;
  state.startedAt = performance.now();
  ui.stage.hidden = false;
  readColors();
  resize();
  if (state.audio) startTone();
  state.frame = requestAnimationFrame(loop);
}

function stopSession() {
  if (!state.running) return;
  state.running = false;
  cancelAnimationFrame(state.frame);
  stopTone();
  ui.stage.hidden = true;
  ui.start.focus();
}

function loop(now) {
  if (!state.running) return;
  state.frame = requestAnimationFrame(loop);

  const w = ui.stage.clientWidth;
  const h = ui.stage.clientHeight;
  const elapsed = (now - state.startedAt) / 1000;
  const x = Math.sin(2 * Math.PI * state.speed * elapsed);

  const padding = w * 0.1;
  const range = w / 2 - padding;
  const cx = w / 2 + x * range;
  const cy = h / 2;

  ctx.fillStyle = state.colors.trail;
  ctx.fillRect(0, 0, w, h);
  ctx.beginPath();
  ctx.arc(cx, cy, state.size / 2, 0, Math.PI * 2);
  ctx.fillStyle = state.colors.text;
  ctx.fill();

  if (state.audio) pan(x);
}

// Grounding: box breathing, four seconds per phase. The circle's scale is a
// CSS transition; this only flips the class and the word on phase change.

const BREATH = [
  ["Breathe in", true],
  ["Hold", true],
  ["Breathe out", false],
  ["Hold", false],
];
let breathTimer = 0;
let breathPhase = 0;

function startGrounding() {
  if (state.grounding) return;
  state.grounding = true;
  stopSession();
  ui.grounding.hidden = false;
  breathPhase = 0;
  applyBreath();
  breathTimer = setInterval(() => {
    breathPhase = (breathPhase + 1) % BREATH.length;
    applyBreath();
  }, BREATH_PHASE_MS);
  ui.back.focus();
}

function applyBreath() {
  const [word, grown] = BREATH[breathPhase];
  ui.breathWord.textContent = word;
  ui.breath.classList.toggle("in", grown);
}

function stopGrounding() {
  if (!state.grounding) return;
  state.grounding = false;
  clearInterval(breathTimer);
  ui.grounding.hidden = true;
  ui.breath.classList.remove("in");
  ui.start.focus();
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else {
    document.documentElement.requestFullscreen?.();
  }
}

// Events

ui.speed.addEventListener("input", () => {
  state.speed = parseFloat(ui.speed.value);
  render();
  save();
});
ui.size.addEventListener("input", () => {
  state.size = parseInt(ui.size.value, 10);
  render();
  save();
});
ui.audio.addEventListener("change", () => {
  state.audio = ui.audio.checked;
  save();
  if (state.running) state.audio ? startTone() : stopTone();
});

ui.start.addEventListener("click", startSession);
ui.ground.addEventListener("click", startGrounding);
ui.stageGround.addEventListener("click", startGrounding);
ui.stageStop.addEventListener("click", stopSession);
ui.back.addEventListener("click", stopGrounding);

window.addEventListener("keydown", (e) => {
  const inField = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName);
  if (e.code === "Space") {
    if (state.grounding) return;
    if (!state.running && inField) return;
    e.preventDefault();
    startGrounding();
  } else if (e.code === "Escape") {
    if (state.grounding) stopGrounding();
    else if (state.running) stopSession();
  } else if (e.code === "KeyF" && (state.running || !inField)) {
    e.preventDefault();
    toggleFullscreen();
  }
});

window.addEventListener("resize", () => {
  if (state.running) resize();
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (state.running) {
    readColors();
    resize();
  }
});

load();
