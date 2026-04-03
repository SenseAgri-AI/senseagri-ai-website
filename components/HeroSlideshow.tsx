"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    src: "/Gemini_Generated_Image_e0s5hge0s5hge0s5 (1).png",
    position: "60% center",
  },
  {
    src: "/hero_slides/53d341dc-b57d-42ac-8463-c4bc48a167de.jpg",
    position: "center 35%",
  },
  {
    src: "/hero_slides/fresh-eggs-being-held-at-a-poultry-farm-ready-for-distribution-and-sale-photo (1).jpeg",
    position: "center center",
  },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1200;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* All slides stacked — crossfade via opacity */}
      {slides.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: slide.position,
            opacity: i === current ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Permanent base dark layer — ensures text always wins on light images */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,20,25,0.45)", zIndex: 2 }}
      />

      {/* Dot indicators — bottom right, above overlay */}
      <div
        className="absolute bottom-7 right-8 flex items-center gap-2"
        style={{ zIndex: 20 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: "5px",
              width: i === current ? "22px" : "5px",
              background: i === current ? "#D4AF37" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: `width 0.35s ease, background 0.35s ease`,
            }}
          />
        ))}
      </div>
    </>
  );
}
