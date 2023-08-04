import ChooseForm from "@/components/choose-form";

async function fetchStreets() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/waste/streets`, {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    }
  });
  const { streets } = await response.json();

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch streets data from API');
  }

  return streets;
}

export default async function Page() {
  const streets = await fetchStreets();

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

      <ChooseForm streets={streets} />
    </div>
  )
}
