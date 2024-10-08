import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistrationData } from "@/lib/types/registration-data";
import RegistrationTableRow from "./registration-table-row";

type RegistrationTableProps = {
  registrations: RegistrationData[];
  totalRegistrations: number;
  filteredRegistrations: number;
};

const RegistrationTable = ({
  registrations,
  totalRegistrations,
  filteredRegistrations,
}: RegistrationTableProps) => {
  return (
    <div className="border rounded shadow">
      <Table className="text-sm">
        <TableCaption>
          {filteredRegistrations} of {totalRegistrations}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>College</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Workshop</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {registrations.map((registration) => (
            <RegistrationTableRow
              key={registration.profile.userId}
              registration={registration}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegistrationTable;
