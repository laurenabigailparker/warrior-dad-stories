import { Link, useSearchParams } from "react-router-dom";

function ThankYou() {
  const [searchParams] = useSearchParams();
  const isOrder = searchParams.get("type") === "order";

  return (
    <main className="min-h-screen bg-[#11141b] text-white flex items-center justify-center px-8">
      <div className="max-w-2xl text-center">
        <p className="text-[#c8a96a] uppercase tracking-[0.35em] text-[11px]">
          {isOrder ? "Order Confirmed" : "Message Received"}
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-black uppercase">
          Thank You
        </h1>

        {isOrder ? (
          <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
            Thank you for supporting Warrior Dad Stories.
            <br />
            <br />
            Your order has been successfully received and is now being prepared
            for fulfillment. You'll receive email updates as your order moves
            through production and ships to your doorstep.
            <br />
            <br />
            Every purchase helps support the mission of honoring service,
            fatherhood, leadership, and legacy.
          </p>
        ) : (
          <p className="mt-8 text-slate-300 italic font-serif text-xl leading-9">
            Your message has been delivered to Warrior Dad Stories.
            Thank you for reaching out and joining the mission.
            We'll be in touch as soon as possible.
          </p>
        )}

        <Link
          to={isOrder ? "/shop" : "/"}
          className="inline-block mt-10 bg-[#c8a96a] text-black px-10 py-4 uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
        >
          {isOrder ? "Continue Shopping" : "Return To Site"}
        </Link>
      </div>
    </main>
  );
}

export default ThankYou;