"use client";
import { useState } from "react";

interface CalendarProps {
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

export default function Calendar({ onSelectDate, selectedDate }: CalendarProps) {
  const today = new Date();
  const [monthOffset, setMonthOffset] = useState(0); // 0 = current, 1 = prev, 2 = prev-prev

  const displayMonth = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
  const monthLabel = displayMonth.toLocaleDateString("default", { month: "long", year: "numeric" });

  const daysInMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();

  const days: string[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), d);
    days.push(date.toISOString().split("T")[0]); // "YYYY-MM-DD"
  }

  return (
    <div className="mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setMonthOffset((prev) => Math.min(prev + 1, 2))}
          disabled={monthOffset == 2}
          className={`text-sm px-2 py-1 rounded ${monthOffset == 2 ? "opacity-30" : "hover:bg-gray-100"}`}
        >
          ← Prev
        </button>
        <h2 className="text-lg font-semibold">{monthLabel}</h2>
        <button
          onClick={() => setMonthOffset((prev) => Math.max(prev - 1, 0))}
          disabled={monthOffset === 0}
          className={`text-sm px-2 py-1 rounded ${monthOffset === 0 ? "opacity-30" : "hover:bg-gray-100"}`}
        >
          Next →
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-1">
  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
    <div key={day}>{day}</div>
  ))}
</div>
      <div className="grid grid-cols-7 gap-10">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onSelectDate(day)}
            className={`p-2 text-sm rounded ${
              selectedDate === day ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {new Date(day).getDate()}
          </button>
        ))}
      </div>
    </div>
  );
}
