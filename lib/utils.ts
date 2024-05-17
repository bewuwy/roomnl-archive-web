import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function to_csv(data: any[]) {
  let csv = data.map(row => Object.values(row).join(",")).join("\n");

  return csv
}

export function to_download(data: any[], filename: string) {
  let csv = to_csv(data)
  let blob = new Blob([csv], { type: "text/csv" })
  let url = URL.createObjectURL(blob)
  let a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
}
