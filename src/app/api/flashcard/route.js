import connectMongoDB from "../../../../libs/mongodb";
import flashcards from "../../../../models/flashcard";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const flashcard = await flashcards.find();
    return NextResponse.json({ flashcard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flashcard:", error);
    return NextResponse.json(
      { error: "Failed to fetch flashcard" },
      { status: 500 }
    );
  }
}
