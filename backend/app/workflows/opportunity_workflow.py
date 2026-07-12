from app.graph.workflow import business_workflow



class OpportunityWorkflow:


    def __init__(self):

        self.name = "Business Opportunity Discovery Workflow"



    def analyze_opportunity(
        self,
        industry: str,
        location: str
    ):


        try:


            print("\n==============================")
            print("Starting Opportunity Workflow")
            print("==============================")

            print("Running LangGraph Workflow...")



            # ---------------------------------
            # LangGraph Workflow With Memory
            # ---------------------------------

            graph_result = business_workflow.invoke(

                {
                    "industry": industry,
                    "location": location
                },

                config={

                    "configurable": {

                        # Separate memory per analysis
                        "thread_id": f"{industry}_{location}"

                    }

                }

            )



            print("✓ LangGraph Workflow Completed")



            # ---------------------------------
            # Extract Results
            # ---------------------------------

            market_result = graph_result.get(
                "market_result",
                {}
            )


            competitor_result = graph_result.get(
                "competitor_result",
                {}
            )


            news_result = graph_result.get(
                "news_result",
                {}
            )


            customer_result = graph_result.get(
                "customer_result",
                {}
            )


            opportunity_result = graph_result.get(
                "opportunity_result",
                {}
            )


            reflection_result = graph_result.get(
                "reflection_result",
                {}
            )



            # ---------------------------------
            # Market Gap Analysis
            # ---------------------------------

            print("Generating Market Gap Analysis...")



            companies = market_result.get(
                "companies_found",
                0
            )


            competitors = competitor_result.get(
                "competitors_found",
                0
            )


            complaints = customer_result.get(
                "negative_reviews_found",
                0
            )



            market_gaps = []



            if competitors < 20:

                market_gaps.append({

                    "title": "Low Competition Market",

                    "description":
                    "Few competitors are operating in this market, creating opportunities for new startups.",

                    "priority": "High"

                })



            if complaints > 50:

                market_gaps.append({

                    "title": "Customer Pain Points",

                    "description":
                    "High customer complaints indicate unmet user needs.",

                    "priority": "High"

                })



            growth = market_result.get(
                "growth_indicators",
                {}
            )



            if growth.get(
                "market_growth",
                0
            ) > 60:


                market_gaps.append({

                    "title": "Growing Market",

                    "description":
                    "Increasing market growth creates new business opportunities.",

                    "priority": "Medium"

                })



            if companies < 100:


                market_gaps.append({

                    "title": "Emerging Industry",

                    "description":
                    "Limited company presence indicates an untapped market.",

                    "priority": "High"

                })



            if not market_gaps:


                market_gaps.append({

                    "title": "Innovation Opportunity",

                    "description":
                    "Improve existing solutions through AI, automation, better pricing, or niche targeting.",

                    "priority": "Medium"

                })



            market_gap_result = {


                "industry": industry,

                "location": location,

                "companies": companies,

                "competitors": competitors,

                "negative_reviews": complaints,

                "market_gaps": market_gaps

            }



            print("✓ Market Gap Analysis Completed")



            print("==============================")
            print("Workflow Completed Successfully")
            print("==============================")



            return {


                "workflow": self.name,


                "industry": industry,


                "location": location,


                # Agent Outputs

                "market_analysis": market_result,


                "competitor_analysis": competitor_result,


                "news_analysis": news_result,


                "customer_analysis": customer_result,


                "opportunity_analysis": opportunity_result,


                # Reflection Agent Output

                "reflection_analysis": reflection_result,


                # Market Gap Output

                "market_gap_analysis": market_gap_result

            }



        except Exception as e:


            print("\n==============================")
            print("WORKFLOW ERROR")
            print("==============================")


            print(type(e).__name__)

            print(e)


            print("==============================")


            raise e





opportunity_workflow = OpportunityWorkflow()