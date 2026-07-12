import os
import json
from typing import Dict
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


class OpportunityDiscoveryAgent:

    def __init__(self):
        self.name = "Opportunity Discovery Agent"

    def generate_opportunities(
        self,
        market_data: Dict,
        competitor_data: Dict,
        news_data: Dict,
        customer_data: Dict
    ):

        # -----------------------------
        # Build concise summaries
        # -----------------------------

        market_summary = f"""
Industry: {market_data.get("industry")}
Country: {market_data.get("location")}
Companies: {market_data.get("companies_found")}
Total Funding: {market_data.get("total_funding")}
Growth Indicators: {market_data.get("growth_indicators")}
Top Companies:
{json.dumps(market_data.get("top_companies", [])[:3], indent=2)}
"""

        competitor_summary = f"""
Competition Level: {competitor_data.get("competition_level")}
Competitors Found: {competitor_data.get("competitors_found")}
Top Competitors:
{json.dumps(competitor_data.get("top_competitors", [])[:3], indent=2)}
"""


        news_summary = f"""
Articles Found: {news_data.get("news_count")}
Trend: {news_data.get("trend_signal")}

Top Categories:
{json.dumps(news_data.get("top_news_categories", [])[:3], indent=2)}
"""
        customer_summary = f"""
Negative Reviews: {customer_data.get("negative_reviews_found")}
Positive Reviews: {customer_data.get("positive_reviews_found")}

Main Customer Pain Points:
{json.dumps(customer_data.get("common_pain_points", [])[:3], indent=2)}
"""

        prompt = f"""
You are a Senior Startup Consultant, Product Strategist and Venture Capital Advisor.

Your goal is to discover REAL startup opportunities.

========================================================
SELECTED INDUSTRY
========================================================

{market_data.get("industry")}

========================================================
SELECTED COUNTRY
========================================================

{market_data.get("location")}

========================================================
MARKET SUMMARY
========================================================

{market_summary}

========================================================
COMPETITOR SUMMARY
========================================================

{competitor_summary}

========================================================
NEWS SUMMARY
========================================================

{news_summary}

========================================================
CUSTOMER SUMMARY
========================================================

{customer_summary}

========================================================

IMPORTANT RULES

1. ONLY generate ideas related to the selected industry.

2. Never change the industry.

3. Never suggest:
- Travel
- Fashion
- Beauty
- Entertainment
- Wellness
- Food

unless those industries are actually the selected industry.

4. Every startup idea MUST solve one or more customer pain points.

5. Every startup idea MUST reference at least one:
- market trend
- customer complaint
- competitor weakness
- news trend

6. Do NOT generate generic ideas like:
- AI Chatbot
- Customer Support Platform
- Analytics Dashboard

unless they are strongly justified.

7. Think like a VC.

Prefer opportunities that are:
- underserved
- scalable
- profitable
- technically feasible
- difficult for competitors to copy

8. Opportunity Score must ALWAYS be an integer between 70 and 100.

9. Generate EXACTLY FIVE opportunities.

Return ONLY valid JSON.

{{
  "opportunities":[
    {{
      "title":"",
      "description":"",
      "market_gap":"",
      "problem":"",
      "solution":"",
      "target_customers":"",
      "business_model":"",
      "competitive_advantage":"",
      "why_now":"",
      "opportunity_score":95
    }}
  ]
}}

Do NOT return markdown.
Do NOT explain anything outside JSON.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=1200
        )

        text = response.choices[0].message.content

        try:

            cleaned = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

            result = json.loads(cleaned)

        except Exception:

            result = {
                "opportunities": [
                    {
                        "title": "Unable to Generate Opportunities",
                        "description": text,
                        "market_gap": "Unavailable",
                        "problem": "Model returned invalid JSON.",
                        "solution": "",
                        "target_customers": "",
                        "business_model": "",
                        "competitive_advantage": "",
                        "why_now": "",
                        "opportunity_score": 75
                    }
                ]
            }

        opportunities = result.get("opportunities", [])

        opportunities = sorted(
            opportunities,
            key=lambda x: x.get("opportunity_score", 0),
            reverse=True
        )

        return {
            "agent": self.name,
            "industry": market_data.get("industry"),
            "location": market_data.get("location"),
            "opportunities": opportunities
        }


opportunity_agent = OpportunityDiscoveryAgent()