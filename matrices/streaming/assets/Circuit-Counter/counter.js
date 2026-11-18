// Lord Savith counter template: background plate (everything except the live number/label/total text,
// which After Effects adds as editable Essential Graphics text). 3s @ 60fps, silent.
// Usage: node counter.js [--scale 2] [--out file.mp4]
//        node counter.js --frames 0,40,120 [--preview-dir dir]   -> preview PNGs only
const path = require('path');
const {
  RED, PURPLE, FONT, ROOT, clamp, lerp, prog, easeOutCubic, easeInOutCubic,
  parseArgs, createStage, registerFont, loadLogoKit, createBloom, drawBackdrop, drawVignette,
  styleExtruded, styleRedGlow, letterLayout, runRender,
} = require('./lib/core');
const { createCircuitField } = require('./lib/circuits');
const { polyline, rectLoop, rectLoopReverse, bus, tracePart, strokeSpan } = require('./lib/paths2d');
const SPEC = require('./lib/counterSpec');

const opts = parseArgs();
const stage = createStage(opts.scale);
const { W, H, CX, CY } = stage;
const { FPS, DUR, T_IMP, EXIT, CHIP, SHAKE } = SPEC;
const N = Math.round(FPS * DUR);
const PAD_R = 4.5, CLEAR = PAD_R + 7;

function camera(t) {
  let z = -18 * (1 - easeOutCubic(clamp(t / 0.75))) + 1.0 * t;
  if (t > EXIT[0]) z += 30 * Math.pow((t - EXIT[0]) / (EXIT[1] - EXIT[0]), 3);   // exit fly-through
  const dt = t - T_IMP;
  const amp = dt > 0 ? SHAKE.amp * Math.exp(-dt * SHAKE.decay) : 0;
  return {
    z, x: 0.04 * Math.sin(t * 0.9), y: 0.02 * Math.sin(t * 1.1 + 1),
    roll: -0.06 * (1 - easeOutCubic(clamp(t / 0.9))),
    shx: amp * Math.sin(t * SHAKE.fx), shy: amp * Math.cos(t * SHAKE.fy),
  };
}

