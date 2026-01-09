import LightningBoltAnimated from "./LightningBoltAnimated";
import { BottomLeftGlow, TopRightGlow } from "../../layout/Glow";
import Link from "next/link";

export default function Landing() {
  return (
    <section className="section h-[calc(100dvh-76px)] flex-1 justify-center text-center">
      <TopRightGlow />
      <BottomLeftGlow />
      <div className="flex flex-col gap-5">
        <h1 className="text-7xl font-black">
          أطلق العنان{" "}
          <span className="text-yellow drop-shadow-yellow drop-shadow-back">
            لطاقتك
          </span>{" "}
          <span className="-mr-3 inline-block align-middle">
            <LightningBoltAnimated />
          </span>
        </h1>
        <p className="text-2xl font-light text-white/80">
          استمتع برفاهية لا مثيل لها، ومعدات متطورة، وإرشادات الخبراء في رحلتك
          نحو قمة التميز البدني.
        </p>
      </div>
      <Link
        href={"/#membership"}
        className="bg-yellow hover:text-yellow hover:ring-yellow min-w-40 py-2 font-medium text-black transition hover:bg-transparent hover:ring"
      >
        انضم الآن
      </Link>
    </section>
  );
}
