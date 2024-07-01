import connectMongoDB from "../../../../../libs/mongodb";
import Topics from "../../../../../models/chapter";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { syllabusCode } = params;
    await connectMongoDB();
    const tocs = await Topics.findOne({
      "tocItem.syllabus.syllabusCode": syllabusCode,
    });
    if (!tocs) {
      return NextResponse.json({ error: "Topics not found" }, { status: 404 });
    }
    return NextResponse.json({ tocs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
