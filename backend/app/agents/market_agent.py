import pandas as pd
from typing import Dict


class MarketResearchAgent:

    def __init__(self):

        self.name = "Market Research Agent"

        self.company_file = "datasets/startup investments/objects_slim.csv"

        self.industry_mapping = {

            "ai": [
                "software",
                "hardware",
                "search",
                "security",
                "analytics",
                "enterprise",
                "artificial",
                "machine",
                "data"
            ],

            "health": [
                "health",
                "biotech",
                "medical",
                "healthcare",
                "life"
            ],

            "healthcare": [
                "health",
                "biotech",
                "medical",
                "healthcare",
                "life"
            ],

            "finance": [
                "finance",
                "fintech",
                "bank",
                "payment",
                "financial"
            ],

            "fintech": [
                "finance",
                "fintech",
                "bank",
                "payment",
                "financial"
            ],

            "education": [
                "education",
                "edtech",
                "learning"
            ],

            "security": [
                "security",
                "cyber"
            ],

            "cybersecurity": [
                "security",
                "cyber"
            ]

        }


    def analyze_market(
        self,
        industry: str,
        location: str
    ) -> Dict:


        df = pd.read_csv(
            self.company_file,
            low_memory=False
        )


        # Clean funding

        if "funding_total_usd" in df.columns:

            df["funding_total_usd"] = (
                pd.to_numeric(
                    df["funding_total_usd"],
                    errors="coerce"
                )
                .fillna(0)
            )

        else:

            df["funding_total_usd"] = 0



        # Industry filtering

        industry_key = industry.lower()

        keywords = self.industry_mapping.get(
            industry_key,
            [industry]
        )



        if "category_code" in df.columns:


            industry_data = df[

                df["category_code"]
                .fillna("")
                .astype(str)
                .str.lower()
                .apply(

                    lambda x:

                    any(

                        keyword.lower() in x

                        for keyword in keywords

                    )

                )

            ]

        else:

            industry_data = df.copy()



        # Location filtering

        if location and "country_code" in df.columns:


            country_keywords = {

                "usa": [
                    "USA",
                    "US"
                ],

                "india": [
                    "IND",
                    "IN"
                ],

                "uk": [
                    "GB",
                    "UK"
                ]

            }



            countries = country_keywords.get(

                location.lower(),

                [location]

            )



            industry_data = industry_data[

                industry_data["country_code"]
                .fillna("")
                .astype(str)
                .str.upper()
                .apply(

                    lambda x:

                    any(

                        c.upper() in x

                        for c in countries

                    )

                )

            ]



        # Fallback

        if industry_data.empty:

            industry_data = df.sample(
                min(10, len(df))
            )



        # Statistics

        total_companies = len(industry_data)


        total_funding = (

            industry_data["funding_total_usd"]

            .sum()

        )



        # Top Companies

        available_columns = [

            col

            for col in [

                "name",

                "funding_total_usd"

            ]

            if col in industry_data.columns

        ]



        top_companies = (

            industry_data

            .sort_values(

                "funding_total_usd",

                ascending=False

            )

            [available_columns]

            .head(5)

            .to_dict("records")

        )



        # ----------------------------------
        # Dynamic Funding Distribution
        # ----------------------------------

        funding_distribution = {}


        if "category_code" in industry_data.columns:


            category_data = (

                industry_data

                .groupby("category_code")

                ["funding_total_usd"]

                .sum()

                .sort_values(

                    ascending=False

                )

                .head(5)

            )


            funding_distribution = (

                category_data

                .to_dict()

            )



        # Market Trends

        market_trends = (

            f"{industry.title()} market analysis shows "

            f"{total_companies} companies identified "

            f"with total funding of "

            f"${total_funding:,.0f}. "

            f"The industry shows active startup "

            f"investment and growth opportunities."

        )



        growth_analysis = (

            f"The {industry.title()} sector has "

            f"significant startup activity based on "

            f"company count and funding trends."

        )



        # Dynamic Growth Indicators

        market_growth = min(

            round((total_companies / 15000) * 100),

            100

        )


        investor_interest = min(

            round((total_funding / 10000000000) * 100),

            100

        )


        innovation_score = min(

            round(

                (

                    market_growth +

                    investor_interest

                ) / 2

            ),

            100

        )


        competition_score = min(

            round((total_companies / 20000) * 100),

            100

        )



        return {


            "agent": self.name,


            "industry": industry,


            "location": location,


            "companies_found": total_companies,


            "total_funding": int(total_funding),


            "market_trends": market_trends,


            "growth_analysis": growth_analysis,


            "growth_indicators": {


                "market_growth": market_growth,


                "investor_interest": investor_interest,


                "innovation_score": innovation_score,


                "competition": competition_score

            },


            "funding_distribution": funding_distribution,


            "top_companies": top_companies,


            "insight":

            "Market analysis generated from startup database"

        }



market_agent = MarketResearchAgent()
