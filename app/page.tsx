import { createClient } from "@/lib/supabase/server";

import HomeForm from "./form";

export default async function Home() {

  // get cities from the database
  const subabase = createClient();
  const { data, error } = await subabase.from("distinct_cities").select();

  if (error) {
    throw new Error("Error fetching data from Supabase:\n" + error.details);
  }

  let cities: {label: string, value: string}[] = [];

  if (data) {
    data.forEach(city => {
      cities.push({
        label: city['City'],
        value: city['City']
      });
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>ROOM.nl archive data</h1>
      <HomeForm cities={cities} />
    </main>
  );
}
