import { useState } from "react";
import Layout from "../components/layout/Layout";
import MetricCard from "../components/dashboard/MetricCard";
import api from "../api/api";

import {
  MessageSquareWarning,
  ThumbsDown,
  ThumbsUp
} from "lucide-react";


function CustomerPainPoints() {


  const [category, setCategory] = useState("All Apps");
  const [country, setCountry] = useState("USA");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);



  




  const analyzeCustomerPainPoints = async (
    selectedCategory = category,
    selectedCountry = country
  ) => {


    try {


      setLoading(true);


      const response = await api.post(
        "/analyze",
        {

          industry: selectedCategory,

          location: selectedCountry

        }
      );


      console.log(response.data);


      setData(response.data);


    }

    catch(error) {


      console.error(error);


      alert(
        "Unable to fetch customer pain points"
      );


    }

    finally {

      setLoading(false);

    }


  };




  return (

    <Layout>


      <div className="space-y-8">



        <div>

          <h1 className="text-3xl font-bold">
            Customer Pain Points
          </h1>


          <p className="text-gray-500 mt-2">

            Analyze customer complaints, reviews and product problems.

          </p>


        </div>





        <div className="bg-white rounded-2xl shadow-lg p-6">


          <div className="grid md:grid-cols-3 gap-6">



            <div>


              <label className="font-semibold">

                App Category

              </label>



              <select

                value={category}

                onChange={(e)=>
                  setCategory(e.target.value)
                }

                className="w-full border rounded-xl p-3 mt-2"

              >

                <option>
                  All Apps
                </option>

                <option>
                  Education Apps
                </option>

                <option>
                  Health Apps
                </option>

                <option>
                  Finance Apps
                </option>

                <option>
                  Entertainment Apps
                </option>

                <option>
                  Gaming Apps
                </option>


              </select>


            </div>





            <div>


              <label className="font-semibold">

                Country

              </label>



              <select

                value={country}

                onChange={(e)=>
                  setCountry(e.target.value)
                }

                className="w-full border rounded-xl p-3 mt-2"

              >

                <option>
                  USA
                </option>

                <option>
                  India
                </option>

                <option>
                  UK
                </option>


              </select>


            </div>





            <button


              onClick={() =>
                analyzeCustomerPainPoints()
              }


              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-7 p-3 font-semibold"


            >


              {

                loading

                ?

                "Analyzing..."

                :

                "Analyze"

              }


            </button>



          </div>


        </div>







        {data &&


          <>



            <div className="grid md:grid-cols-3 gap-6">



              <MetricCard


                title="Negative Reviews"


                value={

                  data.customer_analysis
                  ?.negative_reviews_found || 0

                }


                icon={
                  <ThumbsDown className="text-white"/>
                }


                color="bg-red-600"


              />





              <MetricCard


                title="Positive Reviews"


                value={

                  data.customer_analysis
                  ?.positive_reviews_found || 0

                }


                icon={
                  <ThumbsUp className="text-white"/>
                }


                color="bg-green-600"


              />





              <MetricCard


                title="Category"


                value={

                  data.customer_analysis
                  ?.keyword || "All Apps"

                }


                icon={
                  <MessageSquareWarning className="text-white"/>
                }


                color="bg-blue-600"


              />



            </div>







            <div className="bg-white rounded-2xl shadow-lg p-6">



              <h2 className="text-xl font-bold mb-5">

                Common Customer Pain Points

              </h2>





              <table className="w-full">



                <thead>


                  <tr className="border-b">


                    <th className="text-left p-3">

                      Issue

                    </th>



                    <th className="text-left p-3">

                      Frequency

                    </th>


                  </tr>


                </thead>







                <tbody>


                {

                  data.customer_analysis

                  ?.common_pain_points

                  ?.map(

                    (item,index)=>(


                      <tr

                        key={index}

                        className="border-b"

                      >



                        <td className="p-3">

                          {item[0]}

                        </td>




                        <td className="p-3">

                          {item[1]}

                        </td>



                      </tr>


                    )

                  )

                }



                </tbody>




              </table>




            </div>



          </>


        }




      </div>



    </Layout>


  );


}



export default CustomerPainPoints;