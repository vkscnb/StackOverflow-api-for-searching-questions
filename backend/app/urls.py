from django.conf.urls import url
from . import views

urlpatterns = [
        
        url('cache', views.chache_data),
        url('search-questions/(?P<question>[A-Za-z0-9]+)', views.search_question_stack)
]