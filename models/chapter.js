import mongoose, { Schema } from "mongoose";

const syllabusSchema = new Schema(
  {
    syllabusId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    syllabusCode: { type: String, required: true },
    syllabusName: { type: String, required: true },
  },
  { _id: false }
);

const unitSchema = new Schema(
  {
    unitId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    unitCode: { type: String, required: true },
    unitName: { type: String, required: true },
  },
  { _id: false }
);

const chapterSchema = new Schema(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      required: true,
    },
    chapterCode: { type: String, required: true },
    chapterName: { type: String, required: true },
  },
  { _id: false }
);

const tocItemSchema = new Schema({
  syllabus: { type: syllabusSchema, required: true },
  unit: { type: unitSchema, required: true },
  chapter: { type: chapterSchema, required: true },
});

const courseSchema = new Schema({
  subjectCode: { type: String, required: true },
  tocId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    required: true,
  },
  tocItem: { type: [tocItemSchema], required: true },
});

const tocs = mongoose.models.tocs || mongoose.model("tocs", courseSchema);

export default tocs;

