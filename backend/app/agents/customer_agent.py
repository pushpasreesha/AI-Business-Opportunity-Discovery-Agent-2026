import pandas as pd
from typing import Dict
import nltk
from nltk.corpus import stopwords


nltk.download("stopwords")


class CustomerPainPointAgent:

    def __init__(self):

        self.name = "Customer Pain Point Agent"

        self.dataset_path = (
            "datasets/Google Play App Reviews Dataset/GooglePlay_App_Data.csv"
        )


    def analyze_customer_feedback(
        self,
        keyword: str
    ) -> Dict:


        negative_reviews = []

        positive_count = 0
        negative_count = 0



        # ---------------------------------
        # Pain Point Categories
        # ---------------------------------

        pain_point_categories = {


            "Login Issues": [

                "login",
                "log in",
                "sign in",
                "password",
                "forgot password",
                "unable to login"

            ],


            "App Crashes": [

                "crash",
                "crashes",
                "crashed",
                "freeze",
                "frozen",
                "stuck"

            ],


            "Installation Problems": [

                "install",
                "download",
                "update",
                "cannot install",
                "unable install"

            ],


            "Payment Problems": [

                "payment",
                "subscription",
                "billing",
                "charged",
                "refund",
                "money"

            ],


            "Performance Issues": [

                "slow",
                "lag",
                "loading",
                "hang",
                "delay"

            ],


            "Data Loss Problems": [

                "lost",
                "missing",
                "deleted",
                "wiped",
                "restore",
                "backup"

            ],


            "Customer Support Issues": [

                "support",
                "customer service",
                "response",
                "contact",
                "help"

            ],


            "Feature Problems": [

                "feature",
                "option",
                "not available",
                "doesn't work",
                "not working"

            ],


            "Security Problems": [

                "security",
                "privacy",
                "hack",
                "unsafe"

            ],


            "Advertisement Issues": [

                "ads",
                "advertisement",
                "too many ads"

            ]

        }



        # ---------------------------------
        # Read Dataset
        # ---------------------------------

        for chunk in pd.read_csv(
            self.dataset_path,
            chunksize=50000
        ):


            for _, row in chunk.iterrows():


                review = str(
                    row.get(
                        "review_description",
                        ""
                    )
                ).lower()


                if (
                    review == "nan"
                    or len(review.split()) < 3
                ):
                    continue



                try:

                    rating = int(
                        row["rating"]
                    )

                except:

                    continue



                # Negative Reviews

                if rating <= 3:


                    negative_reviews.append(
                        review
                    )

                    negative_count += 1



                else:

                    positive_count += 1




        # ---------------------------------
        # No Reviews
        # ---------------------------------

        if len(negative_reviews) == 0:


            return {


                "agent":
                    self.name,


                "keyword":
                    keyword,


                "negative_reviews_found":
                    0,


                "positive_reviews_found":
                    positive_count,


                "common_pain_points":
                    []

            }




        # ---------------------------------
        # Category Analysis
        # ---------------------------------

        pain_scores = {}



        for category, keywords in pain_point_categories.items():


            count = 0


            for review in negative_reviews:


                found = False


                for word in keywords:


                    if word in review:

                        found = True
                        break



                if found:

                    count += 1



            if count > 0:

                pain_scores[category] = count





        # ---------------------------------
        # Sort Results
        # ---------------------------------

        sorted_points = sorted(

            pain_scores.items(),

            key=lambda x:x[1],

            reverse=True

        )



        pain_points = []



        for issue, count in sorted_points[:10]:


            percentage = round(

                (count / negative_count) * 100,

                2

            )


            pain_points.append(

                [

                    issue,

                    percentage

                ]

            )




        return {


            "agent":

                self.name,


            "keyword":

                keyword,


            "negative_reviews_found":

                negative_count,


            "positive_reviews_found":

                positive_count,


            "common_pain_points":

                pain_points


        }



customer_agent = CustomerPainPointAgent()