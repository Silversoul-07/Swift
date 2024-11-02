from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from .route import router, crud
import json
from .utils import get_db
import os
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = next(get_db())
    courses_data = json.load(open("app/courses.json"))
    for course in courses_data:
        kwargs = {  
            "semester": course["semester"],
            "semester_type": course["semester_type"],
            "course_code": course["course_code"],
            "course_name": course["course_name"],
            "course_type": course["course_type"],
            "class_no": course["class_no"],
            "class_venue": course["class_venue"],
            "class_slots": course["class_slots"],
            "faculty_name": course["faculty_name"],
            "faculty_school": course["faculty_school"]
        }
        crud.create_course(db, **kwargs)
    json.dump([], open("app/courses.json", "w"))

    yield


app = FastAPI(lifespan=lifespan)
app.include_router(router)
cors = CORSMiddleware(app, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])



@app.get("/")
def read_root():
    # redirect to the docs
    return RedirectResponse(url="/docs")