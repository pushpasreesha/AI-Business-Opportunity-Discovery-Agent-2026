function ResultCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default ResultCard;