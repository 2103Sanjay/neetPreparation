import connectMongoDB from "../../../../../../libs/mongodb";
import flashcards from "../../../../../../models/flashcard";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newFlashValue, newDefinitionValue } = await request.json();
  await connectMongoDB();

  const updatedFlashcard = await flashcards.findByIdAndUpdate(
    id,
    {
      $set: {
        "term.0.value": newFlashValue,
        "definition.0.value": newDefinitionValue,
      },
    },
    { new: true }
  );

  return NextResponse.json(
    { message: "Flashcard updated", flash: updatedFlashcard },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const flash = await flashcards.findOne({ _id: id });
  return NextResponse.json({ flash }, { status: 200 });
}
