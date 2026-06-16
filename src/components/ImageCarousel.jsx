function ImageCarousel({ images = [] }) {
  if (!images.length) return null;

  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8">
      {images.map((image) => (
        <div
          key={image.id}
          className="bg-[#202632] rounded-2xl overflow-hidden border border-white/5"
        >
          <img
            src={image.image_url}
            alt={image.caption || "Carousel image"}
            className="h-72 w-full object-cover"
          />

          {image.caption && (
            <div className="p-6">
              <p className="text-slate-300 italic font-serif leading-7">
                {image.caption}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ImageCarousel;