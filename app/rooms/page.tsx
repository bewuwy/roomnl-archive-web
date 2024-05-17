import { Room, columns } from "./columns"
import { DataTable } from "./data-table"

import { createClient } from '@/lib/supabase/server'

async function getData(): Promise<Room[]> {

    const supabase = createClient();

    const data_raw = await supabase.from("rented_rooms").select().order('Contract date', {ascending: false}) //.range(0, 100);

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

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>ROOM.nl archive data</h1>
        <div className="container mx-auto py-10 flex-grow">
            <DataTable columns={columns} data={data} />
        </div>
        <h3>Number of results: {data.length}</h3>
    </main>
  )
}
