import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>ROOM.nl archive data</h1>

      {/* button with link to /rooms */}
      <Link className={buttonVariants({ variant: "default" })} href="/rooms">See the data</Link>
    </main>
  );
}
