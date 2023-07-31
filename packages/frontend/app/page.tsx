// import StackedLists from "../components/stacked-lists";

// async function getData() {
//   const response = await fetch("http://localhost:3001/api/data");

//   return response.json();
// }

export default async function Page() {
  // const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center w-full mb-14">
        <h1 className=" text-3xl text-lg-6xl font-bold text-center text-gray-900 dark:text-gray-100">
          Harmonogram
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full space-y-14 ">
        {/* <StackedLists wasteSchedule={data.waste} /> */}
      </div>
    </main>
  );
}
