'use client';

import { useSwipeable } from 'react-swipeable';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList, Cell, LabelProps
} from 'recharts';
import { useState } from 'react';
import { useFoodIntake } from "@/app/hooks/useFoodIntake";

type Props = {
  userId: number;
};

const goals: Record<string, number> = {
  Protein: 100,
  Carbohydrates: 250,
  Fats: 70,
  Fiber: 30,
  Vitamins: 100,
  Minerals: 100,
  Water: 3000,
};

const colors: Record<string, string> = {
  Protein: '#4B4237',
  Carbohydrates: '#D5A021',
  Fats: '#E2AEDD',
  Fiber: '#47A025',
  Vitamins: '#a78bfa',
  Minerals: '#2dd4bf',
  Water: '#38bdf8',
};

const nutrientIcons: Record<string, string> = {
  Protein: '🥩',
  Carbohydrates: '🍞',
  Fats: '🧈',
  Fiber: '🌿',
  Vitamins: '💊',
  Minerals: '🪨',
  Water: '💧',
};

export default function NutritionBars({ userId }: Props) {
  const [index, setIndex] = useState(0);
  const today = new Date().toISOString().split('T')[0];
  const { foodIntake, loading, error } = useFoodIntake(userId, today);

  const totals = foodIntake?.reduce<Record<string, number>>(
    (acc, item) => {
      acc.Protein += item.food_nutrition_macro?.protein ?? 0;
      acc.Carbohydrates += item.food_nutrition_macro?.carbohydrates ?? 0;
      acc.Fats += item.food_nutrition_macro?.fats ?? 0;
      acc.Fiber += item.food_nutrition_macro?.fiber ?? 0;
      acc.Vitamins += item.food_nutrition_macro?.vitamins ?? 0;
      acc.Minerals += item.food_nutrition_macro?.minerals ?? 0;
      acc.Water += item.food_nutrition_macro?.water ?? 0;
      return acc;
    },
    {
      Protein: 0,
      Carbohydrates: 0,
      Fats: 0,
      Fiber: 0,
      Vitamins: 0,
      Minerals: 0,
      Water: 0,
    }
  );


  const groups = [
    {
      title: 'Macronutrients',
      data: ['Protein', 'Carbohydrates', 'Fats', 'Fiber'].map((key) => ({
        name: key,
        value: ((totals?.[key] ?? 0) / (goals[key] || 1)) * 100,
        raw: totals?.[key] ?? 0,
        fill: (totals?.[key] ?? 0) > (goals[key] ?? Infinity) ? 'red' : colors[key],
        icon: nutrientIcons[key],
      })),
    },
    {
      title: 'Micronutrients',
      data: ['Vitamins', 'Minerals'].map((key) => ({
        name: key,
        value: ((totals?.[key] ?? 0) / (goals[key] || 1)) * 100,
        raw: totals?.[key] ?? 0,
        fill: (totals?.[key] ?? 0) > (goals[key] ?? Infinity) ? 'red' : colors[key],
        icon: nutrientIcons[key],
      })),
    },
    {
      title: 'Water',
      data: ['Water'].map((key) => ({
        name: key,
        value: ((totals?.[key] ?? 0) / (goals[key] || 1)) * 100,
        raw: totals?.[key] ?? 0,
        fill: (totals?.[key] ?? 0) > (goals[key] ?? Infinity) ? 'red' : colors[key],
        icon: nutrientIcons[key],
      })),
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => Math.min(prev + 1, groups.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
  });

  if (loading) return <div className="text-center">Loading nutrition...</div>;
  if (error) return <div className="text-center text-red-500">Failed to load intake</div>;

  const group = groups[index];

  return (
    <div
      {...handlers}
      className="w-full bg-white rounded-2xl shadow p-4 transition-all duration-300 select-none"
      style={{ touchAction: 'pan-y', userSelect: 'none' }}
    >
      <h2 className="text-xl font-semibold mb-2 text-center">{group.title}</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={group.data} layout="vertical" barCategoryGap={16}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />

          {/* GOAL OUTLINE BAR */}
          <Bar
            dataKey="goalValue"
            barSize={24}
            fill="none"
            stroke="#000"
            strokeWidth={2}
            isAnimationActive={false}
            radius={[8, 8, 8, 8]}
          >
            {group.data.map((entry, index) => (
              <Cell
                key={`goal-${index}`}
                stroke={entry.value <= 100 ? 'green' : 'black'}
              />
            ))}
          </Bar>

          {/* FILL BAR WITH CENTERED LABEL */}
          <Bar
            dataKey="value"
            barSize={30}
            radius={[3, 3, 3, 3]}
            isAnimationActive={true}
            label={({ x = 0, y = 0, width = 0, height = 0, index }) => {
              const entry = group.data[index];
              const label = `${entry.icon ?? ''} ${entry.raw ?? 0}`;
              return (
                <text
                  x={x + width / 2}
                  y={y + height / 2 + 1} // small nudge down
                  fill="white "
                  fontSize={13}
                  textAnchor="left"
                  alignmentBaseline="central" // more consistent across browsers than dominantBaseline
                >
                  {label}
                </text>
              );
            }}
          >
            {group.data.map((entry, index) => (
              <Cell key={`fill-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>


      <div className="text-center text-sm text-gray-500 mt-2">
        {index + 1} / {groups.length}
      </div>
    </div>
  );
}
