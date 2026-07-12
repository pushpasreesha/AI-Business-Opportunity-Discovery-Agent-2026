import os
import requests

from dotenv import load_dotenv


# Load environment variables
load_dotenv()


NEWS_API_KEY = os.getenv(
    "NEWS_API_KEY"
)



# ---------------------------------
# Industry Search Mapping
# ---------------------------------

INDUSTRY_QUERIES = {


    "healthcare":
        "healthcare OR medicine OR hospital OR medical OR disease OR AI diagnosis",


    "health":
        "health OR medical OR hospital OR biotechnology",


    "ai":
        "artificial intelligence OR machine learning OR generative AI OR robotics",


    "artificial intelligence":
        "artificial intelligence OR machine learning OR automation",


    "finance":
        "finance OR fintech OR banking OR investment",


    "fintech":
        "fintech OR digital banking OR payment OR lending",


    "education":
        "education OR edtech OR online learning",


    "security":
        "cybersecurity OR data security OR privacy"

}




# ---------------------------------
# News API Tool
# ---------------------------------

def search_news(
    industry: str
):


    if not NEWS_API_KEY:


        return {

            "error":
            "NEWS_API_KEY not found",

            "articles": [],

            "count": 0

        }




    url = (
        "https://newsapi.org/v2/everything"
    )



    query = INDUSTRY_QUERIES.get(

        industry.lower(),

        industry

    )



    params = {


        "q": query,


        "apiKey":
        NEWS_API_KEY,


        "language":
        "en",


        "sortBy":
        "publishedAt",


        "pageSize":
        5

    }



    try:


        print(
            "News API Query:",
            query
        )



        response = requests.get(

            url,

            params=params,

            timeout=10

        )



        data = response.json()



        # API Error Handling

        if data.get(
            "status"
        ) != "ok":


            print(
                "News API Error:",
                data
            )


            return {


                "error":
                data.get(
                    "message",
                    "Unknown API error"
                ),


                "articles": [],


                "count": 0

            }




        articles = []



        for article in data.get(
            "articles",
            []
        ):



            articles.append(


                {


                    "title":
                    article.get(
                        "title",
                        ""
                    ),


                    "description":
                    article.get(
                        "description",
                        ""
                    ),


                    "url":
                    article.get(
                        "url",
                        ""
                    ),


                    "published_at":
                    article.get(
                        "publishedAt",
                        ""

                    )


                }


            )




        return {


            "industry":
            industry,


            "articles":
            articles,


            "count":
            len(articles)

        }




    except Exception as e:


        return {


            "error":
            str(e),


            "industry":
            industry,


            "articles":
            [],


            "count":
            0

        }