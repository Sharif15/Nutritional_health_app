import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow px-4 py-6 space-y-6 max-w-5xl mx-auto">
        {/* Placeholder or hero */}
        <section>
          <p className="text-xl font-medium">Temp text</p>
        </section>

        {/* Your visual bar graph (NutritionBars component placeholder) */}
        {/* <NutritionBars /> */}

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
              <li>🍎 Apple - 95 kcal</li>
              <li>🥪 Turkey sandwich - 300 kcal</li>
              <li>🥛 Protein shake - 120 kcal</li>
            </ul>
            <Link href="/food-tracking" className="mt-3 inline-block text-blue-600 hover:underline">
              View full food log →
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Exercise / Calories Burned</h2>
            <ul className="text-gray-700 space-y-1">
              <li>🚶 10 min walk - 40 kcal</li>
              <li>🚴 15 min bike ride - 100 kcal</li>
            </ul>
            <Link href="/exercise-tracking" className="mt-3 inline-block text-blue-600 hover:underline">
              View today's activity →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-inner p-4 mt-6">
        {/* Replace with your <Navbar /> or <DashboardLinks /> */}
        <div className="text-center text-sm text-gray-500">Dashboard links go here</div>
      </footer>
    </div>
  );
}
