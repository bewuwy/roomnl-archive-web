import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    { 
        id: "918fasda",
        amount: 139,
        status: "success",
        email: "e@ex.com"
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>ROOM.nl archive data</h1>
        <div className="container mx-auto py-10 flex-grow">
            <DataTable columns={columns} data={data} />
        </div>
    </main>
  )
}
