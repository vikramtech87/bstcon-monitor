"use client";

import { RegistrationData } from "@/lib/types/registration-data";
import React, { useReducer } from "react";
import RegistrationTable from "./registration-table";
import { summarize } from "@/lib/utils";
import {
  RegistrationsFilter as FilterType,
  RegistrationsFilterActions,
} from "./filter";
import RegistrationsFilter from "./registration-filter";

const initialFilter: FilterType = {
  nameEmail: "",
  designation: undefined,
  workshop: undefined,
};

function reducer(
  state: FilterType,
  action: RegistrationsFilterActions
): FilterType {
  switch (action.action) {
    case "nameEmailChanged":
      return {
        ...state,
        nameEmail: action.data,
      };
    case "workshopChanged":
      return {
        ...state,
        workshop: action.data,
      };
    case "designationChanged":
      return {
        ...state,
        designation: action.data,
      };
    case "reset":
      return initialFilter;
    default:
      throw new Error("Undefined action");
  }
}

type RegistrationContainerProps = {
  readonly registrations: string;
};

const RegistrationTableContainer = ({
  registrations,
}: RegistrationContainerProps) => {
  const [state, dispatch] = useReducer(reducer, initialFilter);

  const { nameEmail, designation, workshop } = state;

  const converted = JSON.parse(registrations) as Record<
    string,
    RegistrationData
  >;

  const data = Object.keys(converted).map((key) => converted[key]);

  const successFiltered = data.filter((registration) => {
    const { success } = summarize(registration.transactions);
    return success > 0;
  });

  const nameEmailFiltered = successFiltered.filter((registration) => {
    const fNameEmail = nameEmail.trim().toLowerCase();
    if (nameEmail.length > 0) {
      const { firstName, lastName, email } = registration.profile;
      if (firstName.toLowerCase().includes(fNameEmail)) {
        return true;
      }
      if (lastName.toLowerCase().includes(fNameEmail)) {
        return true;
      }
      return email.toLowerCase().includes(fNameEmail);
    }
    return true;
  });

  const workshopFiltered = nameEmailFiltered.filter((registration) => {
    if (workshop !== undefined) {
      return registration.workshop === workshop;
    }
    return true;
  });

  const designationFiltered = workshopFiltered.filter((registration) => {
    if (designation !== undefined) {
      return registration.profile.designation === designation;
    }
    return true;
  });

  return (
    <div className="flex flex-col space-y-4">
      <RegistrationsFilter state={state} dispatch={dispatch} />
      <RegistrationTable
        registrations={designationFiltered}
        totalRegistrations={successFiltered.length}
        filteredRegistrations={designationFiltered.length}
      />
    </div>
  );
};

export default RegistrationTableContainer;
