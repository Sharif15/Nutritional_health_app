"use client";
import { useState, useEffect } from "react";
import Button from "@/app/components/Button";
import NutritionBars from "@/app/components/NutritionBars";
import { Dialog } from "@/app/components/Dialog";

interface FoodItem {
  name: string;
  calories?: number;
}

export default function FoodTracking() {
  const [foodLog, setFoodLog] = useState<FoodItem[]>([]);
  const [foodName, setFoodName] = useState("");


  // Load food log from JSON file (via API)
  useEffect(() => {
    fetch("/api/foodLog")
      .then((res) => res.json())
      .then((data) => setFoodLog(data.foodLog || []))
      .catch((err) => console.error("Error loading food log:", err));
  }, []);

  // Save food log to JSON file (via API)
  const saveFoodLog = async (updatedLog: FoodItem[]) => {
    setFoodLog(updatedLog);
    await fetch("/api/foodLog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foodLog: updatedLog }),
    });
  };

  const handleAddFood = () => {
    if (foodName) {
      const newFood: FoodItem = {
        name: foodName,
        calories: Math.floor(Math.random() * 500), // Random calories
      };
      const updatedLog = [...foodLog, newFood];
      saveFoodLog(updatedLog);
      setFoodName("");
    }
  };

  const handleRemoveFood = (index: number) => {
    const updatedLog = foodLog.filter((_, i) => i !== index);
    saveFoodLog(updatedLog);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">Food Tracking</h1>

        {/* Nutrition Graph */}
        <NutritionBars />

        {/* Food Log */}
        <section className="mb-6 text-center">
          <h2 className="text-xl font-semibold">Food Log</h2>
          <ul className="space-y-2">
            {foodLog.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-2 rounded shadow-md">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.calories} kcal</p>
                  </div>
                </div>
                <Button className=" text-black hover:text-red-600" onClick={() => handleRemoveFood(index)}>
                  X
                </Button>
              </li>
            ))}
          </ul>
        </section>

        {/* Add Food Modal */}
        <div className="flex justify-center">
          <Dialog triggerText="Add Food">
            <div className="space-y-4 p-6 flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">Add Food</h2>

              {/* Food Name Input */}
              <input
                type="text"
                placeholder="Enter food name..."
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full p-2 border rounded"
              />

              {/* Barcode Scanner (Placeholder) */}
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                Scan Barcode
              </Button>

              {/* Add Recipe */}
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                Add / Use Recipe
              </Button>

              {/* Add Food Button */}
              <Button
                className="w-full bg-green-500 hover:bg-green-600"
                onClick={handleAddFood}
              >
                Add Food
              </Button>
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
