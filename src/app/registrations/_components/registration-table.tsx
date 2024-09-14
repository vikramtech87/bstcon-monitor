import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegistrationData } from "@/lib/types/registration-data";
import { summarize } from "@/lib/utils";
import RegistrationTableRow from "./registration-table-row";

type RegistrationTableProps = {
  registrations: Record<string, RegistrationData>;
};

const RegistrationTable = ({ registrations }: RegistrationTableProps) => {
  const data = Object.keys(registrations).map((key) => registrations[key]);

  const filtered = data.filter((registration) => {
    const { success } = summarize(registration.transactions);
    return success > 0;
  });

  return (
    <Table className="text-[0.7rem]">
      <TableCaption>
        {filtered.length} of {data.length}
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
        {filtered.map((registration) => (
          <RegistrationTableRow
            key={registration.profile.userId}
            registration={registration}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default RegistrationTable;
