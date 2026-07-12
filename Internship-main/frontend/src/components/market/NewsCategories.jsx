function NewsCategories({ categories = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Top News Categories
      </h2>

      {categories.length === 0 ? (
        <p className="text-gray-500">
          No news categories available.
        </p>
      ) : (
        <div className="space-y-4">
          {categories.map(([category, count], index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3"
            >
              <span className="font-medium text-gray-700">
                {category}
              </span>

              <span className="font-bold text-blue-600">
                {count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsCategories;