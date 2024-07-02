import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import admin from "../../../../../models/admin";
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    await admin.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "ACCOUNT CREATED" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "ERROR IN REGISTER" }, { status: 500 });
  }
}
