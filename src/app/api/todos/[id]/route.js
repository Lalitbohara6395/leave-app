import { NextResponse } from 'next/server';
import dbConnect from '@/lib/postgres';

export async function DELETE(request, context) {
  try {
    const pool = await dbConnect();

    const { id } = await context.params; 
    const todoId = Number(id);

    const result = await pool.query(
      'DELETE FROM todos_vhc26 WHERE id = $1 RETURNING *',
      [todoId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Not found',
      });
    }

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

export async function PUT(request, context) {
  try {
    const pool = await dbConnect();

    const { id } = await context.params; 
    const todoId = Number(id);

    const body = await request.json();

    const result = await pool.query(
      `UPDATE todos_vhc26 
       SET 
         task = COALESCE($1, task),
         completed = COALESCE($2, completed),
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [
        body.task ?? null,
        body.completed ?? null,
        todoId,
      ]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Update failed',
      });
    }

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