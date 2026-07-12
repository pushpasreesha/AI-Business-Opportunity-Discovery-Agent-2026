function TopCompaniesTable({ companies = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Top Funded Companies
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Company</th>
            <th className="text-right py-3">Funding (USD)</th>
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

                <td className="text-right">
                  $
                  {Number(
                    company.funding_total_usd
                  ).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                className="text-center py-6 text-gray-500"
              >
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TopCompaniesTable;