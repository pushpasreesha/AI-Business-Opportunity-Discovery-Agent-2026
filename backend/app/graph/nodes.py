from app.graph.graph_state import GraphState


from app.agents.market_agent import market_agent
from app.agents.competitor_agent import competitor_agent
from app.agents.news_agent import news_agent
from app.agents.customer_agent import customer_agent
from app.agents.opportunity_agent import opportunity_agent
from app.agents.reflection_agent import reflection_agent



# ==============================
# Market Agent Node
# ==============================

def market_node(state: GraphState):

    result = market_agent.analyze_market(
        state["industry"],
        state["location"]
    )

    return {
        "market_result": result
    }



# ==============================
# Competitor Agent Node
# ==============================

def competitor_node(state: GraphState):

    result = competitor_agent.analyze_competitors(
        state["industry"],
        state["location"]
    )

    return {
        "competitor_result": result
    }



# ==============================
# News Agent Node
# ==============================

def news_node(state: GraphState):

    result = news_agent.analyze_news(
        state["industry"]
    )

    return {
        "news_result": result
    }



# ==============================
# Customer Agent Node
# ==============================

def customer_node(state: GraphState):

    result = customer_agent.analyze_customer_feedback(
        state["industry"]
    )

    return {
        "customer_result": result
    }



# ==============================
# Analysis Collector Node
# ==============================

def analysis_complete_node(state: GraphState):

    print("\n========== ANALYSIS COMPLETE ==========")


    print(
        "Market Result:",
        "Available"
        if state.get("market_result")
        else "Missing"
    )


    print(
        "Competitor Result:",
        "Available"
        if state.get("competitor_result")
        else "Missing"
    )


    print(
        "News Result:",
        "Available"
        if state.get("news_result")
        else "Missing"
    )


    print(
        "Customer Result:",
        "Available"
        if state.get("customer_result")
        else "Missing"
    )


    print("=======================================\n")


    return {
        "market_result": state.get(
            "market_result",
            {}
        ),

        "competitor_result": state.get(
            "competitor_result",
            {}
        ),

        "news_result": state.get(
            "news_result",
            {}
        ),

        "customer_result": state.get(
            "customer_result",
            {}
        )
    }



# ==============================
# Opportunity Agent Node
# ==============================

def opportunity_node(state: GraphState):


    market_result = state.get(
        "market_result",
        {}
    )


    competitor_result = state.get(
        "competitor_result",
        {}
    )


    news_result = state.get(
        "news_result",
        {}
    )


    customer_result = state.get(
        "customer_result",
        {}
    )


    result = opportunity_agent.generate_opportunities(
        market_result,
        competitor_result,
        news_result,
        customer_result
    )


    return {
        "opportunity_result": result
    }



# ==============================
# Reflection Agent Node
# ==============================

def reflection_node(state: GraphState):


    opportunity_result = state.get(
        "opportunity_result",
        {}
    )


    opportunities = opportunity_result.get(
        "opportunities",
        []
    )


    result = reflection_agent.review_opportunities(
        opportunities
    )


    print("\n========== REFLECTION COMPLETE ==========")

    print(
        "Reviewed Opportunities:",
        len(
            result.get(
                "reflection",
                []
            )
        )
    )

    print("=========================================\n")


    return {
        "reflection_result": result
    }