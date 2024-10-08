import { RegistrationData } from "@/lib/types/registration-data";

export type RegistrationsFilter = {
  readonly nameEmail: string;
  readonly workshop?: RegistrationData["workshop"];
  readonly designation?: RegistrationData["profile"]["designation"];
};

export type RegistrationsFilterActions =
  | {
      readonly action: "nameEmailChanged";
      readonly data: string;
    }
  | {
      readonly action: "workshopChanged";
      readonly data?: RegistrationData["workshop"];
    }
  | {
      readonly action: "designationChanged";
      readonly data?: RegistrationData["profile"]["designation"];
    }
  | {
      readonly action: "reset";
    };
