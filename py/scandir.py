import sys
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class Event(FileSystemEventHandler):
    def on_created(self, event):
        print("on_created", event.src_path)
        f = open(event.src_path, "r")
        if f.mode == "r":
            contents = f.read()
            print(contents)

    def on_deleted(self, event):
        print("on_deleted", event.src_path)

if __name__=="__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else './../gcode/'
    event_handler = Event()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()