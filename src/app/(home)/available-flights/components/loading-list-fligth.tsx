import React from "react";
import LoadingItemFlight from "./loading-item-flight";

function LoadingListFlight() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <LoadingItemFlight />
      <LoadingItemFlight />
      <LoadingItemFlight />
    </div>
  );
}

export default LoadingListFlight;
