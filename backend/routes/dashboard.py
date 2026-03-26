from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models.subscription import Subscription
from models.user import User
from auth import verificar_token
from datetime import datetime

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/resumo")
def resumo(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()

    # Assinatura ativa
    assinatura = session.exec(
        select(Subscription).where(
            Subscription.usuario_id == usuario.id,
            Subscription.status == "ativo"
        )
    ).first()

    # Dados simulados mas vinculados ao usuário real
    hoje = datetime.now()
    dias_para_das = 20 - hoje.day if hoje.day <= 20 else (31 - hoje.day + 20)

    return {
        "usuario": {
            "id": usuario.id,
            "nome": usuario.nome,
            "email": usuario.email,
        },
        "resumo": {
            "receita_mes": 4280.00,
            "alunos_ativos": 38,
            "faturamento_anual": 18540.00,
            "limite_mei": 81000.00,
            "percentual_mei": round((18540.00 / 81000.00) * 100, 1),
        },
        "das": {
            "dias_para_vencer": dias_para_das,
            "data_vencimento": f"20/{hoje.month:02d}/{hoje.year}",
            "valor": 71.60,
            "status": "pendente" if hoje.day < 20 else "vencido",
        },
        "plataformas": [
            {"nome": "Hotmart", "valor": 2400, "cor": "#0a1628"},
            {"nome": "YouTube", "valor": 780, "cor": "#00d4aa"},
            {"nome": "Mentorias", "valor": 1300, "cor": "#3b82f6"},
            {"nome": "Kiwify", "valor": 97, "cor": "#8b5cf6"},
        ],
        "receitas_mensais": [
            {"mes": "Out", "valor": 2400},
            {"mes": "Nov", "valor": 3300},
            {"mes": "Dez", "valor": 2900},
            {"mes": "Jan", "valor": 4000},
            {"mes": "Fev", "valor": 3650},
            {"mes": "Mar", "valor": 4280},
        ],
        "transacoes": [
            {"descricao": "Venda curso Python", "plataforma": "Hotmart", "valor": 297, "tipo": "entrada", "data": "Hoje, 14:32"},
            {"descricao": "Sessão individual - Ana", "plataforma": "Mentoria", "valor": 350, "tipo": "entrada", "data": "Hoje, 10:15"},
            {"descricao": "AdSense Fevereiro", "plataforma": "YouTube", "valor": 180, "tipo": "entrada", "data": "Ontem, 09:00"},
            {"descricao": "Contribuição DAS", "plataforma": "MEI", "valor": 71.60, "tipo": "saida", "data": "10/03/2026"},
            {"descricao": "Venda ebook", "plataforma": "Kiwify", "valor": 97, "tipo": "entrada", "data": "09/03/2026"},
        ],
        "assinatura": {
            "plano": assinatura.plano_id if assinatura else None,
            "status": assinatura.status if assinatura else "free",
        }
    }