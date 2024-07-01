import connectMongoDB from "../../../../libs/mongodb";
import Topics from "../../../../models/chapter";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const tocs = await Topics.find();
    return NextResponse.json({ tocs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching TOCs:", error);
    return NextResponse.json(
      { error: "Failed to fetch TOCs" },
      { status: 500 }
    );
  }
}
