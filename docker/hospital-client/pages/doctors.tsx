import { withAuth } from "@/components/Auth";

// Profile Page for Doctors
function DoctorProfilePage() {
  return (
    <div className="flex flex-col justify-center gap-6 text-xl items-center mt-12">
      <h1>Doctor Profile Page</h1>
      <p>Welcome to the Doctor Profile Page..!</p>
    </div>
  );
}

export default withAuth(DoctorProfilePage);
