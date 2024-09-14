import { UserRole } from "./user-role";

export type LinkResource = {
  role: UserRole[];
  url: string;
  label: string;
};
