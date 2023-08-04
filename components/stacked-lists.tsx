
export default function StackedLists({
  wasteSchedule: wasteSchedule,
}: {
    wasteSchedule: any;
}) {
  return (
    <nav>
      {Object.keys(wasteSchedule).map((wasteType) => (
        <div key={wasteType} className="relative">
          <div className="sticky top-0 z-10 bg-slate-900 text-base font-extrabold leading-6 text-white py-3 px-4 uppercase text-start">
            {wasteType}
          </div>
          <ul role="list" className="divide-y divide-dashed divide-slate-700 ">
            {wasteSchedule[wasteType].map((waste: any) => (
              <li key={waste.date} className="flex gap-x-4 px-3 py-5">
                <p className="mt-1 truncate text-md leading-5 text-slate-900 inline-flex font-normal">
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
