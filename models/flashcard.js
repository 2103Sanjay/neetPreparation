import mongoose from "mongoose";

const TermSchema = new mongoose.Schema({
  type: { type: String, default: "text", required: true },
  value: { type: String, required: true },
});

const DefinitionSchema = new mongoose.Schema({
  type: { type: String, default: "text", required: true },
  value: { type: String, required: true },
});

const TagsSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  syllabusCode: { type: String, required: true },
  syllabusName: { type: String, required: true },
  chapterCode: { type: String, required: true },
  chapterName: { type: String, required: true },
  sequenceCode: { type: String, required: true },
});

const flashcardSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
    required: true,
  },
  term: { type: [TermSchema], required: true },
  definition: { type: [DefinitionSchema], required: true },
  tags: { type: TagsSchema, required: true },
  __v: { type: Number, default: 0 },
});

const flashcards =
  mongoose.models.flashcards || mongoose.model("flashcards", flashcardSchema);
export default flashcards;
