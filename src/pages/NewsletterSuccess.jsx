import { Link } from "react-router-dom";

function NewsletterSuccess() {
  return (
    <main className="min-h-screen bg-[#11141b] text-white flex items-center justify-center px-8">
      <div className="max-w-3xl text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Mission Accepted
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase">
          Welcome To The Mission
        </h1>

        <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
          Thank you for joining Warrior Dad Stories.
          You'll receive updates on new books, The Creative Forge,
          podcast appearances, leadership content, and future projects.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
          >
            Return To Site
          </Link>

          <Link
            to="/forge"
            className="border border-[#c8a96a] text-[#c8a96a] px-10 py-4 uppercase tracking-[0.18em] text-[11px] hover:bg-[#c8a96a] hover:text-black transition"
          >
            Visit The Forge
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NewsletterSuccess;