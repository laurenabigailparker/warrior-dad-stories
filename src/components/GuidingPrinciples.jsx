function GuidingPrinciples({ compact = false }) {
  const principles = [
    ["Smile", "Smile and the world smiles with you."],
    ["Discipline", "Discipline, thought, word, and deed."],
    ["Be Fit", "Be fit — mind, body, and spirit."],
    ["Live Fully", "Live life to its fullest."],
  ];

  return (
    <section className="bg-[#1a1f27] px-8 md:px-20 py-24">
      <div className="max-w-6xl mx-auto">
        {!compact && (
          <div className="text-center mb-16">
            <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
              Guiding Principles
            </p>

            <h2 className="mt-6 uppercase text-4xl md:text-5xl font-black">
              Lived. Not Lectured.
            </h2>
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-8">
          {principles.map(([title, text]) => (
            <div key={title} className="border-l border-[#c8a96a] pl-5">
              <h3 className="uppercase text-xl font-black">{title}</h3>
              <p className="mt-4 text-slate-400 italic font-serif leading-7">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GuidingPrinciples;