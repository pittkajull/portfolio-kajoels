export default function SketchUnderline({ width = 120, color = "white", pathClassName = "" }) {
  return (
    <svg viewBox={`0 0 ${width} 8`} height="8" width={width} className="mt-1">
      <path
        className={pathClassName}
        d={`M2 5 Q${width * 0.25} 2 ${width * 0.5} 5 Q${width * 0.75} 8 ${width - 2} 4`}
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}
