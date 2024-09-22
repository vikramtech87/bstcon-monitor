import { z } from "zod";

export const SoapPaymentTransactionStatusSchema = z.object({
  Registration: z.coerce.string(),
  Transid: z.coerce.string(),
  BankTransid: z.coerce.string().optional(),
  Authid: z.coerce.string().optional(),
  ResultCode: z.coerce.string(),
  Result: z.string(),
  TranDetails: z.string(),
});

export type SoapPaymentTransactionStatus = z.infer<
  typeof SoapPaymentTransactionStatusSchema
>;
