import ChooseForm from "@/components/choose-form";
import fetcher from "@/utils/fetcher";

export default async function Page() {
  const { error, data } = await fetcher("/api/waste/streets");

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <header className="space-y-4">
        <h1 className="text-3xl leading-9 font-extrabold text-slate-900 tracking-tight sm:text-4xl sm:leading-10">
          Harmonogram
        </h1>

        <p className="text-md leading-7 text-slate-900">
          Wyszukaj harmonogram odbioru śmieci dla swojej lokalizacji
        </p>
      </header>

      {error && (
        <div className="text-red-500">
          An error occurred: {error.message}
        </div>
      )}

      {!error && data.streets && <ChooseForm streets={data.streets} />}
    </div>
  )
}
