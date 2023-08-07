import { daysUntil } from "@/utils/days-until";
import { StackedListsItem } from "./stacked-lists-item";

export default function StackedLists({
  wasteSchedule: wasteSchedule,
}: {
    wasteSchedule: any;
}) {
  return (
    <nav>
      {Object.keys(wasteSchedule).map((wasteType) => (
        <div key={wasteType} className="relative">
          <div className="sticky top-0 z-10 bg-slate-900 text-base leading-6 text-white py-3 px-4 uppercase text-start tracking-widest">
            {wasteType}
          </div>

          <ul role="list" className="divide-y divide-dashed divide-slate-700 ">
            {wasteSchedule[wasteType].map((waste: any, index: any) => {
              const daysUntilNumber = daysUntil(waste.date);
              const isToday = daysUntilNumber === 0;
              const label = isToday ? 'dzisiaj' : `za ${daysUntilNumber} dni`;

              return <StackedListsItem key={index} date={waste.date} label={label} isToday={isToday} />;
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
