import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Contact() {
  const socials = [
    ["LinkedIn", "https://www.linkedin.com/in/thomas-tj-baird/"],
    ["Instagram", "https://www.instagram.com/tjwarriordad/"],
    ["Facebook", "https://www.facebook.com/tjwarriordad"],
    ["Business Facebook", "https://www.facebook.com/profile.php?id=61589481414986"],
    ["X", "https://x.com/TJWarriorDad"],
  ];
const [formData, setFormData] = useState({
  name: "",
  email: "",
  organization: "",
  inquiryType: "",
  message: "",
});

const [, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  const { error } = await supabase
    .from("contact_submissions")
    .insert([
      {
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        inquiry_type: formData.inquiryType,
        message: formData.message,
      },
    ]);

  setLoading(false);

  if (error) {
    console.error(error);
    alert("Failed to send message.");
    return;
  }
alert("Message sent successfully.");
  

  setFormData({
    name: "",
    email: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
};

  const speakingTopics = [
    "Leadership Through Humanity",
    "Fatherhood & Legacy",
    "Resilience Through Service",
    "Storytelling & Emotional Growth",
    "Veteran Transition & Purpose",
    "Creative Reflection Through Writing",
  ];

  return (
    <main className="min-h-screen bg-[#11141b] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#171c25] px-4 sm:px-6 md:px-20 py-20 md:py-28 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.28em] md:tracking-[0.35em] text-[10px] md:text-[11px] mb-6">
              Connect With Warrior Dad Stories
            </p>

            <h1 className="uppercase font-black text-[2.25rem] sm:text-5xl md:text-7xl leading-[1.02] max-w-full">
              Conversations <br />
              That Matter.
            </h1>

            <p className="mt-8 max-w-3xl text-slate-300 italic font-serif text-base sm:text-lg md:text-xl leading-8 md:leading-9">
              Speaking engagements, podcasts, collaborations, book events,
              leadership conversations, and storytelling opportunities rooted
              in humanity, resilience, and legacy.
            </p>

            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact-form"
                className="w-full sm:w-fit text-center bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
              >
                Send A Message
              </a>

              <Link
                to="/blog"
                className="w-full sm:w-fit text-center border border-[#c8a96a] text-[#c8a96a] px-8 py-4 uppercase tracking-[0.18em] text-[11px] hover:bg-[#c8a96a] hover:text-black transition"
              >
                Read The Stories
              </Link>
            </div>
          </div>

          <div className="bg-[#202632] border border-white/5 rounded-2xl p-6 md:p-10 max-w-full overflow-hidden">
            <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
              Warrior Dad Stories
            </p>

            <h2 className="mt-6 uppercase font-black text-[1.6rem] md:text-3xl leading-tight">
              Let’s Build Something Meaningful
            </h2>

            <p className="mt-6 text-slate-400 italic font-serif leading-8">
              Whether it’s a podcast, event, collaboration, leadership
              discussion, or community gathering — the goal remains the same:
              connection through story.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-6 border-b border-white/5 pb-4">
                <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                  Focus
                </span>

                <div className="sm:text-right">
                  <span className="text-slate-300 block">
                    Storytelling & Leadership
                  </span>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    Army Veteran • Author • Speaker
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-6 border-b border-white/5 pb-4">
                <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                  Availability
                </span>

                <span className="text-slate-300 sm:text-right">
                  Speaking · Podcasts · Media
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-6">
                <span className="text-slate-500 uppercase tracking-[0.2em] text-[10px]">
                  Platform
                </span>

                <span className="text-slate-300 sm:text-right">
                  Warrior Dad Stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT DIVIDER */}
      <section
        className="relative py-32 md:py-40 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(10,12,16,0.68),
              rgba(10,12,16,0.9)
            ),
            url('/not-just-my-story.webp')
          `,
        }}
      >
        <div className="max-w-5xl mx-auto text-center px-6 md:px-8">
          <p className="text-[#c8a96a] uppercase tracking-[0.28em] md:tracking-[0.35em] text-[10px] md:text-[11px] mb-6">
            Speaking • Leadership • Impact
          </p>

          <h2 className="uppercase font-black text-[2.55rem] sm:text-5xl md:text-7xl leading-[0.95]">
            Not Just <br />
            My Story.
          </h2>

          <h3 className="mt-8 text-[#c8a96a] uppercase font-black text-3xl md:text-5xl leading-tight">
            In Their Future.
          </h3>

          <p className="mt-8 max-w-3xl mx-auto text-slate-300 italic font-serif text-lg md:text-xl leading-8 md:leading-10">
            Every conversation, event, and story shared is an opportunity
            to create connection, encourage growth, and leave something
            meaningful behind.
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact-form" className="bg-[#11141b] px-6 md:px-20 py-24 md:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20">
          <div>
            <p className="text-[#c8a96a] uppercase tracking-[0.28em] md:tracking-[0.35em] text-[10px] md:text-[11px] mb-6">
              Send A Message
            </p>

            <h2 className="uppercase font-black text-[2.5rem] md:text-5xl leading-tight">
              Start The Conversation
            </h2>

            <p className="mt-8 max-w-3xl text-slate-400 italic font-serif text-lg md:text-xl leading-8 md:leading-9">
              Use the form below for speaking inquiries, podcast requests,
              leadership events, collaborations, media opportunities, or
              general questions.
            </p>

           <form onSubmit={handleSubmit} className="mt-12 md:mt-14 space-y-6">
  <div className="grid md:grid-cols-2 gap-6">
    <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]" required />
    <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]" required />
  </div>

  <input type="text" placeholder="Organization / Podcast / Event" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} className="w-full bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]" />

  <select value={formData.inquiryType} onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })} className="w-full bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a]" required>
    <option value="">What are you reaching out about?</option>
    <option>Speaking Event</option>
    <option>Podcast Appearance</option>
    <option>Media Inquiry</option>
    <option>Book Event</option>
    <option>Collaboration</option>
    <option>General Question</option>
  </select>

  <textarea rows="7" placeholder="Tell us more about the opportunity..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-[#202632] border border-white/10 px-6 py-5 text-white outline-none focus:border-[#c8a96a] resize-none" required />

  <button type="submit" className="w-full sm:w-fit bg-[#c8a96a] text-black px-10 py-5 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition">
    Send Message
  </button>

  <p className="text-slate-600 text-sm">
    Expected response time: 1–3 business days.
  </p>
</form>
          </div>

          {/* SIDEBAR */}
          <div>
            <div className="mb-8">
              <img
                src="/tj-authentic-portrait.png"
                alt="TJ authentic portrait"
                className="w-full h-auto max-h-[520px] object-contain rounded-2xl border border-white/10 shadow-2xl bg-[#1a1f27] p-3"
              />

              <div className="mt-8">
                <p className="text-[#c8a96a] uppercase tracking-[0.25em] md:tracking-[0.3em] text-[10px] md:text-[11px] mb-4">
                  Storytelling • Leadership • Connection
                </p>

                <p className="text-slate-300 italic font-serif text-lg leading-8">
                  Warrior Dad Stories exists to inspire reflection, resilience,
                  leadership, and meaningful connection through storytelling,
                  fatherhood, service, and lived experience.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1f27] border border-white/5 rounded-2xl p-7 md:p-10">
              <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                Speaking Topics
              </p>

              <div className="mt-8 space-y-4">
                {speakingTopics.map((topic) => (
                  <div key={topic} className="border-l border-[#c8a96a] pl-4">
                    <p className="text-slate-300">◆ {topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1f27] border border-white/5 rounded-2xl p-7 md:p-10 mt-8">
              <p className="text-[#c8a96a] uppercase tracking-[0.25em] text-[10px]">
                Follow The Journey
              </p>

              <div className="mt-8 space-y-5">
                {socials.map(([name, link]) => (
                  <a key={name} href={link} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 text-slate-300 hover:text-[#c8a96a] transition">
                    <span>{name}</span>
                    <span className="uppercase tracking-[0.2em] text-[10px] whitespace-nowrap">Visit →</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-[#202632] border border-white/5 rounded-2xl p-7 md:p-10 mt-8">
              <p className="text-slate-300 italic font-serif text-lg leading-8">
                “Warrior Dad Stories exists to inspire others to walk their path
                and share their story with the world.”
              </p>

              <p className="mt-8 text-[#c8a96a] uppercase tracking-[0.2em] text-[10px]">
                — T.J. Baird
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#202632] px-6 md:px-20 py-24 md:py-28 text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.28em] md:tracking-[0.35em] text-[10px] md:text-[11px]">
          Warrior Dad Stories
        </p>

        <h2 className="mt-6 uppercase font-black text-[2.5rem] md:text-5xl leading-tight">
          Every Story Matters. <br />
          Every Voice Counts.
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-slate-400 italic font-serif text-lg md:text-xl leading-8 md:leading-9">
          Connection begins with a story.
        </p>
      </section>

      <Footer />
    </main>
  );
}

export default Contact;