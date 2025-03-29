"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import { Dialog } from "@/app/components/Dialog";

export default function FoodTracking() {
  const [foodLog, setFoodLog] = useState<string[]>([]);  // Assuming food log will store a list of food names
  const [foodName, setFoodName] = useState("");           // State for food name input

  const handleAddFood = () => {
    if (foodName) {
      // Add the new food item to the food log
      setFoodLog((prevLog) => [...prevLog, foodName]);
      // Reset the form inputs
      setFoodName("");
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Food Tracking</h1>

      {/* Daily Nutritional Intake (Placeholder) */}
      <section className="mb-6 p-4 bg-white shadow-md rounded-lg text-center">
        <h2 className="text-xl font-semibold">Daily Nutritional Intake</h2>
        <p>(Chart or visualization goes here)</p>
      </section>

      {/* Food Log */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Food Log</h2>
        <ul className="space-y-2">
          {foodLog.map((item, index) => (
            <li key={index} className="bg-white p-2 rounded shadow-md">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Add Food Modal */}
      <Dialog triggerText="Add Food">
        <div className="space-y-4 p-6">
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
    </main>
  );
}
