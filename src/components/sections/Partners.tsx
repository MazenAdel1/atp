import Image from "next/image";
import Link from "next/link";
import { TopPartnersGlow } from "../Glow";

export default function Partners() {
  const IMGS = [
    {
      src: "opkley.jpg",
      alt: "opkley",
      about: "شركة opkley للتسويق والدعاية",
      href: "https://www.facebook.com/profile.php?id=61572265763712",
    },
    {
      src: "shalaby-labs.jpg",
      alt: "shalaby labs",
      about: "معامل شلبي للتحاليل الطبية",
      href: "https://www.facebook.com/ShalabyLabs",
    },
  ];

  return (
    <section id="partners" className="section">
      <TopPartnersGlow />
      <h2 className="title">شركاءنا</h2>
      <div className="max-w-full overflow-hidden [mask:_linear-gradient(90deg,_transparent,_white,_20%,_white,_80%,_transparent)]">
        <ul className="flex items-center gap-10 h-64 overflow-y-hidden w-max flex-nowrap animate-scroll">
          {Array(4)
            .fill(IMGS)
            .flat()
            .map((img, index) => {
              return (
                <li
                  key={index}
                  className="flex-1 rounded-md h-full overflow-hidden shrink-0 w-96 group relative"
                >
                  <Link
                    href={img.href}
                    className="bg-yellow/50 backdrop-blur-sm text-black justify-center items-center flex size-full opacity-0 group-hover:opacity-100 transition-opacity absolute text-xl font-medium"
                  >
                    <p>{img.about}</p>
                  </Link>
                  <Image
                    src={`/imgs/partners/${img.src}`}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className="size-full object-cover"
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
