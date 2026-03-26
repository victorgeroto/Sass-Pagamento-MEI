from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from database import get_session
from models.user import User
from auth import verificar_token
from datetime import datetime

router = APIRouter(prefix="/financeiro", tags=["Financeiro"])

# Dados simulados por enquanto
transacoes_mock = [
    {"id": 1, "descricao": "Venda curso Python", "plataforma": "Hotmart", "valor": 297.00, "tipo": "entrada", "categoria": "Infoproduto", "data": "12/03/2026"},
    {"id": 2, "descricao": "Sessão individual - Ana", "plataforma": "Mentoria", "valor": 350.00, "tipo": "entrada", "categoria": "Mentoria", "data": "12/03/2026"},
    {"id": 3, "descricao": "AdSense Fevereiro", "plataforma": "YouTube", "valor": 180.00, "tipo": "entrada", "categoria": "Publicidade", "data": "11/03/2026"},
    {"id": 4, "descricao": "Contribuição DAS", "plataforma": "MEI", "valor": 71.60, "tipo": "saida", "categoria": "Imposto", "data": "10/03/2026"},
    {"id": 5, "descricao": "Venda ebook", "plataforma": "Kiwify", "valor": 97.00, "tipo": "entrada", "categoria": "Infoproduto", "data": "09/03/2026"},
    {"id": 6, "descricao": "Venda curso React", "plataforma": "Hotmart", "valor": 397.00, "tipo": "entrada", "categoria": "Infoproduto", "data": "08/03/2026"},
    {"id": 7, "descricao": "Sessão grupo - turma B", "plataforma": "Mentoria", "valor": 600.00, "tipo": "entrada", "categoria": "Mentoria", "data": "07/03/2026"},
    {"id": 8, "descricao": "Ferramenta de edição", "plataforma": "Adobe", "valor": 89.90, "tipo": "saida", "categoria": "Ferramenta", "data": "05/03/2026"},
    {"id": 9, "descricao": "Venda curso FastAPI", "plataforma": "Kiwify", "valor": 197.00, "tipo": "entrada", "categoria": "Infoproduto", "data": "03/03/2026"},
    {"id": 10, "descricao": "Hospedagem servidor", "plataforma": "AWS", "valor": 45.00, "tipo": "saida", "categoria": "Infraestrutura", "data": "01/03/2026"},
]

@router.get("/resumo")
def resumo_financeiro(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    total_entradas = sum(t["valor"] for t in transacoes_mock if t["tipo"] == "entrada")
    total_saidas = sum(t["valor"] for t in transacoes_mock if t["tipo"] == "saida")
    saldo = total_entradas - total_saidas

    por_categoria = {}
    for t in transacoes_mock:
        if t["tipo"] == "entrada":
            por_categoria[t["categoria"]] = por_categoria.get(t["categoria"], 0) + t["valor"]

    return {
    "usuario": {"nome": usuario.nome, "email": usuario.email},  # ← adiciona essa linha
    "resumo": {
        "total_entradas": total_entradas,
        "total_saidas": total_saidas,
        "saldo": saldo,
        "total_transacoes": len(transacoes_mock),
    },
    "por_categoria": [
        {"categoria": k, "valor": v} for k, v in por_categoria.items()
    ],
    "transacoes": transacoes_mock,
}