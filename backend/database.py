from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv
import os

load_dotenv()


def parse_bool(value: str, default: bool = False) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL não configurada no ambiente")

app_env = os.getenv("APP_ENV", "development").strip().lower()
default_echo = app_env != "production"
sql_echo = parse_bool(os.getenv("SQL_ECHO"), default=default_echo)

engine = create_engine(DATABASE_URL, echo=sql_echo)

def get_session():
    with Session(engine) as session:
        yield session

def create_db():
    SQLModel.metadata.create_all(engine)