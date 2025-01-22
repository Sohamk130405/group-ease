import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const {
      name,
      email,
      password,
      branch,
      division,
      year,
      phone,
      batch,
      rollNo,
      sem,
      prn,
    } = await req.json();

    if (
      !name ||
      !email ||
      !password ||
      !branch ||
      !division ||
      !year ||
      !phone ||
      !batch ||
      !rollNo ||
      !prn ||
      !sem
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      prn,
      phone,
      branch,
      division,
      year,
      batch,
      sem,
      rollNo,
    });

    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in register route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
