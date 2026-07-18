from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)

    category = Column(String(100), nullable=False)

    monthly_limit = Column(Float, nullable=False)

    month = Column(Integer, nullable=False)

    year = Column(Integer, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="budgets",
    )
