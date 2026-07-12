from typing import Dict


class MarketGapAgent:


    def __init__(self):

        self.name = "Market Gap Analysis Agent"



    def analyze_market_gap(
        self,
        market_data: Dict,
        competitor_data: Dict,
        customer_data: Dict
    ) -> Dict:



        gaps = []


        # -----------------------------
        # Customer Pain Analysis
        # -----------------------------

        pain_points = customer_data.get(
            "common_pain_points",
            []
        )


        for item in pain_points[:5]:

            gaps.append(
                f"Customers face {item[0]}"
            )



        # -----------------------------
        # Competition Analysis
        # -----------------------------

        competitors = competitor_data.get(
            "competitors_found",
            0
        )


        if competitors > 10:

            competition_message = (
                "Market is crowded. "
                "Differentiation is required."
            )

        else:

            competition_message = (
                "Low competition detected. "
                "Opportunity exists."
            )



        # -----------------------------
        # Opportunity Generation
        # -----------------------------


        if len(gaps) > 0:


            opportunity = (

                "Build solutions targeting: "

                +

                ", ".join(gaps[:3])

            )


        else:


            opportunity = (

                "Explore underserved customer needs "
                "in this market."

            )



        # -----------------------------
        # Opportunity Score
        # -----------------------------


        customer_score = min(
            len(pain_points) * 10,
            50
        )


        market_score = min(

            market_data.get(
                "companies_found",
                0
            )
            /100,

            30

        )


        competition_score = (

            20

            if competitors < 10

            else 10

        )


        opportunity_score = round(

            customer_score

            +

            market_score

            +

            competition_score

        )



        return {


            "agent":
                self.name,


            "market_gaps":
                gaps,


            "competition_analysis":
                competition_message,


            "startup_opportunity":
                opportunity,


            "opportunity_score":
                opportunity_score


        }



market_gap_agent = MarketGapAgent()