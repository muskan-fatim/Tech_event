import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET() {
    try {
        const csvFilePath = path.join(process.cwd(), "data", "events.csv");
        const csvData = await fs.readFile(csvFilePath, "utf-8");

        return NextResponse.json({ csv: csvData }, { status: 200 });
    } catch (error) {
        console.error("Error reading CSV file:", error);
        return NextResponse.json({ error: "CSV file not found!" }, { status: 500 });
    }
}
