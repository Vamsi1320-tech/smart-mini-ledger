from pydantic import BaseModel, Field


class BudgetBase(BaseModel):
    category: str = Field(..., max_length=100)
    monthly_limit: float = Field(..., gt=0)
    month: int = Field(..., ge=1, le=12)
    year: int = Field(..., ge=2024)


class BudgetCreate(BudgetBase):
    pass


class BudgetUpdate(BudgetBase):
    pass


class BudgetResponse(BudgetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
