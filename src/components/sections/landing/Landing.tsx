import LightningBoltAnimated from "./LightningBoltAnimated";
import { BottomLeftGlow, TopRightGlow } from "../../layout/Glow";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="section h-dvh flex-1 justify-center pt-16 pb-0 text-center md:pt-19">
      <TopRightGlow />
      <BottomLeftGlow />
      <div className="flex flex-col gap-5">
        <h1 className="animate-fade-up flex flex-wrap items-center justify-center gap-6.25 text-6xl leading-20 font-black md:text-7xl md:leading-23">
          أطلق العنان{" "}
          <span className="text-yellow drop-shadow-yellow drop-shadow-back flex items-center justify-center gap-3 justify-self-center">
            لطاقتك
            <LightningBoltAnimated />
          </span>{" "}
        </h1>
        <p className="animate-fade-up text-lg font-light text-white/80 md:text-2xl">
          استمتع برفاهية لا مثيل لها، ومعدات متطورة، وإرشادات الخبراء في رحلتك
          نحو قمة التميز البدني.
        </p>
      </div>
      <div className="animate-fade-up flex justify-center">
        <Link
          href={"/#membership"}
          className="bg-yellow hover:text-yellow hover:ring-yellow min-w-40 py-2 font-medium text-black transition hover:bg-transparent hover:ring"
        >
          انضم الآن
        </Link>
      </div>
    </main>
  );
}
