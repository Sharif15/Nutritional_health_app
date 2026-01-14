"use client";


import Image from "next/image"
import Link from "next/link"
import NutritionBars from "./components/NutritionBars"
import Navbar from "./components/Navbar"
import { useFoodIntake } from "./hooks/useFoodIntake" 
import { useEffect, useState } from "react"


export default function Home() {
  const userId = 1; // temporary hardcoded test user
  const today = new Date().toISOString().split("T")[0];
  const { foodIntake, loading, error } = useFoodIntake(userId, today);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-6 space-y-6 max-w-5xl mx-auto">
        {/* Placeholder or hero */}

        {/* Your visual bar graph */}
        { <NutritionBars userId={userId}/> }

        {/* Food Recommendations */}
        <section className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Recommended Foods</h2>
          <div className="mt-4 border border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400">
            🍽️ Food recommendations coming soon...
          </div>
        </section> 

        {/* Intake + Exercise Preview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Daily Nutritional Intake</h2>
            <ul className="text-gray-700 space-y-1">
              {loading ? (
                <li>Loading...</li>
              ) : error ? (
                <li className="text-red-500">Error: {error}</li>
              ) : foodIntake.length === 0 ? (
                <li>No food logged today.</li>
              ) : (
                foodIntake.map((item, idx) => (
                  <li key={idx}>
                    🍽️ {item.name} – {item.calories}cal
                  </li>
                ))
              )}
            </ul>
            <Link href="/food_tracking" className="mt-3 inline-block text-blue-600 hover:underline">
              View full food log →
            </Link>

          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Exercise / Calories Burned</h2>
            <ul className="text-gray-700 space-y-1">
              <li>🚶 10 min walk - 40 kcal</li>
              <li>🚴 15 min bike ride - 100 kcal</li>
            </ul>
            <Link href="/exercise_tracking" className="mt-3 inline-block text-blue-600 hover:underline">
              View today's activity →
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
