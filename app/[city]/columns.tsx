"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Room = {
  address: string
  city: string
  type: string
  reactions_num: number
  contract_date: Date
  account_age: number
  priority: boolean
}

export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "address",
    header: "Address",
  },
  // {
  //   accessorKey: "city",
  //   header: "City",
  // },
  {
    accessorKey: "type",
    header: "Type of room",
  },
  {
    accessorKey: "reactions_num",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reactions
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <span className="flex justify-start ml-4">{row.getValue("reactions_num")}</span>
    }
  },
  {
    accessorKey: "contract_date",
    sortingFn: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contract date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("contract_date");

      // convert from Y-m-d to d.m.Y
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      let month_str = month.toString();
      if (month < 10) {
        month_str = `0${month}`;
      }

      return <span className="flex ml-4">{`${day}.${month_str}.${year}`}</span>;
    },
  },
  {
    accessorKey: "account_age",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account age
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const days = parseInt(row.getValue("account_age"))
      
      // format to human readable time delta - e.g. 1year 3 months 2 days
      const years = Math.floor(days / 365)
      const months = Math.floor((days % 365) / 30)
      const remainingDays = days % 30

      let formatted = ""
      if (years) {
        formatted += `${years} year${years > 1 ? "s" : ""} `
      }
      if (months) {
        formatted += `${months} month${months > 1 ? "s" : ""} `
      }
      if (remainingDays) {
        formatted += `${remainingDays} day${remainingDays > 1 ? "s" : ""}`
      }
 
      return formatted
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-3">
          Priority
          <Switch title="Show only rooms rented with priority" onCheckedChange={(checked) => {

            if (checked) {
              column.setFilterValue(true)
            } else {
              column.setFilterValue(null)
            }

          }} />
        </div>
      )
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority");

      let symbol = "❌";

      if (priority) {
        symbol = "✅";
      }

      // return center-aligned symbol
      return <span className="flex justify-center">{symbol}</span>;
    },
  },
]
