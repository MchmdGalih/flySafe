"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButtonForm from "../../components/submit-button-form";
import type { Airplane, Flight } from "@prisma/client";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { useFormState } from "react-dom";
import { saveFlight, updateFlight } from "../libs/actions";
import { formatDaysJs } from "@/lib/utils";

interface FormAirplanesProps {
  airplanes: Airplane[];
  type: "ADD" | "EDIT";
  defaultValues?: Flight | null;
}
const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};
export default function FormFlight({
  airplanes,
  defaultValues,
  type,
}: FormAirplanesProps) {
  const updateFlightById = (_state: ActionResult, formData: FormData) =>
    updateFlight(null, defaultValues?.id, formData);

  const [state, formAction] = useFormState(
    type === "ADD" ? saveFlight : updateFlightById,
    initialFormState
  );
  console.log("-->", defaultValues);

  return (
    <form action={formAction}>
      {state?.errorTitle !== null && (
        <div className=" my-7 bg-red-500  p-4 rounded-lg text-white">
          <div className="font-bold mb-4">{state?.errorTitle}</div>
          <ul className="list-disc list-inside">
            {state?.errorDesc?.map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 ">
          <Label htmlFor="airplaneId"> Select Airplane</Label>
          <Select name="airplaneId" defaultValue={defaultValues?.airplaneId}>
            <SelectTrigger id="airplaneId">
              <SelectValue placeholder="Select Airplanes.." />
            </SelectTrigger>
            <SelectContent>
              {airplanes.map((value) => (
                <SelectItem key={value.id} value={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 ">
          <Label htmlFor="price">Ticket Price</Label>
          <Input
            name="price"
            id="price"
            type="number"
            placeholder="Ticket price..."
            min={0}
            defaultValue={defaultValues?.price}
          />
          <span className="text-xs text-gray-800">
            The price for Business class increases by Rp. 500,000.00, and First
            class increases by Rp. 750,000.00.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2 mb-4">
        <div className="space-y-1 ">
          <Label htmlFor="depature_city">Depature City</Label>
          <Input
            name="depature_city"
            id="depature_city"
            placeholder="Depature City..."
            defaultValue={defaultValues?.depature_city}
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="depature_date">Depature Date</Label>
          <Input
            type="datetime-local"
            name="depature_date"
            id="depature_date"
            placeholder="Depature Date..."
            className="block"
            defaultValue={formatDaysJs(
              defaultValues?.depature_date,
              "YYYY-MM-DDTHH:MM"
            )}
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="depature_city_code"> Depature City Code</Label>
          <Input
            name="depature_city_code"
            id="depature_city_code"
            placeholder="Depature City Code..."
            defaultValue={defaultValues?.depature_city_code}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2 mb-4">
        <div className="space-y-1 ">
          <Label htmlFor="destination_city"> Destination City</Label>
          <Input
            name="destination_city"
            id="destination_city"
            placeholder="Destination City..."
            defaultValue={defaultValues?.destination_city}
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="arrival_date"> Arrival Date</Label>
          <Input
            type="datetime-local"
            name="arrival_date"
            id="arrival_date"
            placeholder="Arrival Date..."
            className="block"
            defaultValue={defaultValues?.arrival_date}
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="destination_city_code"> Destination City Code</Label>
          <Input
            name="destination_city_code"
            id="destination_city_code"
            placeholder="Destination City Code..."
            defaultValue={defaultValues?.destination_city_code}
          />
        </div>
      </div>

      <SubmitButtonForm />
    </form>
  );
}
