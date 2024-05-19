"use client";

import { Button } from "@/components/ui/button"
import { DateRangePicker } from "@/components/ui/datepicker";
import { Combobox } from "@/components/ui/combobox";

import { useState } from "react";

function redirect(city: string) {
  if (!city || city === "") {
    return;
  }

  window.location.href = `/${city}?${new URLSearchParams(window.location.search).toString()}`;
}

export default function Home() {

  let [city, setCity] = useState("");

  let cities = [
    { label: "Amsterdam", value: "amsterdam" },
    { label: "Rotterdam", value: "rotterdam" },
    { label: "Utrecht", value: "utrecht" },
    { label: "Den Haag", value: "den-haag" },
    { label: "Eindhoven", value: "eindhoven" },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1>ROOM.nl archive data</h1>
    
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
    </main>
  );
}
