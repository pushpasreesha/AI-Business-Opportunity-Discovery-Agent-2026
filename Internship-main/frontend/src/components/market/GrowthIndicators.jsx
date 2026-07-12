function ProgressBar({ label, value }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 bg-blue-600 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function GrowthIndicators() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-5">
        Growth Indicators
      </h2>

      <ProgressBar
        label="Market Growth"
        value={92}
      />

      <ProgressBar
        label="Investor Interest"
        value={87}
      />

      <ProgressBar
        label="Innovation Score"
        value={91}
      />

      <ProgressBar
        label="Competition"
        value={64}
      />
    </div>
  );
}

export default GrowthIndicators;