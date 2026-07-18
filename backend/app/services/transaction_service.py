from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate


def create_transaction(
    db: Session,
    transaction: TransactionCreate,
    user_id: int,
):
    new_transaction = Transaction(
        title=transaction.title,
        amount=transaction.amount,
        transaction_type=transaction.transaction_type,
        category=transaction.category,
        created_at=transaction.created_at,
        user_id=user_id,
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return new_transaction


def get_transactions(db: Session, user_id: int):
    return (
        db.query(Transaction)
        .filter(Transaction.user_id == user_id)
        .order_by(Transaction.created_at.desc())
        .all()
    )


def get_transaction_by_id(
    db: Session,
    transaction_id: int,
    user_id: int,
):
    return (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id,
            Transaction.user_id == user_id,
        )
        .first()
    )


def update_transaction(
    db: Session,
    transaction_id: int,
    transaction: TransactionCreate,
    user_id: int,
):
    existing_transaction = get_transaction_by_id(
        db,
        transaction_id,
        user_id,
    )

    if not existing_transaction:
        raise HTTPException(
            status_code=404,
            detail="Transaction not found",
        )

    existing_transaction.title = transaction.title
    existing_transaction.amount = transaction.amount
    existing_transaction.transaction_type = transaction.transaction_type
    existing_transaction.category = transaction.category
    existing_transaction.created_at = transaction.created_at

    db.commit()
    db.refresh(existing_transaction)

    return existing_transaction


def delete_transaction(
    db: Session,
    transaction_id: int,
    user_id: int,
):
    transaction = (
        db.query(Transaction)
        .filter(
            Transaction.id == transaction_id,
            Transaction.user_id == user_id,
        )
        .first()
    )

    if not transaction:
        return None

    db.delete(transaction)
    db.commit()

    return {"message": "Transaction deleted successfully"}
