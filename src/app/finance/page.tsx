import { getFinances } from "@/firebase/db";
import React from "react";
import FinanceTable from "./_components/finance-table";
import Link from "next/link";

const FinacePage = async () => {
  const finances = await getFinances();
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl mb-4">Finance</h1>
        <Link href="/finance/verify-failed" className="text-blue-500">
          Verify failed transactions
        </Link>
      </div>
      <div className="border">
        <FinanceTable finances={finances} />
      </div>
    </div>
  );
};

export default FinacePage;
