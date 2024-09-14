import { TableCell, TableRow } from "@/components/ui/table";
import { RegistrationData } from "@/lib/types/registration-data";
import React from "react";

type RegistrationTableRowProps = {
  registration: RegistrationData;
};

const RegistrationTableRow = ({ registration }: RegistrationTableRowProps) => {
  const { profile } = registration;
  const { firstName, lastName, email, college, designation, state, title } =
    profile;
  const name = `${title} ${firstName} ${lastName}`;

  const desig = designation === "consultant" ? "Consultant" : "Postgraduate";
  const workshop = () => {
    switch (registration.workshop) {
      case "ws-fish":
        return "FISH";
      case "ws-pcr":
        return "PCR";
      default:
        return "None";
    }
  };

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{college}</TableCell>
      <TableCell>{state}</TableCell>
      <TableCell>{desig}</TableCell>
      <TableCell>{workshop()}</TableCell>
    </TableRow>
  );
};

export default RegistrationTableRow;
