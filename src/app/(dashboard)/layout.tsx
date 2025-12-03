import SideBar from "@/components/my/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 pt-16">
      <SideBar />
      <main className="flex-1 px-4 md:px-6 py-4 md:py-6 overflow-y-scroll h-[calc(100vh-64px)]">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
