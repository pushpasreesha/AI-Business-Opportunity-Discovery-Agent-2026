function CompetitorTable({ competitors = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">
        Top Competitors
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="text-left py-3">Company</th>
              <th className="text-left py-3">Valuation</th>
              <th className="text-left py-3">Funding</th>
            </tr>
          </thead>

          <tbody>
            {competitors.length > 0 ? (
              competitors.map((company, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">
                    {company.Company}
                  </td>

                  <td className="py-3">
                    {company["Valuation ($B)"]}
                  </td>

                  <td className="py-3">
                    {company["Total Raised"]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-6 text-center text-gray-500"
                >
                  No competitors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompetitorTable;