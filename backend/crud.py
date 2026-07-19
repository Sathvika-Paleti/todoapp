from sqlalchemy.orm import Session
from models import User, Task
from auth import hash_password, verify_password


# ---------------- USER ----------------

def create_user(db: Session, name: str, email: str, password: str):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        return None

    new_user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    return user


# ---------------- TASK ----------------

def create_task(db: Session, title: str, description: str,
                due_date, priority: str, user_id: int):

    task = Task(
        title=title,
        description=description,
        due_date=due_date,
        priority=priority,
        user_id=user_id
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


def get_tasks(db: Session, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id).all()


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def update_task(db: Session, task_id: int,
                title=None,
                description=None,
                completed=None,
                due_date=None,
                priority=None):

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return None

    if title is not None:
        task.title = title

    if description is not None:
        task.description = description

    if completed is not None:
        task.completed = completed

    if due_date is not None:
        task.due_date = due_date

    if priority is not None:
        task.priority = priority

    db.commit()
    db.refresh(task)

    return task


def delete_task(db: Session, task_id: int):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        return False

    db.delete(task)
    db.commit()

    return True