import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { industry: "AI", funding: 74 },
  { industry: "Health", funding: 39 },
  { industry: "FinTech", funding: 28 },
  { industry: "EdTech", funding: 18 },
  { industry: "Security", funding: 12 },
];

function FundingChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-5">
        Funding Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="industry" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="funding" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FundingChart;