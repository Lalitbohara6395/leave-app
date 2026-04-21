import { NextResponse } from "next/server";
import dbConnect from "@/lib/postgres";

// GET all todos
export async function GET() {
  try {
    const pool = await dbConnect();

    const result = await pool.query(
      "SELECT * FROM contact ORDER BY id DESC"
    );

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// CREATE todo
export async function POST(request) {
  try {
    const pool = await dbConnect();

    const body = await request.json();

    await pool.query(
      "INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)",
      [body.name, body.email, body.message]
    );

    return NextResponse.json({
      success: true,
      message: "Contact saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}