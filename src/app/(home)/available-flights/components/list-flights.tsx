import ListItemFlights from "./list-item-flight";

export default function ListFlights() {
  return (
    <div className="ticket-container flex flex-col w-full gap-6">
      <ListItemFlights />
      <ListItemFlights />
      <ListItemFlights />
      <ListItemFlights />
      <p className="text-center text-sm text-[#A0A0AC] h-fit">
        You’ve reached the end of results.
      </p>
    </div>
  );
}
