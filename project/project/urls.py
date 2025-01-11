from django.contrib import admin
from django.urls import path
from app.views import DaysItemView, mood_colors, DayDeleteView, AggregatedDataView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/days/', DaysItemView.as_view(), name="days"),
    path('api/mood_colors/', mood_colors, name="mood_colors"),
    path('api/aggregated-data/', AggregatedDataView.as_view(), name='aggregated-data'),
    path('api/journal/<int:id>/', DayDeleteView.as_view(), name='delete-journal-entry')
]
