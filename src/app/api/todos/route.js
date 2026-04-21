import { NextResponse } from 'next/server';
import dbConnect from '@/lib/postgres'; // <-- updated path

export async function GET() {
  try {
    const pool = await dbConnect();

    const result = await pool.query(
      'SELECT * FROM todos_vhc26 ORDER BY created_at DESC'
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    const pool = await dbConnect();
    const body = await request.json();

    const result = await pool.query(
      'INSERT INTO todos_vhc26 (task, completed) VALUES ($1, $2) RETURNING *',
      [body.task, body.completed ?? false]
    );

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request) {
  try {
    const pool = await dbConnect();
    const { id, ...updateData } = await request.json();

    const result = await pool.query(
      `UPDATE todos_vhc26 
       SET task = COALESCE($1, task),
           completed = COALESCE($2, completed),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [updateData.task, updateData.completed, id]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const pool = await dbConnect();
    const { id } = await request.json();

    await pool.query('DELETE FROM todos_vhc26 WHERE id = $1', [id]);

    return NextResponse.json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}