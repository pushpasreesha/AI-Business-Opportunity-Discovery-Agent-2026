function Recommendations({ opportunity }) {


  const recommendations = [

    opportunity?.startup_idea,

    opportunity?.solution,

    opportunity?.business_model,

    opportunity?.competitive_advantage

  ].filter(Boolean);



  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">


      <h2 className="text-xl font-bold mb-6">
        Recommendations
      </h2>



      <div className="space-y-4">


        {
          recommendations.length > 0 ?


          recommendations.map(

            (item,index)=>(

              <div
                key={index}
                className="p-4 bg-gray-100 rounded-xl"
              >

                {item}

              </div>

            )

          )


          :

          (

            <p>
              No recommendations available
            </p>

          )

        }


      </div>


    </div>

  );

}


export default Recommendations;