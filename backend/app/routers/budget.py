from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.jwt_handler import get_current_user
from app.database.database import get_db
from app.schemas.budget import (
    BudgetCreate,
    BudgetResponse,
)
from app.services.budget_service import (
    create_budget,
    get_budgets,
    update_budget,
    delete_budget,
)

router = APIRouter(
    prefix="/api/budgets",
    tags=["Budgets"],
)


@router.post("", response_model=BudgetResponse)
def add_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_budget(
        db,
        budget,
        current_user.id,
    )


@router.get("", response_model=List[BudgetResponse])
def list_budgets(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_budgets(
        db,
        current_user.id,
    )


@router.put("/{budget_id}", response_model=BudgetResponse)
def edit_budget(
    budget_id: int,
    budget: BudgetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return update_budget(
        db,
        budget_id,
        budget,
        current_user.id,
    )


@router.delete("/{budget_id}")
def remove_budget(
    budget_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    deleted = delete_budget(
        db,
        budget_id,
        current_user.id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Budget not found",
        )

    return deleted
