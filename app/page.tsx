import { createClient } from "@/lib/supabase/server";

import HomeForm from "./form";

export default async function Home() {

  // get cities from the database
  const subabase = createClient();
  const { data, error } = await subabase.from("distinct_cities").select().order("City");

  if (error) {
    throw new Error("Error fetching data from Supabase:\n" + error.details);
  }

  let cities: {label: string, value: string}[] = [];

  if (data) {

    let data_raw = data as {City: string}[];

    data_raw.forEach(city => {
      cities.push({
        label: city['City'],
        value: city['City']
      });
    });
  }

  return (
    <>
      <h1>ROOM.nl archive data</h1>
      <HomeForm cities={cities} />
    </>
  );
}
