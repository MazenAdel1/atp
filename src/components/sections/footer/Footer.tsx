import { LINKS_LIST } from "@/lib/consts";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-gray/50 border-t bg-black" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {/* Logo and Description */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Image
              src="/imgs/logo/atp-gym-logo-no-bg.png"
              alt="شعار نادي ATP"
              width={500}
              height={500}
              className="w-32 object-contain"
            />
            <p className="max-w-xs text-center text-sm text-gray-400 md:text-right">
              حوّل جسمك وعقلك في جيم ATP. رحلتك نحو التميز في اللياقة البدنية
              تبدأ من هنا.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-yellow text-lg font-semibold">روابط سريعة</h3>
            <nav className="flex flex-col gap-2 text-center">
              {LINKS_LIST.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-yellow text-gray-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media and Contact */}
          <div className="flex w-fit flex-col items-center gap-4 justify-self-end md:items-start">
            <h3 className="text-yellow text-end text-lg font-semibold">
              تابعنا
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/ATPGYMdamanhour/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray hover:bg-yellow flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:text-black"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/atp_gym_damanhour/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray hover:bg-yellow flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:text-black"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-gray/50 mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} جيم ATP. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-2">
              <span>صُنع بواسطة</span>
              <a
                href="https://www.linkedin.com/in/mazen-adel-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:text-orange font-medium transition-colors"
              >
                مازن عادل
              </a>
              <span>&</span>
              <a
                href="https://www.linkedin.com/in/mohamed-harby-b5808a388/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:text-orange font-medium transition-colors"
              >
                محمد حربي
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
