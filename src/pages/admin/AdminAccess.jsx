import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

function AdminAccess() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert("Login failed. Check the email and password.");
      return;
    }

    navigate("/admin/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#080a0f] text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md text-center">
        <Link
  to="/"
  className="inline-flex items-center gap-2 mb-8 text-[#c8a96a] hover:text-white transition uppercase tracking-[0.2em] text-[11px] font-bold"
>
  ← Return To Website
</Link>
        <div className="mx-auto h-14 w-14 bg-[#c8a96a] mb-8" />

        <h1 className="uppercase text-3xl font-black tracking-[0.2em]">
          Admin Access
        </h1>

        <p className="mt-4 text-slate-500 italic font-serif">
          Warrior Dad Stories Command Center
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-12 bg-[#202632] rounded-lg p-8 text-left"
        >
          <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mb-3">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#101118] border border-white/5 px-4 py-4 outline-none focus:border-[#c8a96a]"
            required
          />

          <label className="block text-slate-400 uppercase tracking-[0.25em] text-[10px] mt-6 mb-3">
            Password
          </label>

         <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full bg-[#101118] border border-white/5 px-4 py-4 pr-20 outline-none focus:border-[#c8a96a]"
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] text-[#c8a96a]"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

          <button
            type="submit"
            className="mt-7 w-full bg-[#c8a96a] text-black py-4 uppercase tracking-[0.22em] text-[11px] font-bold hover:bg-white transition"
          >
            Access Dashboard
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminAccess;