import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import Papa from "papaparse";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const isLive = url.searchParams.get("live") === "true";
        const csvFilePath = isLive
            ? path.join(process.cwd(), "data", "live_events_dataset.csv")
            : path.join(process.cwd(), "data", "events.csv");
        const csvData = await fs.readFile(csvFilePath, "utf-8");
        const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
        return NextResponse.json({ events: parsed.data }, { status: 200 });
    } catch (error) {
        console.error("Error reading CSV file:", error);
        return NextResponse.json({ error: "CSV file not found!" }, { status: 500 });
    }
}
