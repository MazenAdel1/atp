import Header from "@/components/Header";
import Landing from "@/components/sections/Landing";
import Membership from "@/components/sections/Membership";
import Partners from "@/components/sections/Partners";
import Content from "@/components/sections/Content";
import Coaches from "@/components/sections/Coaches";
import Address from "@/components/sections/Address";

export default function Home() {
  return (
    <>
      <section className="min-h-dvh flex flex-col">
        <Header />
        <Landing />
      </section>

      <section className="flex flex-col gap-52 justify-center pb-10">
        <Membership />
        <Partners />
        <Content />
        <Coaches />
        <Address />
      </section>
    </>
  );
}
