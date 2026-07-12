from langgraph.checkpoint.sqlite import SqliteSaver


memory = SqliteSaver.from_conn_string(
    "business_memory.db"
)