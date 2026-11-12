const sources = [
  { k: "Vision", v: "Egg counts and bird activity, from cameras on the farm" },
  { k: "House", v: "Temperature, humidity, CO₂, ammonia, feed and water" },
  { k: "Controllers", v: "The poultry systems already running the house" },
  { k: "Company", v: "The records you choose to open — work, reports, open issues" }
];

const jobs = [
  { k: "Issues", v: "Catch what is shifting in the house or in the records" },
  { k: "Reports", v: "Build the summary the team would otherwise assemble by hand" },
  { k: "Birds", v: "Follow counts, activity and production" },
  { k: "Work", v: "Follow the people on a job, and the issues still open" },
  { k: "Inefficiency", v: "Notice where the house is working harder than the result" },
  { k: "Hours", v: "Keep reading after the shift has ended" }
];

function Column({
  label,
  items
}: {
  label: string;
  items: { k: string; v: string }[];
}) {
  return (
    <div className="bg-surface-container-lowest" style={{ border: "0.5px solid #BEC8CA" }}>
      <p className="px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary" style={{ borderBottom: "0.5px solid #BEC8CA" }}>
        {label}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.k} className="px-4 py-3" style={{ borderTop: "0.5px solid #BEC8CA" }}>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-sensing">{item.k}</p>
            <p className="mt-1 font-sans text-sm leading-relaxed text-on-surface">{item.v}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ConnectorField() {
  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_168px_1fr] lg:items-stretch">
      <Column label="Data you own" items={sources} />
      <div
        className="flex flex-col items-center justify-center gap-3 bg-primary px-4 py-8 text-center"
      >
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-light">
          Connector
        </span>
        <span aria-hidden="true" className="block h-10 w-px bg-primary-light/70" />
        <p className="font-display text-lg font-semibold leading-tight text-white">
          Secure connection
        </p>
        <p className="font-sans text-xs leading-relaxed text-white/70">
          We connect to the data. We do not take it.
        </p>
        <span aria-hidden="true" className="block h-10 w-px bg-primary-light/70" />
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-light">
          Agents
        </span>
      </div>
      <Column label="What the agents stay on" items={jobs} />
    </div>
  );
}
