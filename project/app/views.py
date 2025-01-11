from rest_framework import generics, viewsets
from rest_framework.response import Response
from analytics.sleep_analysis import analyze_sleep_data  # Adjust the import path

from .models import Days, MoodColors
from .serializers import DaysSerializer, MoodColorsSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from analytics.monthly_insights import MonthlyInsights
from django.utils import timezone
from datetime import timedelta

from rest_framework import generics, viewsets
from rest_framework.response import Response
from analytics.sleep_analysis import analyze_sleep_data  # Adjust the import path

from .models import Days, MoodColors
from .serializers import DaysSerializer, MoodColorsSerializer
from django.http import JsonResponse
from rest_framework.views import APIView
from analytics.monthly_insights import MonthlyInsights
from django.utils import timezone
from datetime import timedelta
from collections import Counter  # Import Counter

class PastThirtyDaysInsights(APIView):
    def get(self, request, format=None):
        end_date = timezone.now()
        start_date = end_date - timedelta(days=30)
        
        activities = Days.objects.filter(entry_date__range=[start_date, end_date])
        
        total_days = activities.count()
        if total_days == 0:
            return Response({
                "total_days": 0,
                "average_sleep": 0,
                "mood_color_percentages": {},
                "average_hydration": 0,
                "average_exercise": 0
            })

        # Calculate average sleep
        total_sleep = sum(activity.hours_of_sleep for activity in activities if activity.hours_of_sleep is not None)
        average_sleep = total_sleep / total_days

        # Calculate mood color percentages
        mood_colors = [activity.mood_color for activity in activities if activity.mood_color]
        mood_color_counts = Counter(mood_colors)
        mood_color_percentages = {color: (count / total_days) * 100 for color, count in mood_color_counts.items()}

        # Calculate average hydration
        total_hydration = sum(activity.hydration_amount for activity in activities if activity.hydration_amount is not None)
        average_hydration = total_hydration / total_days

        # Calculate average exercise duration
        total_exercise = sum(activity.exercise_duration for activity in activities if activity.exercise_duration is not None)
        average_exercise = total_exercise / total_days

        return Response({
            "total_days": total_days,
            "average_sleep": average_sleep,
            "mood_color_percentages": mood_color_percentages,
            "average_hydration": average_hydration,
            "average_exercise": average_exercise
        })
class MonthlyInsightsView(APIView):
    def get(self, request, month, year):
        api_url = "http://3.147.75.57:8000/api"
        insights = MonthlyInsights(api_url)
        data = insights.fetch_data(month=int(month), year=int(year))
        result = insights.generate_insights(data)
        return Response(result)

class AggregatedDataView(APIView):
    def get(self, request, *args, **kwargs):
        # Fetch data from the Days model
        days_queryset = Days.objects.all()

        # Perform the analysis using the analyze_sleep_data function
        analysis = analyze_sleep_data(days_queryset)

        # Return the result as a JSON response
        return JsonResponse(analysis)

        
class DaysItemView(generics.ListCreateAPIView):
    queryset = Days.objects.all()
    serializer_class = DaysSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        date = self.request.query_params.get('date')
        if date:
            queryset = queryset.filter(date=date)
        return queryset

class DayDeleteView(generics.DestroyAPIView):
    queryset = Days.objects.all()
    serializer_class = DaysSerializer
    lookup_field = 'id'  # You can use the primary key or another field to identify the object

    def delete(self, request, *args, **kwargs):
        """
        Handle DELETE request to remove a journal entry.
        """
        return super().delete(request, *args, **kwargs)
        

def mood_colors(request):
    # Create a list of mood colors in the format that frontend expects
    choices = [{"value": color[0], "label": color[1]} for color in MoodColors.choices]
    return JsonResponse({"mood_colors": choices})

