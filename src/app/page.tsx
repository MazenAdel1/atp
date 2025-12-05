import Landing from "@/components/sections/Landing";
import Membership from "@/components/sections/Membership";
import Partners from "@/components/sections/Partners";
import Content from "@/components/sections/Content";
import Coaches from "@/components/sections/Coaches";
import Address from "@/components/sections/Address";

export default function Home() {
  return (
    <>
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
