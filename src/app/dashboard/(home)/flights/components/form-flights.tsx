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
import type { Airplane } from "@prisma/client";
import type { ActionResult } from "@/app/dashboard/(auth)/signin/form/actions";
import { useFormState } from "react-dom";
import { saveFlight } from "../libs/actions";

interface FormAirplanesProps {
  airplanes: Airplane[];
}
const initialFormState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};
export default function FormFlight({ airplanes }: FormAirplanesProps) {
  const [state, formAction] = useFormState(saveFlight, initialFormState);
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
          <Select name="airplaneId">
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
          />
          <span className="text-xs text-gray-800">
            The price for Business class increases by Rp. 500,000.00, and First
            class increases by Rp. 750,000.00.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-2 mb-4">
        <div className="space-y-1 ">
          <Label htmlFor="depature_city"> Depature City</Label>
          <Input
            name="depature_city"
            id="depature_city"
            placeholder="Depature City..."
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="depature_date"> Depature Date</Label>
          <Input
            type="datetime-local"
            name="depature_date"
            id="depature_date"
            placeholder="Depature Date..."
            className="block"
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="depature_city_code"> Depature City Code</Label>
          <Input
            name="depature_city_code"
            id="depature_city_code"
            placeholder="Depature City Code..."
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
          />
        </div>
        <div className="space-y-1 ">
          <Label htmlFor="destination_city_code"> Destination City Code</Label>
          <Input
            name="destination_city_code"
            id="destination_city_code"
            placeholder="Destination City Code..."
          />
        </div>
      </div>

      <SubmitButtonForm />
    </form>
  );
}
