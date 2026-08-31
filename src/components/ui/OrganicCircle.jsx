const SEGMENTS = 26;
const R = 96;
const CX = 120;
const CY = 120;
const N = 3.4;
const WOBBLE = 0.035;

function buildBlobPath() {
  const pts = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const a = (i / SEGMENTS) * Math.PI * 2;
    const cs = Math.abs(Math.cos(a)) ** (2 / N);
    const ss = Math.abs(Math.sin(a)) ** (2 / N);
    let r = R / (cs + ss) ** (1 / N);
    r *= 1 + (WOBBLE * (Math.sin(a * 3) + Math.sin(a * 5 + 1.3))) / 2;
    pts.push([CX + Math.cos(a) * r, CY + Math.sin(a) * r]);
  }

  const seg = (p) => p.map((v) => v.toFixed(2)).join(' ');
  let d = `M${seg(pts[0])}`;
  for (let i = 0; i < SEGMENTS; i++) {
    const p0 = pts[(i - 1 + SEGMENTS) % SEGMENTS];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % SEGMENTS];
    const p3 = pts[(i + 2) % SEGMENTS];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${seg(c1)} ${seg(c2)} ${seg(p2)}`;
  }
  return d + ' Z';
}

const BLOB_PATH = buildBlobPath();

const gradients = {
  sage: ['#e8f0e4', '#b3cdab'],
  forest: ['#a3bdb0', '#436957'],
  mist: ['#e6ecee', '#aec2c7'],
  sand: ['#f5efdf', '#dbc79d'],
  lilac: ['#efeaf4', '#c9b7d8'],
  peach: ['#f8eadd', '#e7b695'],
  ink: ['#273a32', '#142019'],
};

export default function OrganicCircle({ size = 120, tone = 'sage', className }) {
  const [from, to] = gradients[tone] || gradients.sage;
  const gradientId = `oc-${tone}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="40" y1="30" x2="200" y2="210" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={BLOB_PATH} fill={`url(#${gradientId})`} />
      <path
        d={BLOB_PATH}
        transform="translate(120 120) scale(0.62) translate(-120 -120)"
        fill="rgba(255,255,255,0.35)"
      />
    </svg>
  );
}