import { useState } from "react";
import Layout from "../components/layout/Layout";
import api from "../Api/api";

function SearchOpportunity() {

  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);



  const analyzeOpportunity = async () => {

    if (!industry || !location) {
      alert("Please enter Industry and Location");
      return;
    }


    try {

      setLoading(true);


      const response = await api.post("/analyze", {
        industry,
        location,
      });


      console.log(
        JSON.stringify(response.data, null, 2)
      );


      setResult(response.data);


    } catch (error) {

      console.error(error);

      alert("Backend connection failed.");

    } finally {

      setLoading(false);

    }

  };



  const recommendation =
    result?.opportunity_analysis
    ?.opportunities?.[0];



  const reflections =
    result?.reflection_analysis
    ?.reflection || [];




  return (

    <Layout>


      <h1 className="text-3xl font-bold mb-8">
        Search Business Opportunity
      </h1>



      <div className="bg-white rounded-2xl shadow p-8">


        <div className="grid grid-cols-2 gap-6">


          <input
            className="border rounded-xl p-3"
            placeholder="Industry (AI)"
            value={industry}
            onChange={(e)=>setIndustry(e.target.value)}
          />



          <input
            className="border rounded-xl p-3"
            placeholder="Location (USA)"
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
          />


        </div>



        <button

          onClick={analyzeOpportunity}

          className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"

        >

          {
            loading
            ? "Analyzing..."
            : "Analyze"
          }

        </button>


      </div>





      {result && (

        <div className="mt-8 grid grid-cols-2 gap-6">



          {/* Market */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold mb-2">
              Market
            </h2>


            <p>
              Companies Found:
              {" "}
              {
                result?.market_analysis
                ?.companies_found ?? 0
              }
            </p>


            <p>
              Funding:
              {" "}
              {
                result?.market_analysis
                ?.total_funding ?? 0
              }
            </p>


          </div>





          {/* Competition */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold mb-2">
              Competition
            </h2>


            <p>
              Competitors:
              {" "}
              {
                result?.competitor_analysis
                ?.competitors_found
                ?? "Not analyzed"
              }
            </p>



            <p>
              Level:
              {" "}
              {
                result?.competitor_analysis
                ?.competition_level
                ?? "Not analyzed"
              }
            </p>


          </div>






          {/* News */}

          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="font-bold mb-2">
              News
            </h2>


            <p>
              Articles:
              {" "}
              {
                result?.news_analysis
                ?.news_count ?? 0
              }
            </p>


            <p>
              Trend:
              {" "}
              {
                result?.news_analysis
                ?.trend_signal ?? "Unknown"
              }
            </p>


          </div>







          {/* Recommendation */}

          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="font-bold mb-4">
              AI Startup Recommendation
            </h2>



            {
              recommendation ? (

                <div>


                  <h3 className="font-semibold text-lg">
                    {
                      recommendation.title
                    }
                  </h3>



                  <p className="mt-3">
                    {
                      recommendation.description
                    }
                  </p>



                  <p className="mt-3">

                    <b>
                      Target Customers:
                    </b>

                    {" "}
                    {
                      recommendation.target_customers
                    }

                  </p>




                  <p className="mt-3">

                    <b>
                      Business Model:
                    </b>

                    {" "}
                    {
                      recommendation.business_model
                    }

                  </p>




                  <p className="mt-3">

                    <b>
                      Opportunity Score:
                    </b>

                    {" "}
                    {
                      recommendation.opportunity_score
                    }

                  </p>


                </div>


              ) : (

                <p className="font-semibold">
                  No startup recommendation available
                </p>

              )

            }


          </div>






          {/* Reflection Analysis */}

          <div className="bg-white rounded-xl shadow p-6 col-span-2">


            <h2 className="font-bold text-xl mb-4">
              Reflection Analysis
            </h2>



            {
              reflections.length > 0 ? (

                reflections.map((item,index)=>(

                  <div
                    key={index}
                    className="border rounded-xl p-4 mb-4"
                  >


                    <h3 className="font-semibold text-lg">
                      {item.title}
                    </h3>



                    <p>
                      Quality Score:
                      {" "}
                      {item.quality_score}
                    </p>



                    <p>
                      Unique:
                      {" "}
                      {
                        item.unique
                        ? "Yes"
                        : "No"
                      }
                    </p>



                    <p>
                      Feasible:
                      {" "}
                      {
                        item.feasible
                        ? "Yes"
                        : "No"
                      }
                    </p>



                    <p>
                      Scalable:
                      {" "}
                      {
                        item.scalable
                        ? "Yes"
                        : "No"
                      }
                    </p>



                    <p className="mt-2">

                      <b>
                        Improvements:
                      </b>

                      {" "}
                      {item.improvements}

                    </p>


                  </div>

                ))

              ) : (

                <p>
                  Reflection analysis not available
                </p>

              )

            }


          </div>




        </div>

      )}



    </Layout>

  );

}


export default SearchOpportunity;
