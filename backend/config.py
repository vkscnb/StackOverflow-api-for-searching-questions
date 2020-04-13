import redis

queue=redis.Redis(host='127.0.0.1',port='6379')

def main():
    pass

if __name__ == "__main__":
   try:
       main()
   except KeyboardInterrupt:
       print(">>>>>>>>>>>>>>")
       queue.DEL('stack')