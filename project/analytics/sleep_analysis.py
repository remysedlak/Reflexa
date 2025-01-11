from datetime import datetime, timedelta
from collections import Counter
import pandas as pd
import json

def analyze_sleep_data(days_queryset):
    today = datetime.now()
    seven_days_ago = today - timedelta(days=7)

    # Convert queryset to DataFrame
    entries = pd.DataFrame(list(days_queryset.values()))
    entries['entry_date'] = pd.to_datetime(entries['entry_date'])
    
    # Filter recent entries
    recent_entries = entries[
        (entries['entry_date'] >= seven_days_ago) & (entries['entry_date'] <= today)
    ]

    if recent_entries.empty:
        return {
            'average_sleep': 0,
            'most_common_mood': None,
            'average_exercise': 0,
            'average_hydration': 0
        }

    # Calculate average sleep
    average_sleep = recent_entries['hours_of_sleep'].mean()

    # Calculate most common mood
    mood_scale = {
        '#008000': 'Good mood',
        '#FFD700': 'Happy',
        '#00BFFF': 'Neutral',
        '#FF6347': 'Sad',
        '#808080': 'Low',
        '#DC143C': 'Very Low',
        '#32CD32': 'Healthy mood',
        '#8A2BE2': 'Relaxed',
        '#FFFF00': 'Optimistic',
    }
    most_common_color = recent_entries['mood_color'].mode()[0]
    most_common_mood = {
        'color': most_common_color,
        'mood': mood_scale.get(most_common_color, 'Unknown')
    }

    # Calculate average exercise
    average_exercise = recent_entries['exercise_duration'].mean()

    # Calculate average hydration
    average_hydration = recent_entries['hydration_amount'].mean()

    return {
        'average_sleep': average_sleep,
        'most_common_mood': most_common_mood,
        'average_exercise': average_exercise,
        'average_hydration': average_hydration
    }
