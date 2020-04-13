from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from config import queue
import requests 
import json


def chache_data(requests):
    try:
        chache_data = eval(queue.get("stack"))
        if len(chache_data):
            return JsonResponse({"status": True, "data":chache_data[0],"question":chache_data[1]}) 
    except Exception as e:
        return JsonResponse({"status": False}) 

def search_question_stack(request,question):
    if request.method == "GET":
        chache_data=''
        try:
            
            chache_data = queue.get("stack")
            if chache_data:
                chache_data = eval(chache_data)
                if chache_data[1] == question:
                    return JsonResponse({"status": True, "data":chache_data[0]})

            url = 'https://api.stackexchange.com/2.2/search/advanced?title='+question+'&site=stackoverflow'

            r = requests.get(url)
            all_questions = r.json()

            # print(len(all_questions['items']),all_questions)
            a=str([all_questions["items"],question])
            queue.set("stack",a)

            if len(all_questions['items']):
                return JsonResponse({"status": True, "data":all_questions["items"], "question":question})
            else:
                return JsonResponse({"status": False})

        except Exception as e:
            return JsonResponse({"status": False})


