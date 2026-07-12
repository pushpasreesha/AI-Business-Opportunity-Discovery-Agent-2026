function RecentOpportunityTable({ companies = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">
        Top Funded Companies
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="border-b">
            <tr>
              <th className="text-left py-3">Company</th>
              <th className="text-left py-3">Funding (USD)</th>
            </tr>
          </thead>

          <tbody>

            {companies.length > 0 ? (
              companies.map((company, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">
                    {company.name}
                  </td>

                  <td className="py-3">
                    $
                    {Number(
                      company.funding_total_usd || 0
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="py-6 text-center text-gray-500"
                >
                  No companies available
                </td>
              </tr>
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default RecentOpportunityTable;