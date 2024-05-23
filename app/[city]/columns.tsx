"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Filter } from "lucide-react"
import { Label } from "@/components/ui/label"

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
    header: ({ column }) => {

    return <Popover>
      <div className="flex justify-start items-center w-36 lg:w-52 xl:w-80">
        <span>Address</span>
        <PopoverTrigger asChild><Button variant="ghost" className="ml-2 px-2"> 
            <Filter className="h-4 w-4" /> 
        </Button></PopoverTrigger>
      </div>
      <PopoverContent className="flex flex-col gap-4 w-auto pr-8">
        <span>Filter by address:</span>
        <Input
          placeholder="Filter address..."
          className="w-64"
          value={(column.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            column.setFilterValue(event.target.value)
          } />
      </PopoverContent>
    </Popover>
    }
  },
  // {
  //   accessorKey: "city",
  //   header: "City",
  // },
  {
    accessorKey: "type",
    filterFn: (row, columnId, filterValue) => {

      // check if row is in the filter array
      if (filterValue === undefined) {
        return true;
      }

      const type = row.getValue(columnId) as string;
      return filterValue.includes(type);
    },
    header: ({ column }) => {

      function addToFilter(value: string) {
        console.log(value);

        let curr_filter = column.getFilterValue() as string[] | undefined;
        if (curr_filter === undefined) {
          curr_filter = [];
        }

        curr_filter.push(value);
        column.setFilterValue(curr_filter);

        console.log(column.getFilterValue());
      }

      function removeFromFilter(value: string) {
        console.log(value);

        let curr_filter = column.getFilterValue() as string[] | undefined;
        if (curr_filter === undefined) {
          curr_filter = [];
        }

        const index = curr_filter.indexOf(value);
        if (index > -1) {
          curr_filter.splice(index, 1);
        }
        column.setFilterValue(curr_filter);

        // if filter is empty, disable it
        if (curr_filter.length === 0) {
          column.setFilterValue(undefined);
        }
      }

      function getChecked(value: string) {
        const filter = column.getFilterValue() as string[] | undefined;
        if (filter === undefined) {
          return false;
        }

        return filter.includes(value);
      }

      return <Popover>
        <div className="flex justify-center items-center max-w-24">
          <span>Type</span>
          <PopoverTrigger asChild><Button variant="ghost" className="ml-2 px-2"> 
            <Filter className="h-4 w-4" /> 
          </Button></PopoverTrigger>
        </div>
        <PopoverContent className="flex flex-col gap-4 w-auto pr-8">
          <span>Filter by room type:</span>
          <div className="flex items-center space-x-2">
            <Checkbox id="Furnished" checked={getChecked("Furnished")} onCheckedChange={(value) => {
              if (value) {
                addToFilter("Furnished")
              } else {
                removeFromFilter("Furnished")
              }
            }} /> <Label htmlFor="Furnished">🛋️ Furnished</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="Unfurnished" checked={getChecked("Unfurnished")} onCheckedChange={(value) => {
              if (value) {
                addToFilter("Unfurnished")
              } else {
                removeFromFilter("Unfurnished")
              }
            }} /> <Label htmlFor="Unfurnished">📦 Unfurnished</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="Upholstered" checked={getChecked("Upholstered")} onCheckedChange={(value) => {
              if (value) {
                addToFilter("Upholstered")
              } else {
                removeFromFilter("Upholstered")
              }
            }} /> <Label htmlFor="Upholstered">🚪 Upholstered</Label>
          </div>
        </PopoverContent>
      </Popover>

    },
    cell: ({ row }) => {
      let emoji = '';

      switch (row.getValue("type")) {
        case "Furnished":
          emoji = "🛋️";
          break;
        case "Unfurnished":
          emoji = "📦";
          break;
        case "Upholstered":
          emoji = "🚪";
          break;
      }

      return (<TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex w-full justify-center">
            <span>{emoji}</span>
          </TooltipTrigger>
          <TooltipContent>{row.getValue("type")}</TooltipContent>
        </Tooltip>
        </TooltipProvider>)
    }
  },
  {
    accessorKey: "reactions_num",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <span>Reactions</span>
          <Button
            variant="ghost"
            className="ml-2 px-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      return <span className="flex justify-start">{row.getValue("reactions_num")}</span>
    }
  },
  {
    accessorKey: "contract_date",
    sortingFn: "datetime",
    header: ({ column }) => {
      return (
          <div className="flex items-center">
          <span>Date</span>
          <Button
            variant="ghost"
            className="ml-2 px-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
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

      return <span className="flex">{`${day}.${month_str}.${year}`}</span>;
    },
  },
  {
    accessorKey: "account_age",
    header: ({ column }) => {
      return (
        <div className="flex items-center xl:w-48">
          <span>Account age</span>
          <Button
            variant="ghost"
            className="xl:ml-2 px-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
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

      function handleSwitchChange(checked: boolean) {
        if (checked) {
          column.setFilterValue(true)
        } else {
          column.setFilterValue(null)
        }
      }

      function getChecked() {
        let checked = column.getFilterValue();

        if (checked === undefined || checked === null) {
          return false;
        }

        return checked as boolean;
      }

      return <Popover>
        <div className="flex justify-center items-center">
          <span>Priority</span>
          <PopoverTrigger asChild><Button variant="ghost" className="ml-2 px-2"> 
            <Filter className="h-4 w-4" /> 
          </Button></PopoverTrigger>
        </div>
        <PopoverContent className="flex flex-col gap-4 w-auto pr-8">
          <span>Filter by priority:</span>
          <div className="flex items-center space-x-2">
            <Switch onCheckedChange={handleSwitchChange} checked={getChecked()} id="priority" />
            <Label htmlFor="priority">Only with priority</Label>
          </div>
        </PopoverContent>
      </Popover>
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
