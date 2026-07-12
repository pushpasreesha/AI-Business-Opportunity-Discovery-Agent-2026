function DashboardFilters({
  industry,
  setIndustry,
  location,
  setLocation,
  onAnalyze,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="grid md:grid-cols-3 gap-6">

        {/* Industry */}

        <div>
          <label className="block mb-2 font-semibold">
            Industry
          </label>

          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="AI">AI</option>
            <option value="health">Healthcare</option>
            <option value="finance">FinTech</option>
            <option value="education">Education</option>
            <option value="security">Cyber Security</option>
          </select>
        </div>

        {/* Location */}

        <div>
          <label className="block mb-2 font-semibold">
            Location
          </label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
          </select>
        </div>

        {/* Button */}

        <div className="flex items-end">
          <button
            onClick={onAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

      </div>

    </div>
  );
}

export default DashboardFilters;