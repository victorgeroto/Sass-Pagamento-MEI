from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models.user import User
from schemas.user import UserCreate, UserResponse
from auth import verificar_token

router = APIRouter(prefix="/usuarios", tags=["Usuários"])


@router.post("/", response_model=UserResponse)
def criar_usuario(usuario: UserCreate, session: Session = Depends(get_session)):
    db_usuario = User(
        nome=usuario.nome,
        email=usuario.email,
        senha=usuario.senha
    )
    session.add(db_usuario)
    session.commit()
    session.refresh(db_usuario)
    return db_usuario


@router.get("/", response_model=list[UserResponse])
def listar_usuarios(
    session: Session = Depends(get_session),
    _: str = Depends(verificar_token)
):
    usuarios = session.exec(select(User)).all()
    return usuarios


@router.get("/{usuario_id}", response_model=UserResponse)
def buscar_usuario(usuario_id: int, session: Session = Depends(get_session)):
    usuario = session.get(User, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario

@router.put("/{usuario_id}", response_model=UserResponse)
def atualizar_usuario(usuario_id: int, usuario: UserCreate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    db_usuario = session.get(User, usuario_id)
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db_usuario.nome = usuario.nome
    db_usuario.email = usuario.email
    session.commit()
    session.refresh(db_usuario)
    return db_usuario

@router.delete("/{usuario_id}")
def deletar_usuario(usuario_id: int, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    db_usuario = session.get(User, usuario_id)
    if not db_usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    session.delete(db_usuario)
    session.commit()
    return {"mensagem": "Usuário deletado com sucesso"}