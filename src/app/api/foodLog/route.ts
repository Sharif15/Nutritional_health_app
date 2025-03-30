import { promises as fs } from "fs";
import path from "path";

// File path to store food log data
const filePath = path.join(process.cwd(), "src", "data", "foodLog.json");

// Load food log from JSON file
export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ foodLog: [] }), { status: 200 });
  }
}

// Save food log to JSON file
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    return new Response(JSON.stringify({ message: "Saved successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save data" }), { status: 500 });
  }
}
