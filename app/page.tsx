import StackedLists from "@/components/stacked-lists";
import { getWasteData } from "@/app/api/waste"

export default async function Page() {
  const { waste } = await getWasteData();

  return (
    <StackedLists wasteSchedule={waste} />
  );
}