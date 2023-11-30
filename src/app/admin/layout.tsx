import AdminSideNavbar from '@/src/components/AdminSideNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          <AdminSideNavbar />
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold mb-4"></h2>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
