import { cn } from '../../lib/cn';

const palettes = {
  sage: ['#f5f8f3', '#e8f0e4', '#d3e2cc'],
  forest: ['#e4ece7', '#c9d9d0', '#a3bdb0'],
  mist: ['#f4f7f8', '#e6ecee', '#cfdcdf'],
  sand: ['#fbf8f2', '#f5efdf', '#eaddc2'],
  dusk: ['#a3bdb0', '#789d8b', '#436957'],
};

export default function Landscape({
  tone = 'sage',
  className,
  sun = true,
  hills = 3,
  mirror = false,
}) {
  const [far, midFront, near] = palettes[tone] || palettes.sage;
  const layers = [
    { d: 'M0 150 C 90 90 170 96 240 132 L 240 240 L 0 240 Z', fill: far },
    { d: 'M0 180 C 80 122 176 128 240 168 L 240 240 L 0 240 Z', fill: midFront },
    { d: 'M0 214 C 96 160 180 176 240 204 L 240 240 L 0 240 Z', fill: near },
  ].slice(-hills);

  return (
    <svg
      viewBox="0 0 240 240"
      className={cn('block h-auto w-full', mirror && '-scale-x-100', className)}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      {sun && <circle cx="176" cy="64" r="26" fill="rgba(255,255,255,0.5)" />}
      {layers.map((layer, i) => (
        <path key={i} d={layer.d} fill={layer.fill} />
      ))}
    </svg>
  );
}