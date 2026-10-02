const inputs = ["Water", "FCR", "Schedules", "Environment", "Feed", "Bird weight", "Egg production", "Logs"];
const outputs = [
  { title: "Weight forecast", detail: "Expected growth over the next 2 weeks" },
  { title: "Anomaly detection", detail: "Suspected stress or disease" },
  { title: "Feed issue detected", detail: "A change to investigate" }
];
const layers = [8, 4, 3, 4, 1].map((count, layer) =>
  Array.from({ length: count }, (_, i) => ({ x: [0, 70, 180, 290, 344][layer], y: count === 1 ? 120 : 18 + (i * 204) / (count - 1) }))
);

function Network({ vertical = false }: { vertical?: boolean }) {
  const point = ({ x, y }: { x: number; y: number }) => vertical ? `${y} ${x}` : `${x} ${y}`;
  return (
    <svg viewBox={vertical ? "0 0 240 360" : "0 0 360 240"} className={vertical ? "mx-auto h-64 w-auto max-w-full lg:hidden" : "hidden h-72 w-full lg:block"} fill="none" preserveAspectRatio={vertical ? "xMidYMid meet" : "none"} aria-hidden="true">
      {layers.slice(0, -1).flatMap((nodes, layer) => nodes.flatMap((from, i) =>
        layers[layer + 1].map((to, j) => (
          <path key={`${layer}-${i}-${j}`} d={`M ${point(from)} L ${point(to)}`} className="text-tertiary" stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        ))
      ))}
      {layers.slice(0, -1).flatMap((nodes, layer) => nodes.map((from, i) => {
        const to = layers[layer + 1][i % layers[layer + 1].length];
        return <path key={`signal-${layer}-${i}`} d={`M ${point(from)} L ${point(to)}`} pathLength="1" className="poc-network-signal text-tertiary" stroke="currentColor" strokeWidth="1.5" strokeDasharray="0.06 0.94" vectorEffect="non-scaling-stroke" style={{ animationDelay: `${layer * 0.65 + i * 0.25}s` }} />;
      }))}
      {layers.slice(1, -1).flatMap((nodes, layer) => nodes.map((node, i) => (
        <g key={`node-${layer}-${i}`}>
          <circle cx={vertical ? node.y : node.x} cy={vertical ? node.x : node.y} r="6" className="text-surface" fill="currentColor" />
          <circle cx={vertical ? node.y : node.x} cy={vertical ? node.x : node.y} r="4" className="poc-network-node text-tertiary" fill="currentColor" style={{ animationDelay: `${(layer + 1) * 0.65 + i * 0.25}s` }} />
        </g>
      )))}
      <circle cx={vertical ? 120 : 344} cy={vertical ? 344 : 120} r="9" className="text-tertiary" stroke="currentColor" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
      <circle cx={vertical ? 120 : 344} cy={vertical ? 344 : 120} r="5" className="poc-network-node text-tertiary" fill="currentColor" style={{ animationDelay: "2.6s" }} />
    </svg>
  );
}

export default function POCDataFlow() {
  return (
    <figure className="mt-12 pt-8" aria-label="Farm data flows through a neural network into weight forecasts, anomaly detection, and feed issue detection.">
      <div className="grid items-center gap-5 lg:grid-cols-[180px_minmax(0,1fr)_320px] lg:gap-0">
        <div>
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant">Your farm data</p>
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1">
            {inputs.map((label) => (
              <li key={label} className="flex items-center gap-3 bg-surface-container-low px-3 py-2 font-sans text-xs text-primary">
                <span className="h-1 w-1 shrink-0 bg-tertiary" aria-hidden="true" />{label}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <p className="mb-3 text-center font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-variant">Neural network</p>
          <Network />
          <Network vertical />
        </div>
        <div>
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.1em] text-on-surface-variant">Clear insights</p>
          <ul className="bg-white">
            {outputs.map(({ title, detail }, i) => (
              <li key={title} className="poc-network-output border-t border-outline-variant px-5 py-4" style={{ borderTopWidth: "0.5px", animationDelay: `${2.6 + i * 0.3}s` }}>
                <h3 className="font-display text-base font-semibold text-primary">{title}</h3>
                <p className="mt-1 font-sans text-sm text-on-surface-variant">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
