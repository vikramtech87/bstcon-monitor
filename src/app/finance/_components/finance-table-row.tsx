import { TableCell, TableRow } from "@/components/ui/table";
import { FinanceData } from "@/lib/types/finance-data";

type FinanceTableRowProps = {
  finance: FinanceData;
};

const FinanceTableRow = ({ finance }: FinanceTableRowProps) => {
  const { profile } = finance;
  const { firstName, lastName, title } = profile;

  const name = `${title} ${firstName} ${lastName}`;

  const successful = finance.transactions.filter(
    (transaction) => transaction.transactionStatus === "SUCCESS"
  );

  const unsuccessful = finance.transactions.filter(
    (transaction) => transaction.transactionStatus !== "SUCCESS"
  );

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-green-500 font-semibold">
        <ul>
          {successful.map((transaction) => (
            <li key={transaction.transactionId}>{transaction.transactionId}</li>
          ))}
        </ul>
      </TableCell>
      <TableCell className="text-red-500 font-semibold">
        <ul>
          {unsuccessful.map((transaction) => (
            <li key={transaction.transactionId}>{transaction.transactionId}</li>
          ))}
        </ul>
      </TableCell>
    </TableRow>
  );
};

export default FinanceTableRow;
