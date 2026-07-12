import os
import json

from dotenv import load_dotenv
from groq import Groq


# Load environment variables
load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)



class ReflectionAgent:


    def __init__(self):

        self.name = "Reflection Agent"



    def review_opportunities(
        self,
        opportunities
    ):


        prompt = f"""

You are a startup investment reviewer and venture capital analyst.

Review the following startup opportunities:

{json.dumps(opportunities, indent=2)}


Analyze each opportunity based on:

1. Is the idea unique?
2. Is it technically feasible?
3. Is it scalable?
4. Is the opportunity score realistic?
5. What improvements are required?


Rules:

- Do not reject all ideas.
- Give practical feedback.
- Think like a VC investor.
- Keep scores between 0 and 100.
- Return ONLY valid JSON.
- Do not use markdown.


Return format:

{{
    "reflection": [
        {{
            "title": "",
            "quality_score": 0,
            "unique": true,
            "feasible": true,
            "scalable": true,
            "improvements": ""
        }}
    ]
}}

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

            max_tokens=1000

        )


        text = response.choices[0].message.content



        try:

            cleaned = (
                text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )


            result = json.loads(cleaned)


        except Exception:


            result = {

                "reflection": [

                    {
                        "title": "Reflection Failed",

                        "quality_score": 0,

                        "unique": False,

                        "feasible": False,

                        "scalable": False,

                        "improvements": text
                    }

                ]

            }



        return {

            "agent": self.name,

            "reflection": result.get(
                "reflection",
                []
            )

        }



reflection_agent = ReflectionAgent()