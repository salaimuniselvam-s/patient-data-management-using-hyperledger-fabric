import { withAuth } from "@/components/Auth";

function AdminProfilePage() {
  return (
    <div className="flex flex-col justify-center gap-6 text-xl items-center mt-12">
      <h1>Admin Profile Page</h1>
      <p>Welcome to the Admin Profile Page..!</p>
    </div>
  );
}

export default withAuth(AdminProfilePage);
