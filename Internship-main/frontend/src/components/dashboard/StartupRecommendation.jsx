function StartupRecommendation({ opportunity }) {
  if (!opportunity) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          AI Startup Recommendation
        </h2>

        <p className="text-gray-500">
          No recommendation available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        💡 AI Startup Recommendation
      </h2>

      <div className="space-y-5">

        <div>
          <h3 className="font-bold text-lg">
            Startup Idea
          </h3>
          <p>{opportunity.startup_idea}</p>
        </div>

        <div>
          <h3 className="font-bold">
            Problem
          </h3>
          <p>{opportunity.problem_statement}</p>
        </div>

        <div>
          <h3 className="font-bold">
            Solution
          </h3>
          <p>{opportunity.solution}</p>
        </div>

        <div>
          <h3 className="font-bold">
            Business Model
          </h3>
          <p>{opportunity.business_model}</p>
        </div>

        <div>
          <h3 className="font-bold">
            Market Gap
          </h3>
          <p>{opportunity.market_gap}</p>
        </div>

        <div>
          <h3 className="font-bold">
            Competitive Advantage
          </h3>
          <p>{opportunity.competitive_advantage}</p>
        </div>

      </div>

    </div>
  );
}

export default StartupRecommendation;