from django.contrib import admin
from django.urls import path
from app.views import PastThirtyDaysInsights, MonthlyInsightsView, DaysItemView, mood_colors, DayDeleteView, AggregatedDataView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/days/', DaysItemView.as_view(), name="days"),
    path('api/mood-colors/', mood_colors, name='mood-colors'),
    path('api/past-thirty-days/', PastThirtyDaysInsights.as_view(), name='past-thirty-days'),
    path('api/aggregated-data/', AggregatedDataView.as_view(), name='aggregated-data'),
    path('api/monthly-insights/<int:month>/<int:year>/', MonthlyInsightsView.as_view(), name='monthly_insights'),
    path('api/journal/<int:id>/', DayDeleteView.as_view(), name='delete-journal-entry')
]
