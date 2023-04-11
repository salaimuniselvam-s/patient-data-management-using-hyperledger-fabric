import { withAuth } from "@/components/Auth";

function PatientProfilePage() {
  return (
    <div className="flex flex-col justify-center gap-6 text-xl items-center mt-12">
      <h1>Patient Profile Page</h1>
      <p>Welcome to the Patient Profile Page..!</p>
    </div>
  );
}

export default withAuth(PatientProfilePage);
