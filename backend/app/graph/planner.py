from typing import Dict

from app.graph.graph_state import GraphState



def planner_node(state: GraphState) -> Dict:

    industry = state["industry"].lower()

    tasks = []


    # -----------------------------
    # AI Industry
    # -----------------------------

    if industry in [
        "ai",
        "artificial intelligence"
    ]:

        tasks = [
            "market",
            "competitor",
            "news",
            "customer"
        ]


    # -----------------------------
    # Finance Industry
    # -----------------------------

    elif industry in [
        "finance",
        "fintech"
    ]:

        tasks = [
            "market",
            "competitor",
            "news",
            "customer"
        ]


    # -----------------------------
    # Healthcare Industry
    # -----------------------------

    elif industry in [
        "health",
        "healthcare"
    ]:

        tasks = [
            "market",
            "competitor",
            "customer",
            "news"
        ]


    # -----------------------------
    # Default Industry
    # -----------------------------

    else:

        tasks = [
            "market",
            "competitor",
            "news",
            "customer"
        ]



    print("\n========== Planner ==========")
    print("Industry :", industry)
    print("Tasks :", tasks)
    print("=============================\n")


    return {
        "tasks": tasks
    }