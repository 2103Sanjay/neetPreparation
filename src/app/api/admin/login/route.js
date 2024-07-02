import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Admin from "../../../../../models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectMongoDB();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const adminCheck = await Admin.findOne({ email: email });

    if (!adminCheck) {
      return new NextResponse("Admin not found", { status: 404 });
    }

    const isPasswordMatch = await bcrypt.compare(password, adminCheck.password);
    if (!isPasswordMatch) {
      return new NextResponse("Password is incorrect", { status: 401 });
    }

    const tokenData = {
      id: adminCheck._id,
      email: adminCheck.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
