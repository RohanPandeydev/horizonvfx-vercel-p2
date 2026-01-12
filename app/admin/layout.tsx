import AdminLayout from "@/components/admin/AdminLayout";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <AdminLayout>{children}</AdminLayout>
      </ToastProvider>
    </AuthProvider>
  );
}
