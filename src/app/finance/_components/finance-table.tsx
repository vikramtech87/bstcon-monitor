import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FinanceData } from "@/lib/types/finance-data";
import React from "react";
import FinanceTableRow from "./finance-table-row";
import { toAmount } from "@/lib/utils";

type FinanceTableProps = {
  finances: Record<string, FinanceData>;
};

const FinanceTable = ({ finances }: FinanceTableProps) => {
  const data = Object.keys(finances).map((key) => finances[key]);

  const filtered = data.filter((finance) => finance.transactions.length > 0);

  const grandTotal = filtered.reduce((acc, curr) => {
    const total = curr.transactions
      .filter((t) => t.transactionStatus === "SUCCESS")
      .reduce((tAcc, tCurr) => {
        return tAcc + tCurr.amount;
      }, 0);
    return acc + total;
  }, 0);

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
          <TableHead>Paid</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((finance) => (
          <FinanceTableRow key={finance.profile.userId} finance={finance} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{toAmount(grandTotal)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default FinanceTable;
