from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from database import get_session
from models.user import User
from schemas.user import UserCreate, UserResponse
from auth import hash_senha, verificar_senha, criar_token

router = APIRouter(prefix="/auth", tags=["Autenticação"])

@router.post("/registro", response_model=UserResponse)
def registro(usuario: UserCreate, session: Session = Depends(get_session)):
    # verifica se email já existe
    db_usuario = session.exec(select(User).where(User.email == usuario.email.strip())).first()
    if db_usuario:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    
    # criptografa a senha antes de salvar
    novo_usuario = User(
    nome=usuario.nome,
    email=usuario.email.strip(),
    senha=hash_senha(usuario.senha)
)
    session.add(novo_usuario)
    session.commit()
    session.refresh(novo_usuario)
    return novo_usuario

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    # busca o usuário pelo email
    db_usuario = session.exec(select(User).where(User.email == form_data.username.strip())).first()
    if not db_usuario:
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")
    
    # verifica a senha
    if not verificar_senha(form_data.password, db_usuario.senha):
        raise HTTPException(status_code=401, detail="Email ou senha inválidos")
    
    # gera o token
    token = criar_token({"sub": db_usuario.email})
    return {"access_token": token, "token_type": "bearer"}