import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFailedTransactions } from "@/firebase/db";
import { getTransactionStatus } from "@/gateway/check-status";
import { TransactionRow } from "./_components/transaction-row";

const VerifyFailedPage = async () => {
  const failed = await getFailedTransactions();

  const statusPromises = failed.map(
    ({ mode, registrationNumber, transactionId }) =>
      getTransactionStatus({
        bankName: mode,
        registerNumber: registrationNumber,
        transactionId,
      })
  );

  const statusResults = await Promise.all(statusPromises);
  const statuses: Record<string, { code: string; result: string }> = {};

  for (const statusResult of statusResults) {
    if (!statusResult.ok) {
      continue;
    }

    const { Transid, ResultCode, Result } = statusResult.value;
    statuses[Transid] = {
      code: ResultCode,
      result: Result,
    };
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4">Verify failed transactions</h1>
      <div className="border">
        <Table>
          <TableCaption>Failed transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status recorded</TableHead>
              <TableHead>Status actual</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {failed.map((transaction) => (
              <TransactionRow
                transactionId={transaction.transactionId}
                amount={transaction.amount}
                mode={transaction.mode}
                transactionStatus={transaction.transactionStatus}
                userId={transaction.userId}
                updatedAt={transaction.updatedAt
                  .toDate()
                  .toLocaleDateString("en-GB")}
                codeActual={statuses[transaction.transactionId]?.code}
                resultActual={statuses[transaction.transactionId]?.result}
                key={transaction.transactionId}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VerifyFailedPage;
