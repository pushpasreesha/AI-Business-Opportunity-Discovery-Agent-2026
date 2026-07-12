from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

from app.graph.graph_state import GraphState
from app.graph.planner import planner_node

from app.graph.nodes import (
    market_node,
    competitor_node,
    news_node,
    customer_node,
    opportunity_node,
    reflection_node,
    analysis_complete_node,
)



# ==============================
# Memory Checkpointer
# ==============================

memory = MemorySaver()



# ==============================
# Router
# ==============================

def route_tasks(state: GraphState):

    tasks = state.get(
        "tasks",
        []
    )

    print("\n========== ROUTER ==========")
    print("Selected Tasks:", tasks)
    print("============================\n")

    return tasks



# ==============================
# Build Graph
# ==============================

builder = StateGraph(GraphState)



# Nodes

builder.add_node(
    "planner",
    planner_node
)


builder.add_node(
    "market",
    market_node
)


builder.add_node(
    "competitor",
    competitor_node
)


builder.add_node(
    "news",
    news_node
)


builder.add_node(
    "customer",
    customer_node
)


builder.add_node(
    "analysis_complete",
    analysis_complete_node
)


builder.add_node(
    "opportunity",
    opportunity_node
)


builder.add_node(
    "reflection",
    reflection_node
)



# START

builder.add_edge(
    START,
    "planner"
)



# Planner Routing

builder.add_conditional_edges(
    "planner",
    route_tasks,
    {

        "market": "market",

        "competitor": "competitor",

        "news": "news",

        "customer": "customer"

    }
)



# Agents -> Collector

builder.add_edge(
    "market",
    "analysis_complete"
)

builder.add_edge(
    "competitor",
    "analysis_complete"
)

builder.add_edge(
    "news",
    "analysis_complete"
)

builder.add_edge(
    "customer",
    "analysis_complete"
)



# Collector -> Opportunity

builder.add_edge(
    "analysis_complete",
    "opportunity"
)



# Opportunity -> Reflection

builder.add_edge(
    "opportunity",
    "reflection"
)



# Reflection -> END

builder.add_edge(
    "reflection",
    END
)



# Compile with Memory

business_workflow = builder.compile(
    checkpointer=memory
)