from typing import Dict

from app.tools.news_tool import search_news



class NewsTrendAgent:


    def __init__(self):

        self.name = "News Trend Agent"



    # ---------------------------------
    # Analyze News Using Tool Calling
    # ---------------------------------

    def analyze_news(
        self,
        industry: str
    ) -> Dict:


        print("\n========== NEWS TOOL ==========")
        print("Fetching live news for:", industry)
        print("===============================\n")



        # Call News API Tool

        news_result = search_news(
            industry
        )



        articles = news_result.get(
            "articles",
            []
        )


        count = news_result.get(
            "count",
            0
        )



        # ---------------------------------
        # Trend Calculation
        # ---------------------------------

        if count > 20:

            trend = "High"


        elif count > 5:

            trend = "Moderate"


        else:

            trend = "Low"





        print(
            "News Articles Found:",
            count
        )



        return {


            "agent": self.name,


            "industry": industry,


            "news_count": count,


            "trend_signal": trend,


            "articles": articles

        }





news_agent = NewsTrendAgent()