from rest_framework import generics, viewsets
from rest_framework.response import Response

from .models import Days, MoodColors
from .serializers import DaysSerializer, MoodColorsSerializer
from django.http import JsonResponse
from rest_framework.views import APIView

class AggregatedDataView(APIView):
    def get(self, request, *args, **kwargs):
        # Get data from the Days model
        days_queryset = Days.objects.all()

        # Perform the analysis
        analysis = analyze_sleep_data(days_queryset)

        # Return the response as JSON
        return JsonResponse(analysis, safe=False)  # Set safe=False for non-dict data

        
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

