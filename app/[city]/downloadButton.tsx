"use client";

import { Button } from "@/components/ui/button";
import { to_download } from "@/lib/utils";

export function DownloadButton({ data, filename }: { data: any[], filename: string }) {
    return (
        <Button onClick={() => {
            to_download(data, filename, 
                ["Address", "City", "Room type", "Number of reactions", "Contract date", "Account age (in days)", "Priority"]
            );
        }}>
            Download
        </Button>
    );
}
