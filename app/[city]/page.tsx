import { Metadata } from "next";
import { Room, columns } from "./columns"
import { DataTable } from "./data-table"

import { createClient } from '@/lib/supabase/server'

export function generateMetadata({
    params: { city },
}:{
    params: { city: string }
}): Metadata {
    return {
        title: `ROOM.nl archive - ${city}`,
        description: `Archive of ROOM.nl recently rented rooms data in ${city}`,
    };
}

async function getData(city: string, from: string | undefined, to: string | undefined): Promise<Room[]> {

    const supabase = createClient();

    if (from == undefined || from === "" || from === "null") {
        from = "2000-01-1"
    }
    else {
        let from_date = new Date(from);
        from = from_date.getFullYear() + "-" + (from_date.getMonth() + 1) + "-" + from_date.getDate();
    }

    if (to == undefined || to === "" || to === "null") {
        to = "2300-01-1"
    }
    else {
        let to_date = new Date(to);
        to = to_date.getFullYear() + "-" + (to_date.getMonth() + 1) + "-" + to_date.getDate();
    }

    const data_raw = await supabase.from("rented_rooms").select()
        .ilike("City", `${city}%`).gte('Contract date', from).lte('Contract date', to)
        .order('Contract date', {ascending: false}); // .range(0, 100);

    if (data_raw.error) {
        // throw error
        throw new Error("Error fetching data from Supabase:\n" + data_raw.error.details);
    }

    if (!data_raw.data) {
        return [];
    }

    let data: Room[] = [];

    data_raw.data.forEach(room_raw => {
        data.push({
            address: room_raw['Current address'],
            city: room_raw['City'],
            type: room_raw['Type of room'],
            reactions_num: room_raw['Number of reactions'],
            contract_date: new Date(room_raw['Contract date']),
            account_age: room_raw['Account age'],
            priority: room_raw['Priority'],
        });
    });

    return data;
}

export default async function DataPage({ params, searchParams }: { params: { city: string }, searchParams: { [key: string]: string | undefined }}) {

  const data = await getData(params.city, searchParams.from, searchParams.to);

  return (
    <>
        <h1>ROOM.nl archive data in <b>{params.city}</b></h1>
        <div className="container mx-auto py-10 flex-grow">
            <DataTable columns={columns} data={data} props={
                { from_date: searchParams.from, to_date: searchParams.to, city: params.city }
            } />
        </div>
        <h3>Number of results: {data.length}</h3>
    </>
  )
}
