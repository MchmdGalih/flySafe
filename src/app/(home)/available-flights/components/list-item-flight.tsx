import Image from "next/image";
import type { FlightWithPlane } from "../provider/flihght-provider";
import { getFileUrl } from "@/lib/supabase";
import { formatDaysJs, formatRupiah } from "@/lib/utils";

interface FlightItemProps {
  data: FlightWithPlane;
}

export default function ListItemFlights({ data }: FlightItemProps) {
  console.log("ini dataa-->", { data });
  return (
    <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
      <div className="flex gap-[16px] items-center">
        <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
          <Image
            width={60}
            height={60}
            src={getFileUrl(data.airplane.image)}
            className="w-full h-full object-cover"
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col justify-center-center gap-[2px]">
          <p className="font-bold text-lg">{data.airplane.name}</p>
          <p className="text-sm text-flysha-off-purple">Business Class</p>
        </div>
      </div>
      <div className="flex items-center gap-[30px]">
        <div className="flex flex-col gap-[2px] text-center">
          <p className="font-bold text-lg">
            {formatDaysJs(data.depature_date, "HH:mm")}
          </p>
          <p className="text-sm text-flysha-off-purple">
            {data.depature_city_code}
          </p>
        </div>
        <Image
          width={60}
          height={60}
          src="/assets/images/icons/plane-dotted.svg"
          alt="icon"
        />
        <div className="flex flex-col gap-[2px] text-center">
          <p className="font-bold text-lg">
            {formatDaysJs(data.arrival_date, "HH:mm")}
          </p>
          <p className="text-sm text-flysha-off-purple">
            {data.destination_city_code}
          </p>
        </div>
      </div>
      <p className="w-fit h-fit font-bold text-lg">
        {formatRupiah(data.price)}
      </p>
      <a
        href="#"
        className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
      >
        Book Flight
      </a>
    </div>
  );
}
