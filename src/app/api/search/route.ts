// Unified Search api for both food and exercise runs database query based on the type defied in the get request exercise or food 
// Used for providing auto complete suggestion for users search as they type


import { NextResponse } from 'next/server';

import {pool} from '@/lib/db_client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type'); // "exercise" or "food"

  if (!query || !type) {
    return NextResponse.json({ error: "Missing query or type" }, { status: 400 });
  }

  try {
    let results;

    if (type === 'exercise') {
      results = await searchExercises(query);
    } else if (type === 'food') {
      results = await searchFoods(query);
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

}

// function to make a search call to the database 

export async function searchExercises(query: string) {
    const sql = `
      SELECT exercise_id, exercise_name, body_part, equipment, difficulty_level
      FROM nutrition.exercises
      WHERE LOWER(exercise_name) LIKE LOWER($1)
      LIMIT 20;
    `;
    const values = [`%${query}%`];
  
    const res = await pool.query(sql, values);
    return res.rows;
  }

  // Temporary dummy search food funciton will be replaed with real call when the database for food is set up 

  export async function searchFoods(query: string) {

    return("Hello")
  }