import { TransactionData } from "@/lib/types/transaction-data";
import { getAuthorizedTemplate, replaceTokens, sendSoap } from "./utils";
import statusXml from "@/templates/status";
import { SoapPaymentTransactionStatusSchema } from "@/lib/schemas/soap-payment-transaction-status";

type PaymentStatusRequest = {
  bankName: TransactionData["mode"];
  registerNumber: string;
  transactionId: string;
};

const getPaymentStatusXml = ({
  registerNumber,
  bankName,
  transactionId,
}: PaymentStatusRequest) => {
  const replacements = {
    BankName: bankName,
    TransactionId: transactionId,
    RegistrationNumber: registerNumber,
  };

  const authorizedTemplate = getAuthorizedTemplate(statusXml);

  return replaceTokens(authorizedTemplate, replacements);
};

export const getTransactionStatus = async (data: PaymentStatusRequest) => {
  const xml = getPaymentStatusXml(data);
  return await sendSoap(xml, SoapPaymentTransactionStatusSchema, "STATUS");
};
