import { Suspense } from "react";
import Membership from "@/components/sections/membership/Membership";
import { MembershipSkeleton } from "@/components/ui/Loader";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<MembershipSkeleton />}>
      <Membership />
    </Suspense>
  );
}
