from fastapi import APIRouter, Depends, HTTPException, Request
from sqlmodel import Session, select
from database import get_session
from models.subscription import Subscription
from models.plan import Plan
from models.user import User
from auth import verificar_token
import stripe
import os
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

router = APIRouter(prefix="/pagamentos", tags=["Pagamentos"])

@router.post("/criar-sessao/{plano_id}")
def criar_sessao_pagamento(plano_id: int, session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    # busca o plano
    plano = session.get(Plan, plano_id)
    if not plano:
        raise HTTPException(status_code=404, detail="Plano não encontrado")

    # busca o usuário
    usuario = session.exec(select(User).where(User.email == email)).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    # cria a sessão de pagamento no Stripe
    checkout_session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "brl",
                "product_data": {
                    "name": plano.nome,
                    "description": plano.descricao,
                },
                "unit_amount": int(plano.preco * 100),  # Stripe usa centavos
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url="http://localhost:3000/sucesso?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost:3000/cancelado",
        metadata={
            "usuario_id": usuario.id,
            "plano_id": plano.id
        }
    )

    return {"url": checkout_session.url}

@router.post("/webhook")
async def webhook(request: Request, session: Session = Depends(get_session)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, webhook_secret)
    except ValueError:
        raise HTTPException(status_code=400, detail="Payload inválido")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Assinatura inválida")

    if event["type"] == "checkout.session.completed":
        data = event["data"]["object"]
        usuario_id = int(data["metadata"]["usuario_id"])
        plano_id = int(data["metadata"]["plano_id"])

        assinatura = session.exec(
            select(Subscription).where(Subscription.usuario_id == usuario_id)
        ).first()

        if assinatura:
            assinatura.plano_id = plano_id
            assinatura.status = "ativo"
        else:
            assinatura = Subscription(
                usuario_id=usuario_id,
                plano_id=plano_id,
                status="ativo"
            )
            session.add(assinatura)

        session.commit()

    return {"status": "ok"}