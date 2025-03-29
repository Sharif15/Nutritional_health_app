'use client';
import { useSwipeable } from 'react-swipeable';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { useState } from 'react';
import { LabelList } from 'recharts';

const groups = [
  {
    title: 'Macronutrients + Fiber',
    data: [{ name: 'Macros', Protein: 80, Carbohydrates: 200, Fats: 70, Fiber: 25 }],
  },
  {
    title: 'Micronutrients',
    data: [{ name: 'Micros', Vitamins: 60, Minerals: 55 }],
  },
  {
    title: 'Water',
    data: [{ name: 'Water', Water: 1800 }],
  },
];

const colors = {
  Protein: '#4B4237',
  Carbohydrates: '#D5A021',
  Fats: '#E2AEDD',
  Fiber: '#47A025',
  Vitamins: '#a78bfa',
  Minerals: '#2dd4bf',
  Water: '#38bdf8',
};

const nutrientIcons = {
  Protein: '🥩',
  Carbohydrates: '🍞',
  Fats: '🧈',
  Fiber: '🌿',
  Vitamins: '💊',
  Minerals: '🪨',
  Water: '💧',
};

const values = {
  Protein: '🥩',
  Carbohydrates: '🍞',
  Fats: '🧈',
  Fiber: '🌿',
  Vitamins: '💊',
  Minerals: '🪨',
  Water: '💧',
}

export default function NutritionBars() {
  const [index, setIndex] = useState(0);

  const handlers = useSwipeable({   
    onSwipedLeft: () => setIndex((prev) => Math.min(prev + 1, groups.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true, // allows mouse drag too
  });

  const group = groups[index];

  return (
    <div {...handlers} className="w-full bg-white rounded-2xl shadow p-4 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-2 text-center">{group.title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={group.data} layout="vertical">
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" hide />
          {Object.keys(group.data[0]).map((key) =>
            key !== 'name' ? (
              <Bar key={key} dataKey={key} stackId="a" fill={colors[key]} >
              <LabelList
                dataKey={key}
                position="center"
                formatter={(value) => `${nutrientIcons[key] || ''}\n${value} cal`}
                style={{ fontSize: 22 }}
              />
              </Bar>
            ) : null
          )}
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center text-sm text-gray-500 mt-2">
        {index + 1} / {groups.length}
      </div>
    </div>
  );
}
