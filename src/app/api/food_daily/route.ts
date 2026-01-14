import { pool } from '@/lib/db_client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const date = searchParams.get('date') || null;

  if (!user_id) {
    return new Response(
      JSON.stringify({ error: 'Missing user_id' }),
      { status: 400 }
    );
  }

  try {
    const query = `
      SELECT
        fi.intake_id,
        fi.quantity,
        fi.consumption_date,

        f.food_id,
        f.name,
        f.calories,

        fnm.protein,
        fnm.carbs,
        fnm.fat,
        fnm.fiber

      FROM nutrition.food_intake fi
      JOIN nutrition.food f
        ON fi.food_id = f.food_id
      LEFT JOIN nutrition.food_nutrition_macro fnm
        ON f.food_id = fnm.food_id

      WHERE fi.user_id = $1
      AND ($2::date IS NULL OR fi.consumption_date = $2)
    `;

    const values = [user_id, date];

    const result = await pool.query(query, values);

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
