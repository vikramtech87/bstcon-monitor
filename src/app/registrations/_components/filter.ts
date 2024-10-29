import { RegistrationData } from "@/lib/types/registration-data";

export type RegistrationsFilter = {
  readonly nameEmail: string;
  readonly workshop?: RegistrationData["workshop"];
  readonly designation?: RegistrationData["profile"]["designation"];
  readonly meal?: RegistrationData["meal"];
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
      readonly action: "mealChanged";
      readonly data?: RegistrationData["meal"];
    }
  | {
      readonly action: "reset";
    };
