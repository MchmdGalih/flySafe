import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSkeletonAirlines() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">Airlines</p>
      {[0, 1, 3].map((val) => (
        <label
          key={`${val}`}
          className="font-semibold flex items-center gap-[10px] text-white"
        >
          <Skeleton className="w-[25px] h-[25px] bg-white rounded" />
          <Skeleton className="w-[150px] h-[5px] bg-white rounded" />
        </label>
      ))}
    </div>
  );
}
