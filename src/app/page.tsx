import { Suspense } from "react";
import Landing from "@/components/sections/landing/Landing";
import Membership from "@/components/sections/membership/Membership";
import Partners from "@/components/sections/partners/Partners";
import Content from "@/components/sections/content/Content";
import Coaches from "@/components/sections/coaches/Coaches";
import Address from "@/components/sections/address/Address";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/footer/Footer";
import {
  MembershipSkeleton,
  PartnersSkeleton,
  CoachesSkeleton,
} from "@/components/ui/Loader";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <Landing />

      <section className="flex flex-col justify-center gap-14 pb-10">
        <Suspense fallback={<MembershipSkeleton />}>
          <Membership limit={4} />
        </Suspense>
        <Suspense fallback={<PartnersSkeleton />}>
          <Partners />
        </Suspense>
        <Content />
        <Suspense fallback={<CoachesSkeleton />}>
          <Coaches />
        </Suspense>
        <Address />
      </section>

      <Footer />
    </>
  );
}
