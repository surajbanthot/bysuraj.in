"use server";

import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// This API only works in development mode
export async function POST(request: Request) {
    // Only allow in development
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Not allowed in production" }, { status: 403 });
    }

    try {
        const { items } = await request.json();

        // Path to WIPSidebar.tsx
        const filePath = path.join(process.cwd(), "src/components/WIPSidebar.tsx");

        // Read the current file
        const content = await fs.readFile(filePath, "utf-8");

        // Generate the new initialItems array
        const itemsCode = items
            .map(
                (item: { title: string; desc: string; icon: string; status: string }) =>
                    `    {
        title: ${JSON.stringify(item.title)},
        desc: ${JSON.stringify(item.desc)},
        icon: ${JSON.stringify(item.icon)},
        status: ${JSON.stringify(item.status)}
    }`
            )
            .join(",\n");

        const newInitialItems = `const initialItems = [\n${itemsCode},\n];`;

        // Replace the initialItems array in the file
        const updatedContent = content.replace(
            /const initialItems = \[[\s\S]*?\];/,
            newInitialItems
        );

        // Write back to the file
        await fs.writeFile(filePath, updatedContent, "utf-8");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save WIP items:", error);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
