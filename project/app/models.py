from django.db import models
from django.utils.translation import gettext_lazy as _

class MoodColors(models.TextChoices):
    HAPPY = "#FFFF00", _("Happy")        # Yellow
    SAD = "#0000FF", _("Sad")            # Blue
    ANGRY = "#FF0000", _("Angry")        # Red
    RELAXED = "#00FF00", _("Relaxed")    # Green
    NEUTRAL = "#808080", _("Neutral")    # Gray

class Days(models.Model):
    entry_date = models.DateField(unique=True)  # Ensures each date is unique
    entry_title = models.TextField(blank=True, null=True)  # Journal title
    entry_content = models.TextField(blank=True, null=True)  # Main journal content
    mood_color = models.CharField(
        max_length=7,  # HEX color code length
        choices=MoodColors.choices,
        default=MoodColors.NEUTRAL,
    )
    proper_nutrition = models.BooleanField(default=False)  # Boolean for nutrition tracking
    proper_hydration = models.BooleanField(default=False)  # Boolean for hydration tracking
    hydration_amount = models.FloatField(null=True, blank=True)  # For tracking water intake in liters/cups
    proper_exercise = models.BooleanField(default=False)  # Boolean for exercise tracking
    exercise_duration = models.FloatField(null=True, blank=True)  # Duration of exercise in hours
    exercise_description = models.TextField(null=True, blank=True)  # Optional description of the exercise
    hours_of_sleep = models.FloatField(null=True, blank=True)  # Float for hours of sleep

    def __str__(self):
        return f"Entry for {self.date}"

