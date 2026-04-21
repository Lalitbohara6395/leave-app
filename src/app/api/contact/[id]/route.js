import { NextResponse } from 'next/server';
import dbConnect from '@/lib/postgres';

// ================= DELETE =================
export async function DELETE(request, context) {
  try {
    const pool = await dbConnect();

    const { id } = await context.params;
    const contactId = Number(id);

    const result = await pool.query(
      'DELETE FROM contact WHERE id = $1 RETURNING *',
      [contactId]
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

// ================= UPDATE =================
export async function PUT(request, context) {
  try {
    const pool = await dbConnect();

    const { id } = await context.params;
    const contactId = Number(id);

    const body = await request.json();

    const result = await pool.query(
      `UPDATE contact 
       SET 
         name = COALESCE($1, name),
         email = COALESCE($2, email),
         message = COALESCE($3, message)
       WHERE id = $4
       RETURNING *`,
      [
        body.name ?? null,
        body.email ?? null,
        body.message ?? null,
        contactId,
      ]
    );

    console.log("UPDATED:", result.rows[0]); // debug

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