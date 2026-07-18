from datetime import datetime

from pydantic import BaseModel


class TransactionBase(BaseModel):
    title: str
    amount: float
    transaction_type: str
    category: str
    created_at: datetime


class TransactionCreate(TransactionBase):
    pass


class TransactionUpdate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
