import { groupByWasteType } from "@/utils/scrapper/group-waste";
import StackedLists from "@/components/stacked-lists";
import SwitchData from "@/components/switch-data";
import fetcher from "@/utils/fetcher";
import { Suspense } from "react";

export const revalidate = 60 * 60 * 6;

export default async function Page() {
  const { error, data } = await fetcher("/api/waste/selective", {
    next: {
      revalidate
    }
  });

  let selective = null;
  if (data?.waste?.selective) {
    selective = groupByWasteType(data?.waste?.selective);
  }

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-24">
          <header className="space-y-4">
            {!error && data?.metadata?.title && (
              <h1 className="text-3xl leading-9 font-extrabold text-slate-900 tracking-tight sm:text-4xl sm:leading-10">
                {data?.metadata?.title}
              </h1>
            )}

            {!error && data?.metadata?.subtitle && (
              <p className="text-xl leading-7 text-slate-900">
                {data?.metadata?.subtitle}
              </p>
            )}

            {!error && data?.original_data_url && (
              <p className="text-sm leading-7 text-slate-900">
                Projekt korzysta z publicznie dostępnych danych {" "}

                <a href={data?.original_data_url} className="underline underline-offset-auto ">
                  www.odpadykomunalne.tczew.pl
                </a>
              </p>
            )}

            <Suspense fallback={<p>Trwa ładowanie danych...</p>}>
              {!error && data?.waste?.selective && (
                <div className="flex justify-center">
                  <SwitchData />
                </div>
              )}
            </Suspense>
          </header>

          {!error && data?.waste?.selective && (
            <div className=" max-h-96">
              <StackedLists wasteSchedule={selective} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}