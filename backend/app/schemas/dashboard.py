from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_income: float
    total_expense: float
    balance: float


class CategorySummary(BaseModel):
    category: str
    total: float


class MonthlySummary(BaseModel):
    month: str
    income: float
    expense: float
