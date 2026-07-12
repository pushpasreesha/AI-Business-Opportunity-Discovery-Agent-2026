import { useState } from "react";

function FilterSection({ onAnalyze }) {
  const [industry, setIndustry] = useState("AI");
  const [location, setLocation] = useState("USA");

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        {/* Industry */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Industry
          </label>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option>AI</option>
            <option>Healthcare</option>
            <option>Fintech</option>
            <option>Education</option>
            <option>Cybersecurity</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Location
          </label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option>USA</option>
            <option>India</option>
            <option>UK</option>
          </select>
        </div>

        {/* Analyze Button */}
        <button
          onClick={() => onAnalyze(industry, location)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold"
        >
          Analyze
        </button>

      </div>
    </div>
  );
}

export default FilterSection;