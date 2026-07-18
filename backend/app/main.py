from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

# Import models
from app.models.user import User
from app.models import user, transaction, budget

# Import routers
from app.routers.auth import router as auth_router
from app.routers.transaction import router as transaction_router
from app.routers.dashboard import router as dashboard_router
from app.routers.budget import router as budget_router

# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Mini Ledger API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://smart-mini-ledger-beta.vercel.app",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(transaction_router)
app.include_router(dashboard_router)
app.include_router(budget_router)


@app.get("/")
def home():
    return {
        "message": "Smart Mini Ledger API is running 🚀"
    }


@app.middleware("http")
async def log_auth_header(request: Request, call_next):
    print("\nREQUEST:", request.method, request.url.path)
    print("Authorization Header:", request.headers.get("Authorization"))
    response = await call_next(request)
    return response
