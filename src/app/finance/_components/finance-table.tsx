import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinanceData } from "@/lib/types/finance-data";
import React from "react";
import FinanceTableRow from "./finance-table-row";

type FinanceTableProps = {
  finances: Record<string, FinanceData>;
};

const FinanceTable = ({ finances }: FinanceTableProps) => {
  const data = Object.keys(finances).map((key) => finances[key]);

  const filtered = data.filter((finance) => finance.transactions.length > 0);

  return (
    <Table className="text-sm">
      <TableCaption>
        {filtered.length} of {data.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Successful</TableHead>
          <TableHead>Failure</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((finance) => (
          <FinanceTableRow key={finance.profile.userId} finance={finance} />
        ))}
      </TableBody>
    </Table>
  );
};

export default FinanceTable;
