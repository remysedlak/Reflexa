
from collections import Counter
from datetime import datetime
import json
class MonthlyInsights:
    def __init__(self, api_url):
        self.api_url = api_url

    def fetch_data(self, month, year):
        url = f"{self.api_url}/days/"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        # Filter data for the specified month and year
        filtered_data = [
            entry for entry in data
            if datetime.strptime(entry['entry_date'], '%Y-%m-%d').month == month and
               datetime.strptime(entry['entry_date'], '%Y-%m-%d').year == year
        ]
        return filtered_data

    def generate_insights(self, data):
        total_days = len(data)
        if total_days == 0:
            return {
                'total_days': 0,
                'average_sleep': 0,
                'mood_color_percentages': {},
                'average_hydration': 0,
                'average_exercise': 0
            }

        # Calculate average sleep
        total_sleep = sum(entry['hours_of_sleep'] for entry in data if entry['hours_of_sleep'] is not None)
        average_sleep = total_sleep / total_days

        # Calculate mood color percentages
        mood_colors = [entry['mood_color'] for entry in data if entry['mood_color']]
        mood_color_counts = Counter(mood_colors)
        mood_color_percentages = {color: (count / total_days) * 100 for color, count in mood_color_counts.items()}

        # Calculate average hydration
        total_hydration = sum(entry['hydration_amount'] for entry in data if entry['hydration_amount'] is not None)
        average_hydration = total_hydration / total_days

        # Calculate average exercise duration
        total_exercise = sum(entry['exercise_duration'] for entry in data if entry['exercise_duration'] is not None)
        average_exercise = total_exercise / total_days

        return {
            'total_days': total_days,
            'average_sleep': average_sleep,
            'mood_color_percentages': mood_color_percentages,
            'average_hydration': average_hydration,
            'average_exercise': average_exercise
        }

if __name__ == "__main__":
    api_url = "http://3.147.75.57:8000/api"
    month = datetime.now().month
    year = datetime.now().year

    insights_generator = MonthlyInsights(api_url)
    insights = insights_generator.get_monthly_insights(month, year)
    print(insights)
