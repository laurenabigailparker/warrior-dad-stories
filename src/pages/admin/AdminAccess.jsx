import { Link } from "react-router-dom";

function AdminAccess() {
  return (
    <main className="min-h-screen bg-[#080a0f] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md text-center">
        <div className="mx-auto h-14 w-14 bg-[#c8a96a] mb-8" />

        <h1 className="uppercase text-3xl font-black tracking-[0.2em]">
          Admin Access
        </h1>

        <p className="mt-4 text-slate-500 italic font-serif">
          Warrior Dad Stories Command Center
        </p>

        <div className="mt-12 bg-[#202632] rounded-lg p-8 text-left">
          <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
            Email Address
          </label>

          <input className="w-full bg-[#101118] border border-white/5 px-4 py-4 outline-none focus:border-[#c8a96a]" />

          <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mt-6 mb-3">
            Password
          </label>

          <input
            type="password"
            className="w-full bg-[#101118] border border-white/5 px-4 py-4 outline-none focus:border-[#c8a96a]"
          />

          <Link
            to="/admin/dashboard"
            className="mt-7 block text-center bg-[#c8a96a] text-black py-4 uppercase tracking-[0.22em] text-[11px] font-bold hover:bg-white transition"
          >
            Access Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

export default AdminAccess;