import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
  id: String,
  kind: { type: String, default: "jpg" },
  src: String,
  width: { type: Number, default: 480 },
  height: { type: Number, default: 360 },
});

const videoSchema = new mongoose.Schema({
  kind: { type: String, default: "youtube" },
  src: String,
  alt: String,
  title: String,
  thumbnails: [thumbnailSchema],
  bookmarked: Boolean,
});

const videoDocumentSchema = new mongoose.Schema({
  tags: {
    subjectCode: String,
    unitCode: String,
    chapterCode: String,
  },
  video: videoSchema,
  __v: { type: Number, default: 0 },
});

const videos =
  mongoose.models.videos || mongoose.model("videos", videoDocumentSchema);
export default videos;
