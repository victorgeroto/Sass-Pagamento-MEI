from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.aluno import Aluno
from dotenv import load_dotenv
import os
from database import create_db
from routes.user import router as user_router
from routes.auth import router as auth_router
from routes.plan import router as plan_router
from routes.subscription import router as subscription_router
from routes.payment import router as payment_router
from routes.dashboard import router as dashboard_router
from routes.financeiro import router as financeiro_router
from routes.alunos import router as alunos_router
from routes.mei import router as mei_router
from routes.planos_dashboard import router as planos_dashboard_router

load_dotenv()


def parse_bool(value: str, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


APP_ENV = os.getenv("APP_ENV", "development").strip().lower()
IS_PRODUCTION = APP_ENV == "production"

cors_origins_raw = os.getenv("CORS_ORIGINS", "")
if cors_origins_raw.strip():
    CORS_ORIGINS = [origin.strip() for origin in cors_origins_raw.split(",") if origin.strip()]
else:
    CORS_ORIGINS = ["http://localhost:3000", "http://localhost:3001"]


app = FastAPI(
    title="CreatorFlow API",
    docs_url=None if IS_PRODUCTION else "/docs",
    redoc_url=None if IS_PRODUCTION else "/redoc",
    openapi_url=None if IS_PRODUCTION else "/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db()

app.include_router(user_router)
app.include_router(auth_router)
app.include_router(plan_router)
app.include_router(subscription_router)
app.include_router(payment_router)
app.include_router(dashboard_router)
app.include_router(financeiro_router)
app.include_router(alunos_router)
app.include_router(mei_router)
app.include_router(planos_dashboard_router)


@app.get("/")
def home():
    return {"mensagem": "CreatorFlow API funcionando!"}