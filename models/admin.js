import mongoose, { Schema, models } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const adminaccount =
  models.adminaccount || mongoose.model("adminaccount", adminSchema);

export default adminaccount;
