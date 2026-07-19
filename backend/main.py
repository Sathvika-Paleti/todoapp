from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
import crud
from auth import create_access_token
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo App API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Todo API Running Successfully"}


# ---------------- REGISTER ----------------

@app.post("/auth/register")
def register(user: schemas.UserRegister, db: Session = Depends(get_db)):
    new_user = crud.create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    if not new_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {"message": "User registered successfully"}


# ---------------- LOGIN ----------------

@app.post("/auth/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(
        db,
        user.email,
        user.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {"sub": str(db_user.id)}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@app.post("/tasks")
def add_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    new_task = crud.create_task(
        db,
        task.title,
        task.description,
        1
    )
    return new_task

@app.get("/tasks")
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db, 1)


@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated = crud.update_task(
        db,
        task_id,
        task.title,
        task.description,
        task.completed
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_task(db, task_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}