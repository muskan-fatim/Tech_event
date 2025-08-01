import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import Papa from "papaparse";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const isLive = url.searchParams.get("live") === "true";
        const includePast = url.searchParams.get("past") === "true";
        
        let csvFilePath;
        if (isLive) {
            csvFilePath = path.join(process.cwd(), "data", "live_events_dataset.csv");
        } else {
            csvFilePath = path.join(process.cwd(), "data", "events.csv");
        }
        
        const csvData = await fs.readFile(csvFilePath, "utf-8");
        const parsed = Papa.parse(csvData, { header: true, skipEmptyLines: true });
        let events = parsed.data;

        // If past events are requested, combine with past events data
        if (includePast && !isLive) {
            try {
                const pastEventsPath = path.join(process.cwd(), "data", "past_events.csv");
                const pastEventsData = await fs.readFile(pastEventsPath, "utf-8");
                const pastEventsParsed = Papa.parse(pastEventsData, { header: true, skipEmptyLines: true });
                
                // Add a flag to distinguish past events
                const pastEventsWithFlag = pastEventsParsed.data.map((event: any) => ({
                    ...event,
                    isPastEvent: true
                }));
                
                events = [...events, ...pastEventsWithFlag];
            } catch (pastError) {
                console.error("Error reading past events:", pastError);
                // Continue without past events if there's an error
            }
        }

        return NextResponse.json({ events: events }, { status: 200 });
    } catch (error) {
        console.error("Error reading CSV file:", error);
        return NextResponse.json({ error: "CSV file not found!" }, { status: 500 });
    }
}
