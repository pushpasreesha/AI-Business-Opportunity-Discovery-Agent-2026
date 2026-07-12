function MarketInsights({ insights, growth }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">


      <h2 className="text-xl font-bold mb-4">
        Market Insights
      </h2>



      <div className="space-y-5">


        <div>

          <h3 className="font-semibold text-lg">
            Market Trends
          </h3>


          <p className="text-gray-600 mt-2">

            {insights || "No market trend data available"}

          </p>


        </div>





        <div>


          <h3 className="font-semibold text-lg">
            Growth Analysis
          </h3>


          <p className="text-gray-600 mt-2">

            {growth || "No growth data available"}

          </p>


        </div>



      </div>



    </div>

  );

}


export default MarketInsights;