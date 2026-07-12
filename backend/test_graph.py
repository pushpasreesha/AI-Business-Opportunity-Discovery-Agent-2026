from app.graph.workflow import business_workflow

result = business_workflow.invoke(
    {
        "industry": "AI",
        "location": "USA",
    }
)

print(result)