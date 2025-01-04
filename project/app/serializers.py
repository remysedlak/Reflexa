from rest_framework import serializers
from django.contrib.auth.models import User

from . models import *

class DaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = Days
        fields =  fields =  ['id','entry_date', 'entry_title', 'entry_content', 'mood_color', 'proper_nutrition', 'proper_hydration',
            'hydration_amount', 'proper_exercise', 'exercise_duration', 'exercise_description',
            'hours_of_sleep']

class MoodColorsSerializer(serializers.Serializer):
    value = serializers.CharField()
    label = serializers.CharField()

    def to_representation(self, instance):
        return {
            "value": instance[0],  # HEX color code
            "label": instance[1],  # Mood name (e.g., Happy, Sad)
        }
