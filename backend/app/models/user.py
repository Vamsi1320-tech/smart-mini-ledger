from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, index=True)

    password = Column(String(255), nullable=False)

    # One user can have many transactions
    transactions = relationship(
        "Transaction",
        back_populates="user",
        cascade="all, delete-orphan",
    )

    # One user can have many budgets
    budgets = relationship(
        "Budget",
        back_populates="user",
        cascade="all, delete-orphan",
    )
