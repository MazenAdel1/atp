import Landing from "@/components/sections/landing/Landing";
import Membership from "@/components/sections/membership/Membership";
import Partners from "@/components/sections/partners/Partners";
import Content from "@/components/sections/content/Content";
import Coaches from "@/components/sections/coaches/Coaches";
import Address from "@/components/sections/address/Address";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Landing />

      <section className="flex flex-col gap-28 justify-center pb-10">
        <Membership limit={4} />
        <Partners />
        <Content />
        <Coaches />
        <Address />
      </section>
    </>
  );
}
