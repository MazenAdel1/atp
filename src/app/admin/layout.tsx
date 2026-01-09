import AdminHeader from "@/components/admin/AdminHeader";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
