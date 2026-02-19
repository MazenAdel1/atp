import Header from "@/components/layout/header/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="py-19">{children}</div>
    </>
  );
}
