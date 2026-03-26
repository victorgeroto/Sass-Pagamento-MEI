from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models.subscription import Subscription
from models.user import User
from models.plan import Plan
from schemas.subscription import SubscriptionCreate, SubscriptionResponse
from auth import verificar_token

router = APIRouter(prefix="/assinaturas", tags=["Assinaturas"])

@router.post("/", response_model=SubscriptionResponse)
def criar_assinatura(assinatura: SubscriptionCreate, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    # busca o usuário pelo email do token
    usuario = session.exec(select(User).where(User.email == email)).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # verifica se o plano existe
    plano = session.get(Plan, assinatura.plano_id)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")

    # verifica se já tem assinatura ativa
    assinatura_existente = session.exec(
        select(Subscription).where(
            Subscription.usuario_id == usuario.id,
            Subscription.status == "ativo"
        )
    ).first()
    if assinatura_existente:
        raise HTTPException(status_code=400, detail="Usuário já possui assinatura ativa")

    nova_assinatura = Subscription(
        usuario_id=usuario.id,
        plano_id=assinatura.plano_id
    )
    session.add(nova_assinatura)
    session.commit()
    session.refresh(nova_assinatura)
    return nova_assinatura

@router.get("/", response_model=list[SubscriptionResponse])
def listar_assinaturas(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    assinaturas = session.exec(
        select(Subscription).where(Subscription.usuario_id == usuario.id)
    ).all()
    return assinaturas

@router.delete("/{assinatura_id}")
def cancelar_assinatura(assinatura_id: int, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    assinatura = session.get(Subscription, assinatura_id)
    if not assinatura:
        raise HTTPException(status_code=404, detail="Assinatura não encontrada")
    assinatura.status = "cancelado"
    session.commit()
    return {"mensagem": "Assinatura cancelada com sucesso"}