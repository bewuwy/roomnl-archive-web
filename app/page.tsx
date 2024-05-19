"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/datepicker";

import { useState } from "react";

function redirect(city: string) {
  window.location.href = `/${city}?${new URLSearchParams(window.location.search).toString()}`;
}

export default function Home() {

  let [city, setCity] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1>ROOM.nl archive data</h1>
    
        <form className="flex flex-col gap-4 pt-4" onSubmit={
          (event) => {
            event.preventDefault();
            redirect(city);
          }
        }>
          <Input
              placeholder="City..."
              onChange={(event) => setCity(event.target.value)}
              className="max-w-sm"
          />

          <DateRangePicker />

          <Button type="submit" onClick={() => {
            redirect(city);
          }}>See data for the city</Button>
        </form>
    </main>
  );
}
