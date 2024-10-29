import { RegistrationData } from "@/lib/types/registration-data";
import React from "react";
import {
  RegistrationsFilter as FilterType,
  RegistrationsFilterActions,
} from "./filter";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type RegistrationsFilterProps = {
  state: FilterType;
  dispatch: React.Dispatch<RegistrationsFilterActions>;
};

const RegistrationsFilter = ({ state, dispatch }: RegistrationsFilterProps) => {
  return (
    <div className="border p-2 flex items-center justify-between gap-8 rounded shadow">
      <Input
        type="text"
        value={state.nameEmail}
        placeholder="Name or Email"
        onChange={(e) =>
          dispatch({
            action: "nameEmailChanged",
            data: e.target.value,
          })
        }
      />
      <Select
        value={state.workshop}
        onValueChange={(newValue) =>
          dispatch({
            action: "workshopChanged",
            data: newValue as RegistrationData["workshop"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Workshop"
            className="text-muted-foreground"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ws-none">None</SelectItem>
          <SelectItem value="ws-pcr">PCR</SelectItem>
          <SelectItem value="ws-fish">FISH</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={state.designation}
        onValueChange={(newValue) =>
          dispatch({
            action: "designationChanged",
            data: newValue as RegistrationData["profile"]["designation"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Designation" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="postgraduate">Postgraduate</SelectItem>
          <SelectItem value="consultant">Consultant</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={state.meal}
        onValueChange={(newValue) =>
          dispatch({
            action: "mealChanged",
            data: newValue as RegistrationData["meal"],
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Meal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="veg">Veg</SelectItem>
          <SelectItem value="non-veg">Non-veg</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={() => dispatch({ action: "reset" })}>Reset</Button>
    </div>
  );
};

export default RegistrationsFilter;
