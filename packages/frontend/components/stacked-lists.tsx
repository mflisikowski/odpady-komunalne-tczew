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
    <nav className="h-full overflow-y-auto w-full">
      {Object.keys(wasteSchedule).map((wasteType) => (
        <div key={wasteType} className="relative" stacked-list-for-waste>
          <div className="sticky top-0 z-10 bg-white-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white">
            <h3>{wasteType}</h3>
          </div>
          <ul role="list" className="divide-y divide-dashed">
            {wasteSchedule[wasteType].map((waste) => (
              <li key={waste.date} className="flex gap-x-4 px-3 py-5">
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-6 text-gray-900">
                    {waste.name}
                  </p>
                  <p className="mt-1 truncate text-md leading-5 text-gray-500">
                    {waste.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
