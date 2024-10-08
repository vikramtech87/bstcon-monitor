import { getRegistrations } from "@/firebase/db";
import RegistrationTableContainer from "./_components/registration-table-container";

const RegistrationsPage = async () => {
  const registrations = await getRegistrations();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4">Registrations</h1>

      <RegistrationTableContainer
        registrations={JSON.stringify(registrations)}
      />
    </div>
  );
};

export default RegistrationsPage;
