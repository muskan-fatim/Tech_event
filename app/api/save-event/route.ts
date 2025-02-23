import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { createObjectCsvWriter } from "csv-writer";

const csvFilePath = path.join(process.cwd(), "data", "events.csv");


export async function POST(req: Request) {
    try {
        const eventData = await req.json();

        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: "eventName", title: "Event Name" },
                { id: "location", title: "Location" },
                { id: "address", title: "Address" },
                { id: "organizer", title: "Organizer Name" },
                { id: "date", title: "Event Date" },
                { id: "time", title: "Event Time" },
                { id: "eventType", title: "Event Type" },
            ],
            append: true,
        });

        await csvWriter.writeRecords([eventData]);

        return NextResponse.json({ message: "Event saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error writing to CSV file:", error);
        return NextResponse.json({ error: "Failed to save event" }, { status: 500 });
    }
}
