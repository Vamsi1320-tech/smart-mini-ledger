from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.jwt_handler import get_current_user
from app.database.database import get_db

from app.schemas.dashboard import (
    DashboardSummary,
    CategorySummary,
    MonthlySummary,
)

from app.services.dashboard_service import (
    get_dashboard_summary,
    get_category_summary,
    get_monthly_summary,
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/summary",
    response_model=DashboardSummary,
)
def summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_dashboard_summary(
        db,
        current_user.id,
    )


@router.get(
    "/category-summary",
    response_model=List[CategorySummary],
)
def category_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_category_summary(
        db,
        current_user.id,
    )


@router.get(
    "/monthly-summary",
    response_model=List[MonthlySummary],
)
def monthly_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_monthly_summary(
        db,
        current_user.id,
    )