(async () => {
  registerFont();
  const field = createCircuitField(stage, { seed: 5150 });
  const kit = await loadLogoKit(stage, 96);

  const ccx = CHIP.x + CHIP.w / 2, ccy = CHIP.y + CHIP.h / 2;
  const frame = rectLoop(CHIP.x, CHIP.y, CHIP.w, CHIP.h), frameRev = rectLoopReverse(CHIP.x, CHIP.y, CHIP.w, CHIP.h);

  // IC pins along the top and bottom edges, staggered out from the centre
  const PIN_LEN = 26, PIN_GAP = 6;
  const pinXs = [];
  for (let x = CHIP.x + 80; x <= CHIP.x + CHIP.w - 80 + 1; x += 60) pinXs.push(x);
  const mid = (pinXs.length - 1) / 2;
  const pins = pinXs.flatMap((x, i) => [-1, 1].map(dir => {
    const y0 = dir < 0 ? CHIP.y - PIN_GAP : CHIP.y + CHIP.h + PIN_GAP;
    return { line: polyline([[x, y0], [x, y0 + dir * PIN_LEN]]), t0: T_IMP + 0.05 + Math.abs(i - mid) * 0.022 };
  }));

  // circuit buses out of the chip's sides to the screen edges (end pads stay clear of the frame)
  const L0 = CHIP.x - CLEAR, R0 = CHIP.x + CHIP.w + CLEAR;
  const BUSES = [
    { pts: [[L0, ccy - 20], [300, ccy - 20], [220, ccy + 60], [44, ccy + 60]], n: 4, t0: T_IMP + 0.1 },
    { pts: [[L0, CHIP.y + CHIP.h - 70], [360, CHIP.y + CHIP.h - 70], [290, CHIP.y + CHIP.h], [44, CHIP.y + CHIP.h]], n: 2, t0: T_IMP + 0.2 },
    { pts: [[R0, ccy - 20], [W - 300, ccy - 20], [W - 220, ccy - 100], [W - 44, ccy - 100]], n: 4, t0: T_IMP + 0.1 },
    { pts: [[R0, CHIP.y + CHIP.h - 70], [W - 360, CHIP.y + CHIP.h - 70], [W - 290, CHIP.y + CHIP.h], [W - 44, CHIP.y + CHIP.h]], n: 2, t0: T_IMP + 0.2 },
  ].map(b => ({ ...b, lines: bus(b.pts, b.n, 14) }));

  // watermark: [logo] LORD SAVITH
  const WM = SPEC.WATERMARK, SZ_WM = 40;
  const wmA = letterLayout(stage, 'LORD ', SZ_WM), wmB = letterLayout(stage, 'SAVITH', SZ_WM);
  const wmW = kit.VIS + 14 + wmA.width + wmB.width;
  const wmLogoX = CX - wmW / 2 + kit.VIS / 2, wmTextX = wmLogoX + kit.VIS / 2 + 14;

  const [em, ex] = stage.layer();             // 3D traces + impact light (gets bloom)
  const [ui, ux] = stage.layer();             // chip, pins, buses, watermark (gets the exit push)
  const [main, ctx] = stage.layer();
  const bloom = createBloom(stage);

  const gradH = (c, x0, x1) => { const g = c.createLinearGradient(x0, 0, x1, 0); g.addColorStop(0, RED); g.addColorStop(1, PURPLE); return g; };
  const glowOn = (c, px, col = 'rgba(200,0,120,0.9)') => { c.shadowColor = col; c.shadowBlur = stage.shadow(px); };
  const pad = (c, [x, y]) => { c.beginPath(); c.arc(x, y, PAD_R, 0, Math.PI * 2); c.stroke(); };

  function drawChip(c, t) {
    const p = easeInOutCubic(prog(t, 0.12, 0.5));
    if (p <= 0) return;
    const { x, y, w, h } = CHIP, per = frame.total;
    c.save();
    // dark die behind the number
    c.globalAlpha = clamp(p * 1.4);
    const g = c.createRadialGradient(ccx, ccy, 0, ccx, ccy, w * 0.6);
    g.addColorStop(0, 'rgba(14,0,10,0.9)'); g.addColorStop(1, 'rgba(4,0,3,0.82)');
    c.fillStyle = g; c.fillRect(x, y, w, h);
    // border draws on from the top-left corner both ways
    c.globalAlpha = 1; c.strokeStyle = gradH(c, x, x + w); c.lineWidth = 3; c.lineJoin = 'miter';
    glowOn(c, 12);
    tracePart(c, frame, per / 2 * p); tracePart(c, frameRev, per / 2 * p);
    if (p >= 1) {
      // corner brackets + pin-1 notch
      c.lineWidth = 6; const k = 36;
      for (const [cx, cy, sx, sy] of [[x, y, 1, 1], [x + w, y, -1, 1], [x + w, y + h, -1, -1], [x, y + h, 1, -1]]) {
        c.beginPath(); c.moveTo(cx + sx * k, cy - sy * 7); c.lineTo(cx - sx * 7, cy - sy * 7); c.lineTo(cx - sx * 7, cy + sy * k); c.stroke();
      }
      c.lineWidth = 2.5; c.beginPath(); c.arc(x + 34, y + 34, 9, 0, Math.PI * 2); c.stroke();
      // light runner orbiting the frame (follows the corners)
      const s = ((t - 0.5) / 2.2) % 1 * per;
      c.strokeStyle = '#ffe6fa'; c.lineWidth = 4; glowOn(c, 16, '#fff'); c.lineCap = 'butt';
      strokeSpan(c, frame, s - 90, s, true);
    }
    c.restore();
  }

  function drawPins(c, t) {
    c.save(); c.strokeStyle = gradH(c, CHIP.x, CHIP.x + CHIP.w); c.lineWidth = 2.5; c.lineCap = 'round'; glowOn(c, 8);
    for (const pin of pins) {
      const q = easeOutCubic(prog(t, pin.t0, pin.t0 + 0.16));
      if (q <= 0) continue;
      tracePart(c, pin.line, pin.line.total * q);
      if (q >= 1) { c.lineWidth = 2; pad(c, pin.line.pts[1]); c.lineWidth = 2.5; }
    }
    c.restore();
  }

  function drawBuses(c, t) {
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    BUSES.forEach((b, bi) => {
      const p = easeOutCubic(prog(t, b.t0, b.t0 + 0.5));
      if (p <= 0) return;
      b.lines.forEach((line, k) => {
        c.globalAlpha = 0.9; c.strokeStyle = gradH(c, 0, W); c.lineWidth = 2.5; glowOn(c, 8);
        tracePart(c, line, line.total * p);
        c.lineWidth = 2; pad(c, line.pts[0]);
        if (p >= 1) pad(c, line.pts[line.pts.length - 1]);
        // data pulses running outward, following the bends
        const ph = (t - b.t0 - 0.45 + bi * 0.3 + k * 0.07) / 1.4;
        if (p >= 1 && ph > 0) {
          const s = (ph % 1) * (line.total + 80) - 40;
          if (s > 0 && s - 50 < line.total) {
            c.globalAlpha = 1; c.strokeStyle = '#ffe6fa'; c.lineWidth = 3.5; glowOn(c, 12, '#fff');
            c.lineJoin = 'miter'; c.lineCap = 'butt';
            strokeSpan(c, line, s - 50, s);
            c.lineJoin = 'round'; c.lineCap = 'round';
          }
        }
      });
    });
    c.restore();
  }

  function drawWatermark(c, t) {
    const q = easeOutCubic(prog(t, WM.start, WM.start + 0.4));
    if (q <= 0) return;
    c.save(); c.globalAlpha = q; c.translate(0, (1 - q) * 16);
    kit.draw(c, kit.logo, { x: wmLogoX, y: WM.y, s: 1 }, 1);
    const base = WM.y + SZ_WM * 0.707 / 2;
    c.font = `${SZ_WM}px ${FONT}`;
    c.save(); c.translate(wmTextX, base); styleRedGlow(stage, SZ_WM)(c, 'LORD'); c.restore();
    c.save(); c.translate(wmTextX + wmA.width, base); styleExtruded(SZ_WM, 5)(c, 'SAVITH'); c.restore();
    c.restore();
  }

  function renderFrame(t) {
    const cam = camera(t), camPrev = camera(Math.max(0, t - 1 / FPS));
    const dt = t - T_IMP;
    const ou = prog(t, EXIT[0], EXIT[1]);
    const fs_ = 1 + 0.9 * Math.pow(ou, 2.2), fa = 1 - Math.pow(ou, 1.4);

    drawBackdrop(stage, ctx);
    ex.clearRect(0, 0, W, H);
    const impactBoost = dt > 0 ? 1.4 * Math.exp(-dt * 5) : 0;
    field.drawTraces(ex, cam, t, lerp(0.8, 0.6, prog(t, 0.9, 1.4)) + impactBoost + 0.45 * (1 - prog(t, 0, 0.6)));
    field.drawMotes(ex, cam, camPrev, t, 1 + 1.2 * (1 - prog(t, 0, 0.7)));
    bloom(ctx, em);

    // UI overlay, pushed toward the camera on exit together with AE's text rig
    ux.clearRect(0, 0, W, H);
    drawBuses(ux, t);
    drawPins(ux, t);
    drawChip(ux, t);
    drawWatermark(ux, t);
    ctx.globalAlpha = fa;
    ctx.drawImage(ui, CX - W * fs_ / 2 + cam.shx, CY - H * fs_ / 2 + cam.shy, W * fs_, H * fs_);
    ctx.globalAlpha = 1;

    // impact light in front of the chip: shockwave rings + lens streak bursting out from the number
    if (dt > 0 && dt < 0.9) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (const [delay, col, wmax] of [[0, '255,235,240', 16], [0.06, '212,0,0', 22], [0.12, '160,0,138', 26]]) {
        const p = prog(dt, delay, delay + 0.65);
        if (p <= 0 || p >= 1) continue;
        const r = 140 + 1500 * easeOutCubic(p);
        ctx.globalAlpha = Math.pow(1 - p, 1.5);
        ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = wmax * (1 - p) + 1; glowOn(ctx, 18, `rgb(${col})`);
        ctx.beginPath(); ctx.ellipse(ccx + cam.shx, SPEC.COUNT.cy + cam.shy + 30, r, r * 0.32, 0, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.shadowBlur = 0;
      const sa = Math.exp(-dt * 4.5);
      const sg = ctx.createLinearGradient(0, 0, W, 0);
      sg.addColorStop(0, 'rgba(212,0,0,0)'); sg.addColorStop(0.3, 'rgba(212,0,0,0.8)'); sg.addColorStop(0.5, 'rgba(255,240,245,1)');
      sg.addColorStop(0.7, 'rgba(160,0,138,0.8)'); sg.addColorStop(1, 'rgba(160,0,138,0)');
      ctx.globalAlpha = sa; ctx.fillStyle = sg;
      ctx.fillRect(0, SPEC.COUNT.cy - 3 + cam.shy, W, 6);
      ctx.globalAlpha = sa * 0.25; ctx.fillRect(0, SPEC.COUNT.cy - 26 + cam.shy, W, 52);
      ctx.restore();
    }

    // impact flash
    if (dt > 0 && dt < 0.3) {
      const fl = ctx.createRadialGradient(ccx, SPEC.COUNT.cy, 0, ccx, SPEC.COUNT.cy, 1300);
      const a = 0.4 * Math.exp(-dt * 20);
      fl.addColorStop(0, `rgba(255,245,250,${a})`); fl.addColorStop(0.6, `rgba(255,90,160,${a * 0.2})`); fl.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = fl; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }

    drawVignette(stage, ctx);
    const black = Math.max(1 - prog(t, 0, SPEC.FADE_IN), prog(t, SPEC.FADE_OUT[0], SPEC.FADE_OUT[1]));
    if (black > 0) { ctx.fillStyle = `rgba(0,0,0,${black})`; ctx.fillRect(0, 0, W, H); }
  }

  await runRender({
    stage, fps: FPS, frames: N, renderFrame, canvas: main, name: 'counter',
    opts: { ...opts, out: opts.out || path.join(ROOT, 'counter_plate.mp4') },
  });
})();
