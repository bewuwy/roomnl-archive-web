"use client"

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface DatePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  from?: string | undefined,
  to?: string | undefined
}

export function DateRangePicker({
  className,
  from,
  to
}: DatePickerProps) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  let params = new URLSearchParams(searchParams.toString());

  let from_date = from ? new Date(from) : addDays(new Date(), -30)
  let to_date = to ? new Date(to) : new Date()

  if (params.has('from')) {
    from_date = new Date(params.get('from') as string);
  }
  if (params.has('to')) {
    to_date = new Date(params.get('to') as string);
  }

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from_date,
    to: to_date,
  })

  useEffect(() => {
    if (date?.from) {
      params.set('from', format(date.from, "yyyy-MM-dd"));
    }
    if (date?.to) {
      params.set('to', format(date.to, "yyyy-MM-dd"));
    }

    // Update the URL query string
    router.push(pathname + '?from=' + params.get('from') + '&to=' + params.get('to'));
  }, [date?.from, date?.to]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
