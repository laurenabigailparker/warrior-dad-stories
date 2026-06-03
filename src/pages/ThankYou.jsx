import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <main className="min-h-screen bg-[#11141b] text-white flex items-center justify-center px-8">
      <div className="max-w-2xl text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          Message Received
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase">
          Thank You
        </h1>

        <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
          Your message has been delivered to Warrior Dad Stories.
          Thank you for reaching out and joining the mission.
          We'll be in touch as soon as possible.
        </p>

        <Link
          to="/"
          className="inline-block mt-10 bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
        >
          Return To Site
        </Link>
      </div>
    </main>
  );
}

export default ThankYou;