export default function SchedulingCard() {
  return (
            <div
              className="bg-surface-container-lowest px-8 py-7"
              style={{ border: "0.5px solid #BEC8CA" }}
            >
              <h2 className="font-display text-title-md font-semibold tracking-[-0.02em] text-on-surface">
                Book a call
              </h2>
              <p className="mt-2 font-sans text-title-sm text-on-surface-variant">
                Pick a time that suits you and we will walk you through a pilot.
              </p>
              <a
                className="link-underline mt-5 inline-flex"
                href="https://cal.com/placeholder"
                target="_blank"
                rel="noreferrer"
              >
                Schedule a time →
              </a>
            </div>
  );
}
