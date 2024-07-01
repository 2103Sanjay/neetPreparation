import connectMongoDB from "../../../../../libs/mongodb";
import flashcards from "../../../../../models/flashcard";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { chapterflash } = params;
    await connectMongoDB();
    const flashcard = await flashcards.find({
      "tags.chapterCode": chapterflash,
    });
    if (!flashcard) {
      return NextResponse.json(
        { error: "Flashcards not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ flashcard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Flashcards:", error);
    return NextResponse.json(
      { error: "Failed to fetch Flashcards" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { term, definition, tags } = body;

    await connectMongoDB();
    const newFlashcard = await flashcards.create({
      term: term.map((t) => ({
        type: t.type,
        value: t.value,
      })),
      definition: definition.map((d) => ({
        type: d.type,
        value: d.value,
      })),
      tags: {
        subjectCode: tags.subjectCode,
        syllabusCode: tags.syllabusCode,
        syllabusName: tags.syllabusName,
        chapterCode: tags.chapterCode,
        chapterName: tags.chapterName,
        sequenceCode: tags.sequenceCode,
      },
      __v: 0,
    });

    return NextResponse.json({ message: "Flashcard created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating flashcard:", error);
    return NextResponse.json(
      { error: "Failed to create flashcard" },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log(id);
    await connectMongoDB();
    await flashcards.findByIdAndDelete(id);
    return NextResponse.json({ message: "flashcard deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    return NextResponse.json(
      { error: "Failed to delete flashcard" },
      { status: 500 }
    );
  }
}
