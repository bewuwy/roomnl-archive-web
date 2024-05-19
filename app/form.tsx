"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DateRangePicker } from "@/components/ui/datepicker";
import { useState } from "react";

function redirect(city: string) {
    if (!city || city === "") {
      return;
    }
  
    window.location.href = `/${city}?${new URLSearchParams(window.location.search).toString()}`;
}
  

export default function HomeForm({
    cities
}: {
    cities: { label: string, value: string }[];
}) {

    let [city, setCity] = useState("");
  
    return (
        <form className="flex flex-col gap-4 pt-4" onSubmit={
        (event) => {
            event.preventDefault();
            redirect(city);
        }
        }>

        <Combobox 
            options={cities} 
            onChange={(value) => setCity(value)}
        />

        <DateRangePicker />

        <Button type="submit" onClick={() => {
            redirect(city);
        }}>See data for the city</Button>
        </form>
    );
}
