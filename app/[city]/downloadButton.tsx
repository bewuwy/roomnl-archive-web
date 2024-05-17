"use client";

import { Button } from "@/components/ui/button";
import { to_download } from "@/lib/utils";

export function DownloadButton({ data, filename }: { data: any[], filename: string }) {
    return (
        <Button onClick={() => {
            to_download(data, filename);
        }}>
            Download
        </Button>
    );
}
