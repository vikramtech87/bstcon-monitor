"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cancelInitiatedAction } from "@/lib/actions/cancel-initiated-action";
import { TransactionData } from "@/lib/types/transaction-data";
import { toAmount } from "@/lib/utils";
import clsx from "clsx";

type TransactionRowProps = {
  transactionId: string;
  userId: string;
  mode: string;
  amount: number;
  updatedAt: string;
  codeActual?: string;
  resultActual?: string;
  transactionStatus: TransactionData["transactionStatus"];
};

export const TransactionRow = ({
  transactionId,
  codeActual,
  resultActual,
  mode,
  amount,
  updatedAt,
  transactionStatus,
}: TransactionRowProps) => {
  let statusActual = "ERROR";
  if (resultActual !== undefined) {
    statusActual = resultActual;
  }
  if (codeActual !== undefined) {
    statusActual += ` [${codeActual}]`;
  }

  const isSuccess = resultActual === "PAID";
  const cancelInitiation =
    transactionStatus === "INITIATED" && statusActual === "ERROR";

  const requireAction = isSuccess || cancelInitiation;
  const rowClasses = clsx({
    "bg-red-200 text-red-900": requireAction,
  });
  return (
    <TableRow className={rowClasses}>
      <TableCell>{transactionId}</TableCell>
      <TableCell>{mode}</TableCell>
      <TableCell>{toAmount(amount)}</TableCell>
      <TableCell>{transactionStatus}</TableCell>
      <TableCell>{statusActual}</TableCell>
      <TableCell>{updatedAt}</TableCell>
      <TableCell>
        {cancelInitiation && (
          <Button onClick={() => cancelInitiatedAction(transactionId)}>
            Rectify
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};
