import { Dashboard } from "@/components/dashboard/Dashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  // Map login roles to dashboard roles
  const mapRole = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "admin";
      case "doctor":
        return "ward_doctor";
      case "nurse":
        return "nurse";
      case "registrar":
        return "registrar_clerk";
      default:
        return "registrar_clerk";
    }
  };

  const userRole = mapRole(user?.role);

  // Show AdminDashboard for admin role, regular Dashboard for others
  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return (
    <Dashboard
      userRole={
        userRole as "admin" | "registrar_clerk" | "ward_doctor" | "nurse"
      }
    />
  );
};

export default Index;
