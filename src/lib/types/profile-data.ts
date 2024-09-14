import { Timestamp } from "firebase-admin/firestore";

export type ProfileData = {
  userId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  college: string;
  country: string;
  createdAt: Timestamp;
  designation: "consultant" | "postgraduate";
  email: string;
  firstName: string;
  lastName: string;
  medicalCouncil: string;
  medicalCouncilNumber: string;
  mobileNumber: string;
  postalCode: string;
  registerNumber: string;
  state: string;
  title: string;
  updatedAt: Timestamp;
};
