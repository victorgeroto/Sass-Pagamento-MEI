from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models.plan import Plan
from schemas.plan import PlanCreate, PlanResponse
from auth import verificar_token

router = APIRouter(prefix="/planos", tags=["Planos"])

@router.post("/", response_model=PlanResponse)
def criar_plano(plano: PlanCreate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    novo_plano = Plan(
        nome=plano.nome,
        preco=plano.preco,
        descricao=plano.descricao
    )
    session.add(novo_plano)
    session.commit()
    session.refresh(novo_plano)
    return novo_plano

@router.get("/", response_model=list[PlanResponse])
def listar_planos(session: Session = Depends(get_session)):
    planos = session.exec(select(Plan)).all()
    return planos

@router.get("/{plano_id}", response_model=PlanResponse)
def buscar_plano(plano_id: int, session: Session = Depends(get_session)):
    plano = session.get(Plan, plano_id)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")
    return plano

@router.put("/{plano_id}", response_model=PlanResponse)
def atualizar_plano(plano_id: int, plano: PlanCreate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    db_plano = session.get(Plan, plano_id)
    if not db_plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")
    db_plano.nome = plano.nome
    db_plano.preco = plano.preco
    db_plano.descricao = plano.descricao
    session.commit()
    session.refresh(db_plano)
    return db_plano

@router.delete("/{plano_id}")
def deletar_plano(plano_id: int, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    db_plano = session.get(Plan, plano_id)
    if not db_plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")
    session.delete(db_plano)
    session.commit()
    return {"mensagem": "Plano deletado com sucesso"}