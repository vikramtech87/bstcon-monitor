import { getFinances } from "@/firebase/db";
import React from "react";
import FinanceTable from "./_components/finance-table";

const FinacePage = async () => {
  const finances = await getFinances();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4">Finance</h1>
      <div className="border">
        <FinanceTable finances={finances} />
      </div>
    </div>
  );
};

export default FinacePage;
