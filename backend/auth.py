from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

load_dotenv()

APP_ENV = os.getenv("APP_ENV", "development").strip().lower()
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY or len(SECRET_KEY) < 32:
    if APP_ENV != "production":
        SECRET_KEY = "dev-only-change-this-secret-key-at-least-32"
    else:
        raise RuntimeError("SECRET_KEY deve ter pelo menos 32 caracteres")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def hash_senha(senha: str) -> str:
    return pwd_context.hash(senha)

def verificar_senha(senha: str, hash: str) -> bool:
    return pwd_context.verify(senha, hash)

def criar_token(data: dict) -> str:
    dados = data.copy()
    expiracao = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados.update({"exp": expiracao})
    return jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")