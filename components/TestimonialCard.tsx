export default function TestimonialCard({
  quote,
  name,
  role,
  company
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
}) {
  return (
    <div className="card flex h-full flex-col gap-6 px-8 py-8">
      <p className="font-sans text-title-sm text-on-surface-variant">"{quote}"</p>
      <div>
        <p className="font-display text-title-sm font-medium text-on-surface">{name}</p>
        <p className="mt-1 font-label text-label-md text-outline-variant">
          {role} · {company}
        </p>
      </div>
    </div>
  );
}
