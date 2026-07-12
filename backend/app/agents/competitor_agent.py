import pandas as pd
from typing import Dict


class CompetitorAnalysisAgent:

    def __init__(self):
        self.name = "Competitor Analysis Agent"

        self.dataset_path = "datasets/unicorn/Unicorn_Companies.csv"


        self.industry_mapping = {

            "ai": [
                "Artificial Intelligence",
                "AI",
                "Machine Learning",
                "Software",
                "Data"
            ],

            "healthcare": [
                "Health",
                "Healthcare",
                "Biotech",
                "Medical"
            ],

            "health": [
                "Health",
                "Healthcare",
                "Biotech",
                "Medical"
            ],

            "finance": [
                "Fintech",
                "Finance",
                "Payments"
            ],

            "fintech": [
                "Fintech",
                "Finance",
                "Payments"
            ],

            "education": [
                "Edtech",
                "Education"
            ],

            "edtech": [
                "Edtech",
                "Education"
            ],

            "security": [
                "Cybersecurity",
                "Security"
            ],

            "cybersecurity": [
                "Cybersecurity",
                "Security"
            ]
        }



    def analyze_competitors(
        self,
        industry: str,
        location: str
    ) -> Dict:


        df = pd.read_csv(
            self.dataset_path,
            low_memory=False
        )


        # Clean columns

        df["Industry"] = (
            df["Industry"]
            .fillna("")
            .astype(str)
        )


        df["Country"] = (
            df["Country"]
            .fillna("")
            .astype(str)
        )



        # Industry keywords

        industry_key = industry.lower()


        keywords = self.industry_mapping.get(
            industry_key,
            [industry]
        )



        # Industry filtering

        filtered = df[
            df["Industry"]
            .apply(
                lambda x:
                any(
                    keyword.lower()
                    in x.lower()
                    for keyword in keywords
                )
            )
        ]



        # Country filtering

        if location:


            location_map = {

                "usa": [
                    "United States",
                    "USA",
                    "US"
                ],


                "india": [
                    "India"
                ],


                "uk": [
                    "United Kingdom",
                    "UK"
                ]

            }



            countries = location_map.get(
                location.lower(),
                [location]
            )



            filtered = filtered[
                filtered["Country"]
                .apply(
                    lambda x:
                    any(
                        country.lower()
                        in x.lower()
                        for country in countries
                    )
                )
            ]



        filtered = filtered.copy()



        top_companies = []



        # Handle empty results

        if filtered.empty:

            return {

                "agent": self.name,

                "industry": industry,

                "location": location,

                "competitors_found": 0,

                "top_competitors": [],

                "competition_level": "Low"

            }



        # Safe valuation handling

        if "Valuation ($B)" in filtered.columns:


            filtered["valuation_number"] = (

                filtered["Valuation ($B)"]

                .astype(str)

                .str.replace(
                    "$",
                    "",
                    regex=False
                )

                .str.replace(
                    "B",
                    "",
                    regex=False
                )

                .str.replace(
                    "M",
                    "",
                    regex=False
                )

            )


            filtered["valuation_number"] = pd.to_numeric(

                filtered["valuation_number"],

                errors="coerce"

            )



            available_columns = [

                col

                for col in [

                    "Company",

                    "Valuation ($B)",

                    "Total Raised"

                ]

                if col in filtered.columns

            ]



            top_companies = (

                filtered

                .sort_values(

                    "valuation_number",

                    ascending=False

                )

                [

                    available_columns

                ]

                .head(5)

                .to_dict("records")

            )



        else:


            available_columns = [

                col

                for col in [

                    "Company",

                    "Total Raised"

                ]

                if col in filtered.columns

            ]


            top_companies = (

                filtered[available_columns]

                .head(5)

                .to_dict("records")

            )




        return {


            "agent": self.name,


            "industry": industry,


            "location": location,


            "competitors_found": len(filtered),


            "top_competitors": top_companies,


            "competition_level":

                "High"

                if len(filtered) > 10

                else "Moderate"

        }




competitor_agent = CompetitorAnalysisAgent()