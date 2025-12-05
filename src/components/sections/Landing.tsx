import LightningBoltAnimated from "../LightningBoltAnimated";
import { BottomLeftLandingGlow, TopRightLandingGlow } from "../Glow";

export default function Landing() {
  return (
    <section className="section justify-center text-center flex-1 h-[calc(100dvh-76px)]">
      <TopRightLandingGlow />
      <BottomLeftLandingGlow />
      <div className="flex flex-col gap-5">
        <h1 className="text-7xl font-black">
          أطلق العنان{" "}
          <span className="text-yellow drop-shadow-yellow drop-shadow-back">
            لطاقتك
          </span>{" "}
          <span className="inline-block align-middle -mr-3">
            <LightningBoltAnimated />
          </span>
        </h1>
        <p className="text-2xl font-light text-white/80">
          استمتع برفاهية لا مثيل لها، ومعدات متطورة، وإرشادات الخبراء في رحلتك
          نحو قمة التميز البدني.
        </p>
      </div>
      <button className="bg-yellow text-black py-2 min-w-40 rounded-sm font-medium hover:bg-transparent hover:text-yellow hover:ring hover:ring-yellow transition">
        انضم الآن
      </button>
    </section>
  );
}
