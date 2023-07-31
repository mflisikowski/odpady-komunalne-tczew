import { getWasteData } from "./api/waste";

export default async function Page() {
  const waste = await getWasteData();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">
        Harmonogram
      </h1>

      {JSON.stringify(waste)}
    </div>
  );
}