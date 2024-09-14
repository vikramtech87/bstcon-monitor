import { getRegistrations } from "@/firebase/db";
import RegistrationTable from "./_components/registration-table";

const RegistrationsPage = async () => {
  const registrations = await getRegistrations();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4">Registrations</h1>
      <div className="border">
        <RegistrationTable registrations={registrations} />
      </div>
    </div>
  );
};

export default RegistrationsPage;
