from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/")
def create_task(task: schemas.TaskCreate,
                owner_id: int,
                db: Session = Depends(get_db)):
    return crud.create_task(db, task, owner_id)


@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)


@router.get("/{task_id}")
def get_task(task_id: int,
             db: Session = Depends(get_db)):
    return crud.get_task(db, task_id)


@router.put("/{task_id}")
def update_task(task_id: int,
                task: schemas.TaskUpdate,
                db: Session = Depends(get_db)):
    return crud.update_task(db, task_id, task)


@router.delete("/{task_id}")
def delete_task(task_id: int,
                db: Session = Depends(get_db)):
    return crud.delete_task(db, task_id)