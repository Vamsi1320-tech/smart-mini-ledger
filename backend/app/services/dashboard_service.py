from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.transaction import Transaction


def get_dashboard_summary(
    db: Session,
    user_id: int,
):
    total_income = (
        db.query(func.sum(Transaction.amount))
        .filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == "income",
        )
        .scalar()
    ) or 0

    total_expense = (
        db.query(func.sum(Transaction.amount))
        .filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == "expense",
        )
        .scalar()
    ) or 0

    return {
        "total_income": float(total_income),
        "total_expense": float(total_expense),
        "balance": float(total_income - total_expense),
    }


def get_category_summary(
    db: Session,
    user_id: int,
):
    """
    Returns total expenses grouped by category.
    Used for the Expense Pie Chart.
    """

    results = (
        db.query(
            Transaction.category,
            func.sum(Transaction.amount).label("total"),
        )
        .filter(
            Transaction.user_id == user_id,
            Transaction.transaction_type == "expense",
        )
        .group_by(Transaction.category)
        .order_by(func.sum(Transaction.amount).desc())
        .all()
    )

    return [
        {
            "category": row.category,
            "total": float(row.total),
        }
        for row in results
    ]


def get_monthly_summary(
    db: Session,
    user_id: int,
):
    """
    Returns monthly income and expense totals.
    Used for the Bar Chart.
    """

    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.created_at)
        .all()
    )

    monthly = {}

    for transaction in transactions:

        month = transaction.created_at.strftime("%b %Y")

        if month not in monthly:
            monthly[month] = {
                "month": month,
                "income": 0,
                "expense": 0,
            }

        if transaction.transaction_type == "income":
            monthly[month]["income"] += float(transaction.amount)
        else:
            monthly[month]["expense"] += float(transaction.amount)

    return list(monthly.values())
