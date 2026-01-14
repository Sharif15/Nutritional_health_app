'use client';

import { useState, useEffect } from 'react';

type FoodEntry = {
  food_id: number;
  name: string;
  quantity: number;
  consumption_date: string;
  calories: number;
  food_nutrition_macro: {
    protein: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
    vitamins: number;
    minerals: number;
    water: number;
  };
};

export function useFoodIntake(userId: number, date?: string) {
  const [foodIntake, setFoodIntake] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const params = new URLSearchParams({ user_id: String(userId) });
    if (date) params.append('date', date);

    fetch(`/api/food_daily?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        const mapped = data.map((entry: any) => ({
          food_id: entry.food_id,
          name: entry.name,
          quantity: entry.quantity,
          consumption_date: entry.consumption_date,
          calories: entry.calories ?? 0,
          food_nutrition_macro: {
            protein: entry.protein ?? 0,
            carbohydrates: entry.carbs ?? 0,
            fats: entry.fat ?? 0,
            fiber: entry.fiber ?? 0,
            vitamins: 0,
            minerals: 0,
            water: 0,
          },
        }));
        setFoodIntake(mapped);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load food intake:', err);
        setError('Failed to load food intake');
        setLoading(false);
      });
  }, [userId, date]);

  return { foodIntake, loading, error };
}
