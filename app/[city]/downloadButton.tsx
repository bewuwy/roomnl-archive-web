"use client";

import { Button } from "@/components/ui/button";
import { to_download } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

import { Download } from 'lucide-react'

export function DownloadButton({ data, filename }: { data: any[], filename: string }) {

    const headers = ["Address", "City", "Room type", "Number of reactions", "Contract date", "Account age (in days)", "Priority", "Rent", "Area"];

    return (<TooltipProvider>
    <Tooltip>
        <TooltipTrigger asChild>
            <Button onClick={() => {
                to_download(data, filename, headers);
            }}> 
                Download <Download className="w-4 h-4 ml-2" />
            </Button>
        </TooltipTrigger>
        <TooltipContent>Download data in the given timeframe in CSV format.</TooltipContent>
    </Tooltip>
    </TooltipProvider>)
}
