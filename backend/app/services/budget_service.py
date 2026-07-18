from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.budget import Budget
from app.schemas.budget import BudgetCreate


def create_budget(
    db: Session,
    budget: BudgetCreate,
    user_id: int,
):
    new_budget = Budget(
        category=budget.category,
        monthly_limit=budget.monthly_limit,
        month=budget.month,
        year=budget.year,
        user_id=user_id,
    )

    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)

    return new_budget


def get_budgets(
    db: Session,
    user_id: int,
):
    return (
        db.query(Budget)
        .filter(Budget.user_id == user_id)
        .order_by(Budget.year.desc(), Budget.month.desc(), Budget.category)
        .all()
    )


def get_budget_by_id(
    db: Session,
    budget_id: int,
    user_id: int,
):
    return (
        db.query(Budget)
        .filter(
            Budget.id == budget_id,
            Budget.user_id == user_id,
        )
        .first()
    )


def update_budget(
    db: Session,
    budget_id: int,
    budget: BudgetCreate,
    user_id: int,
):
    existing_budget = get_budget_by_id(
        db,
        budget_id,
        user_id,
    )

    if not existing_budget:
        raise HTTPException(
            status_code=404,
            detail="Budget not found",
        )

    existing_budget.category = budget.category
    existing_budget.monthly_limit = budget.monthly_limit
    existing_budget.month = budget.month
    existing_budget.year = budget.year

    db.commit()
    db.refresh(existing_budget)

    return existing_budget


def delete_budget(
    db: Session,
    budget_id: int,
    user_id: int,
):
    budget = (
        db.query(Budget)
        .filter(
            Budget.id == budget_id,
            Budget.user_id == user_id,
        )
        .first()
    )

    if not budget:
        return None

    db.delete(budget)
    db.commit()

    return {
        "message": "Budget deleted successfully"
    }
