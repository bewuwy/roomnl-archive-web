import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function to_csv(data: any[], headers: string[] = []) {
  let csv = data.map(row => Object.values(row).join(",")).join("\n");

  // add a header row
  if (headers.length > 0) {
    csv = headers.join(",") + "\n" + csv;
  }

  return csv
}

export function to_download(data: any[], filename: string, csv_headers: string[] = []) {
  let csv = to_csv(data, csv_headers)
  let blob = new Blob([csv], { type: "text/csv" })
  let url = URL.createObjectURL(blob)
  let a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}
