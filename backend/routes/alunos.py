from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models.aluno import Aluno
from models.user import User
from auth import verificar_token
from pydantic import BaseModel
from typing import Optional
from datetime import date

router = APIRouter(prefix="/alunos", tags=["Alunos"])

class AlunoCreate(BaseModel):
    nome: str
    email: str
    telefone: Optional[str] = None
    status: str = "ativo"
    data_inicio: date
    data_termino: Optional[date] = None

class AlunoUpdate(BaseModel):
    nome: Optional[str] = None
    email: Optional[str] = None
    telefone: Optional[str] = None
    status: Optional[str] = None
    data_inicio: Optional[date] = None
    data_termino: Optional[date] = None

@router.get("/")
def listar_alunos(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    alunos = session.exec(select(Aluno).where(Aluno.usuario_id == usuario.id)).all()
    total = len(alunos)
    ativos = len([a for a in alunos if a.status == "ativo"])
    inativos = len([a for a in alunos if a.status == "inativo"])
    pausados = len([a for a in alunos if a.status == "pausado"])
    return {
        "usuario": {"nome": usuario.nome, "email": usuario.email},
        "resumo": {"total": total, "ativos": ativos, "inativos": inativos, "pausados": pausados},
        "alunos": [
            {
                "id": a.id,
                "nome": a.nome,
                "email": a.email,
                "telefone": a.telefone,
                "status": a.status,
                "data_inicio": str(a.data_inicio),
                "data_termino": str(a.data_termino) if a.data_termino else None,
            }
            for a in alunos
        ]
    }

@router.post("/")
def criar_aluno(aluno: AlunoCreate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    novo = Aluno(usuario_id=usuario.id, **aluno.dict())
    session.add(novo)
    session.commit()
    session.refresh(novo)
    return novo

@router.put("/{aluno_id}")
def atualizar_aluno(aluno_id: int, dados: AlunoUpdate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    aluno = session.get(Aluno, aluno_id)
    if not aluno or aluno.usuario_id != usuario.id:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    for campo, valor in dados.dict(exclude_unset=True).items():
        setattr(aluno, campo, valor)
    session.commit()
    session.refresh(aluno)
    return aluno

@router.delete("/{aluno_id}")
def deletar_aluno(aluno_id: int, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    aluno = session.get(Aluno, aluno_id)
    if not aluno or aluno.usuario_id != usuario.id:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    session.delete(aluno)
    session.commit()
    return {"mensagem": "Aluno removido"}