"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface BirthdayPickerProps {
  onSubmit: (date: Date) => void;
}

export default function BirthdayPicker({ onSubmit }: BirthdayPickerProps) {
  const currentYear = new Date().getFullYear();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const handleSubmit = () => {
    setError("");

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!day || !month || !year) {
      setError("Please fill in all fields");
      return;
    }

    if (yearNum < 1900 || yearNum > currentYear) {
      setError("Please enter a valid year");
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      setError("Please enter a valid day");
      return;
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);

    // Validate the date is real (e.g., not Feb 31)
    if (date.getMonth() !== monthNum - 1) {
      setError("Invalid date for this month");
      return;
    }

    if (date > new Date()) {
      setError("Birthday cannot be in the future");
      return;
    }

    onSubmit(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-6"
    >
      <div className="glass-card rounded-3xl p-8 animate-pulse-glow">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            Welcome
          </h1>
          <p className="text-white/60 text-sm">
            Enter your birthday to discover your fortune
          </p>
        </motion.div>

        {/* Date Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Day */}
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Day
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="15"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>

          {/* Month */}
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-opacity='0.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1.25rem" }}
            >
              <option value="" className="bg-[#0d3b3e] text-white">Select month</option>
              {months.map((m) => (
                <option key={m.value} value={m.value} className="bg-[#0d3b3e] text-white">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">
              Year
            </label>
            <input
              type="number"
              min="1900"
              max={currentYear}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="1990"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-sm text-center mt-4"
          >
            {error}
          </motion.p>
        )}

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleSubmit}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-gradient-to-r from-teal-400 to-cyan-400 text-[#0d3b3e] font-semibold py-4 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300"
        >
          Reveal My Fortune
        </motion.button>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/30 text-xs text-center mt-6"
        >
          Based on Thai astrology & numerology
        </motion.p>
      </div>
    </motion.div>
  );
}
