"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {

  let [city, setCity] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1>ROOM.nl archive data</h1>
    
        <form className="flex flex-col gap-4 pt-4" onSubmit={
          (event) => {
            event.preventDefault();
            window.location.href = `/rooms/${city}`;
          }
        }>
          <Input
              placeholder="City..."
              onChange={(event) => setCity(event.target.value)}
              className="max-w-sm"
          />
          <Button type="submit" onClick={() => {
            window.location.href = `/rooms/${city}`;
          }}>See data for the city</Button>
        </form>
    </main>
  );
}
