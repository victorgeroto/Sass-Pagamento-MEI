from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models.user import User
from auth import verificar_token
from datetime import datetime

router = APIRouter(prefix="/mei", tags=["MEI"])

@router.get("/resumo")
def resumo_mei(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    hoje = datetime.now()
    ano_atual = hoje.year

    das_historico = [
        {"mes": "Janeiro",   "valor": 71.60, "status": "pago",    "vencimento": f"20/01/{ano_atual}", "pago_em": f"18/01/{ano_atual}"},
        {"mes": "Fevereiro", "valor": 71.60, "status": "pago",    "vencimento": f"20/02/{ano_atual}", "pago_em": f"19/02/{ano_atual}"},
        {"mes": "Março",     "valor": 71.60, "status": "pendente","vencimento": f"20/03/{ano_atual}", "pago_em": None},
        {"mes": "Abril",     "valor": 71.60, "status": "futuro",  "vencimento": f"20/04/{ano_atual}", "pago_em": None},
        {"mes": "Maio",      "valor": 71.60, "status": "futuro",  "vencimento": f"20/05/{ano_atual}", "pago_em": None},
        {"mes": "Junho",     "valor": 71.60, "status": "futuro",  "vencimento": f"20/06/{ano_atual}", "pago_em": None},
        {"mes": "Julho",     "valor": 71.60, "status": "futuro",  "vencimento": f"20/07/{ano_atual}", "pago_em": None},
        {"mes": "Agosto",    "valor": 71.60, "status": "futuro",  "vencimento": f"20/08/{ano_atual}", "pago_em": None},
        {"mes": "Setembro",  "valor": 71.60, "status": "futuro",  "vencimento": f"20/09/{ano_atual}", "pago_em": None},
        {"mes": "Outubro",   "valor": 71.60, "status": "futuro",  "vencimento": f"20/10/{ano_atual}", "pago_em": None},
        {"mes": "Novembro",  "valor": 71.60, "status": "futuro",  "vencimento": f"20/11/{ano_atual}", "pago_em": None},
        {"mes": "Dezembro",  "valor": 71.60, "status": "futuro",  "vencimento": f"20/12/{ano_atual}", "pago_em": None},
    ]

    faturamento_mensal = [
        {"mes": "Jan", "valor": 2400},
        {"mes": "Fev", "valor": 3300},
        {"mes": "Mar", "valor": 4280},
    ]
    faturamento_anual = sum(f["valor"] for f in faturamento_mensal)
    limite_mei = 81000.00
    percentual = round((faturamento_anual / limite_mei) * 100, 1)

    dias_para_das = 20 - hoje.day if hoje.day <= 20 else (31 - hoje.day + 20)

    return {
        "usuario": {"nome": usuario.nome, "email": usuario.email},
        "faturamento": {
            "anual": faturamento_anual,
            "limite": limite_mei,
            "percentual": percentual,
            "mensal": faturamento_mensal,
            "restante": limite_mei - faturamento_anual,
        },
        "das": {
            "valor_mensal": 71.60,
            "dias_para_vencer": dias_para_das,
            "data_vencimento": f"20/{hoje.month:02d}/{ano_atual}",
            "total_pago_ano": sum(d["valor"] for d in das_historico if d["status"] == "pago"),
            "historico": das_historico,
        },
        "dasn": {
            "ano_referencia": ano_atual - 1,
            "prazo": f"31/05/{ano_atual}",
            "status": "pendente",
            "dias_restantes": (datetime(ano_atual, 5, 31) - hoje).days,
        },
        "alertas": [
            {
                "tipo": "das",
                "urgencia": "media" if dias_para_das > 5 else "alta",
                "titulo": f"DAS vence em {dias_para_das} dias",
                "descricao": f"Boleto de R$ 71,60 com vencimento em 20/{hoje.month:02d}/{ano_atual}",
            },
            {
                "tipo": "dasn",
                "urgencia": "media",
                "titulo": "Declaração Anual (DASN-SIMEI)",
                "descricao": f"Entregue até 31/05/{ano_atual} para o ano {ano_atual - 1}. {(datetime(ano_atual, 5, 31) - hoje).days} dias restantes.",
            },
            {
                "tipo": "faturamento",
                "urgencia": "baixa",
                "titulo": f"{percentual}% do limite MEI utilizado",
                "descricao": f"Você faturou R$ {faturamento_anual:,.2f} de R$ {limite_mei:,.2f} permitidos.",
            },
        ]
    }