import { SoapError } from "@/lib/errors/soap-error";
import { Result } from "@/lib/result";
import { XMLParser } from "fast-xml-parser";
import { ZodSchema } from "zod";

export const replaceTokens = (
  templateString: string,
  tokenReplacements: Record<string, string>
) => {
  let replacedString = templateString;
  for (const token in tokenReplacements) {
    const replacement = tokenReplacements[token];
    replacedString = replacedString.replaceAll(`{{${token}}}`, replacement);
  }
  return replacedString;
};

export const drill = (obj: Record<string, any>, drillProps: string[]): any => {
  if (drillProps.length === 0) {
    return obj;
  }

  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const currentKey = drillProps[0];
  if (obj[currentKey] === undefined || obj[currentKey] === null) {
    return undefined;
  }

  return drill(obj[currentKey], drillProps.slice(1));
};

export const getAuthorizedTemplate = (templateString: string) => {
  const {
    PaymentUsername: Username,
    PaymentPassword: Password,
    PaymentProgram: Program,
    PaymentConferenceCode: ConferenceCode,
  } = process.env;
  const replacements = {
    Username: Username!,
    Password: Password!,
    Program: Program!,
    ConferenceCode: ConferenceCode!,
  };
  return replaceTokens(templateString, replacements);
};

export const sendSoap = async <T extends { ResultCode: string }>(
  xml: string,
  schema: ZodSchema<T>,
  action: "NEWPAY" | "STATUS" = "STATUS"
): Promise<Result<T, SoapError>> => {
  const headers = new Headers();
  headers.append("Content-Type", "text/xml");
  headers.append("Accept", "text/xml");

  const url = process.env.PaymentServiceLink!;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: xml,
      headers,
      cache: "no-store",
    });

    const responseText = await response.text();
    const parser = new XMLParser();
    const doc = parser.parse(responseText);

    let drillProps = ["soap:Envelope", "soap:Body"];

    if (action === "NEWPAY") {
      drillProps = [
        ...drillProps,
        "NEWCONFONLINEPAYSAVEResponse",
        "NEWCONFONLINEPAYSAVEResult",
      ];
    } else {
      drillProps = [
        ...drillProps,
        "CONFONLINEPAYSTATUSResponse",
        "CONFONLINEPAYSTATUSResult",
      ];
    }

    drillProps = [
      ...drillProps,
      "diffgr:diffgram",
      "DocumentElement",
      "conferencepay",
    ];

    const data = drill(doc, drillProps);
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      return {
        ok: false,
        error: new SoapError("soap-error/process-error"),
      };
    }

    if (parseResult.data.ResultCode !== "0") {
      return {
        ok: false,
        error: new SoapError("soap-error/response-error"),
      };
    }

    return {
      ok: true,
      value: parseResult.data,
    };
  } catch (error) {
    return {
      ok: false,
      error: new SoapError("soap-error/request-error"),
    };
  }
};
