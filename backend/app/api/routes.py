from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.workflows.opportunity_workflow import opportunity_workflow
from app.agents.competitor_agent import competitor_agent
from app.services.history_service import save_analysis, get_user_history
from app.utils.deps import get_current_user


router = APIRouter()


class OpportunityRequest(BaseModel):
    industry: str
    location: str


# Full workflow endpoint
@router.post("/analyze")
async def analyze_opportunity(
    request: OpportunityRequest,
    current_user: dict = Depends(get_current_user)
):
    result = opportunity_workflow.analyze_opportunity(
        request.industry,
        request.location
    )

    await save_analysis(
        current_user["id"],
        request.industry,
        request.location,
        result
    )

    return result


# Competitor only endpoint
@router.post("/competitors")
def analyze_competitors(
    request: OpportunityRequest
):
    result = competitor_agent.analyze_competitors(
        request.industry,
        request.location
    )
    return {
        "competitor_analysis": result
    }


# Get logged-in user's analysis history
@router.get("/history")
async def get_history(current_user: dict = Depends(get_current_user)):
    items = await get_user_history(current_user["id"])
    return {"history": items}