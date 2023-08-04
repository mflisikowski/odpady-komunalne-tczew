import { groupByWasteType } from "@/utils/scrapper/group-waste";
import StackedLists from "@/components/stacked-lists";
import SwitchData from "@/components/switch-data";

export default async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/waste/mixed`, {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    }
  });

  const { original_data_url, metadata, waste } = await response.json();
  const mixed = groupByWasteType(waste.mixed);

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-24">
          <header className="space-y-4">
            <h1 className="text-3xl leading-9 font-extrabold text-slate-900 tracking-tight sm:text-4xl sm:leading-10">
              {metadata.title}
            </h1>

            <p className="text-xl leading-7 text-slate-900">
              {metadata.subtitle}
            </p>

            <p className="text-sm leading-7 text-slate-900">
              Projekt korzysta z publicznie dostępnych danych {" "}

              <a href={original_data_url} className="underline underline-offset-auto ">
                www.odpadykomunalne.tczew.pl
              </a>
            </p>

            <div className="flex justify-center">
              <SwitchData />
            </div>
          </header>

          <div className=" max-h-96 overflow-scroll">
            <StackedLists wasteSchedule={mixed} />
          </div>
        </div>
      </div>
    </div>
  )
}