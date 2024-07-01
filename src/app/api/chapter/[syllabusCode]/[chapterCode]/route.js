import connectMongoDB from "../../../../../../libs/mongodb";
import Videos from "../../../../../../models/video";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { chapterCode } = params;
    await connectMongoDB();
    const video = await Videos.find({
      "tags.chapterCode": chapterCode,
    });
    if (!video) {
      return NextResponse.json({ error: "Topics not found" }, { status: 404 });
    }
    return NextResponse.json({ video }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { tags, video, __v } = body;

    await connectMongoDB();
    const newVideo = await Videos.create({
      tags: {
        subjectCode: tags.subjectCode,
        unitCode: tags.unitCode,
        chapterCode: tags.chapterCode,
      },
      video: {
        kind: video.kind,
        src: video.src,
        alt: video.alt,
        title: video.title,
        thumbnails: video.thumbnails.map((thumbnail) => ({
          id: thumbnail.id,
          kind: thumbnail.kind,
          src: thumbnail.src,
          width: thumbnail.width,
          height: thumbnail.height,
        })),
        bookmarked: video.bookmarked,
      },
      __v,
    });

    return NextResponse.json({ message: "Video created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log(id);
    await connectMongoDB();
    await Videos.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Video:", error);
    return NextResponse.json(
      { error: "Failed to delete Video" },
      { status: 500 }
    );
  }
}

