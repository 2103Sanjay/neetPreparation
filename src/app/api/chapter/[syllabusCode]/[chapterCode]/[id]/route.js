import connectMongoDB from "../../../../../../../libs/mongodb";
import Videos from "../../../../../../../models/video";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newVideoUrl, newVideoTitle, newThumbnailId, newThumbnailUrl } =
    await request.json();

  await connectMongoDB();

  const updatedVideo = await Videos.findByIdAndUpdate(
    id,
    {
      $set: {
        "video.src": newVideoUrl,
        "video.title": newVideoTitle,
        "video.thumbnails.0.id": newThumbnailId,
        "video.thumbnails.0.src": newThumbnailUrl,
      },
    },
    { new: true }
  );

  return NextResponse.json(
    { message: "Video updated", video: updatedVideo },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const video = await Videos.findOne({ _id: id });
  return NextResponse.json({ video }, { status: 200 });
}
