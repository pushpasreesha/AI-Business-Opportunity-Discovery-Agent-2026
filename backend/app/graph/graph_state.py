from typing import TypedDict, Dict, Any, List


class GraphState(TypedDict, total=False):

    # =============================
    # User Input
    # =============================

    industry: str

    location: str


    # =============================
    # Planner Output
    # =============================

    tasks: List[str]


    # =============================
    # Agent Outputs
    # =============================

    market_result: Dict[str, Any]


    competitor_result: Dict[str, Any]


    news_result: Dict[str, Any]


    customer_result: Dict[str, Any]


    opportunity_result: Dict[str, Any]


    # =============================
    # Reflection Agent Output
    # =============================

    reflection_result: Dict[str, Any]