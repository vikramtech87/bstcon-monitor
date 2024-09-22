export type SoapErrorCode =
  | "soap-error/request-error"
  | "soap-error/process-error"
  | "soap-error/response-error";

export class SoapError extends Error {
  code: SoapErrorCode;

  constructor(code: SoapErrorCode) {
    super(code);
    this.code = code;
  }
}
