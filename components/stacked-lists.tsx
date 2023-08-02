type wasteScheduleProps = {
  [key: string]: {
    name: string;
    date: string;
  }[];
};

export default function StackedLists({
  wasteSchedule: wasteSchedule,
}: {
  wasteSchedule: wasteScheduleProps;
}) {
  return (
    <nav>
      {Object.keys(wasteSchedule).map((wasteType) => (
        <div key={wasteType} className="relative">
          <div className="sticky top-0 z-10 bg-white text-base font-extrabold leading-6 text-slate-900 py-3 px-2 uppercase">
            {wasteType}
          </div>
          <ul role="list" className="divide-y divide-dashed divide-slate-700 ">
            {wasteSchedule[wasteType].map((waste) => (
              <li key={waste.date} className="flex gap-x-4 px-3 py-5">
                <p className="mt-1 truncate text-md leading-5 text-white inline-flex font-normal">
                  - {waste.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
