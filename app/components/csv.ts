import Papa from "papaparse";

export const readCSV = async (setEvents: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
        const response = await fetch("/api/get-event");
        if (!response.ok) throw new Error(`Failed to load CSV: ${response.statusText}`);

        const json = await response.json(); // Expecting { csv: "csv_data_here" }
        const text = json.csv;

        console.log("CSV Raw Data:", text);

        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true, // Ensures numbers are parsed correctly
            complete: (results) => {
                console.log("Parsed CSV Data:", results.data);
                if (results.errors.length > 0) {
                    console.error("Parsing errors:", results.errors);
                }

                if (Array.isArray(results.data)) {
                    setEvents(results.data);
                } else {
                    console.error("Parsed data is not an array!", results.data);
                }
            }
        });
    } catch (error) {
        console.error("Error loading CSV:", error);
    }
};
