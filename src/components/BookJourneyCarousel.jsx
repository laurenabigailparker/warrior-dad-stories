import { useEffect, useState } from "react";

function BookJourneyCarousel({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  const active = images[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <div className="relative bg-[#202632] rounded-2xl border border-white/10 overflow-hidden">
        <img
          src={active.image_url}
          alt={active.caption || "Warrior Dad Book Journey"}
          className="w-full h-[520px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {active.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
            <p className="text-white italic font-serif text-2xl leading-9">
              {active.caption}
            </p>
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white hover:bg-[#c8a96a] hover:text-black transition"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/60 text-white hover:bg-[#c8a96a] hover:text-black transition"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all ${
                activeIndex === index
                  ? "w-10 bg-[#c8a96a]"
                  : "w-3 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookJourneyCarousel;