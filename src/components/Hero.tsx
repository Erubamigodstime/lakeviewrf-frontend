// frontend/app/page.tsx (Next.js 13+)
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[500px] bg-gradient-to-r from-[#0A1C38]/90 to-[#246E71]/90 text-white text-center px-6">
      {/* Background Images */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/image1.png"
          alt="bg 1"
          width={800}
          height={600}
          className="absolute top-[5%] left-[5%] w-[45%] h-[60%] object-cover opacity-70 grayscale"
        />
        <Image
          src="/image2.png"
          alt="bg 2"
          width={800}
          height={600}
          className="absolute bottom-[10%] right-[5%] w-[40%] h-[55%] object-cover opacity-60 -rotate-3"
        />
        <Image
          src="/image3.png"
          alt="bg 3"
          width={800}
          height={600}
          className="absolute top-[20%] left-[40%] w-[35%] h-[45%] object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black/40 p-10 rounded-lg max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-lg">
          Welcome to Telehealth
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto">
          Access professional healthcare services from anywhere, anytime.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button className="bg-cyan-400 text-[#0A1C38] font-semibold px-6 py-3 rounded-lg hover:bg-cyan-500 transition">
            Get Started
          </button>
          <button className="bg-[#0A1C38] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#246E71] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
