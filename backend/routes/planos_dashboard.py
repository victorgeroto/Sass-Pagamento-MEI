from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from database import get_session
from models.user import User
from models.subscription import Subscription
from auth import verificar_token

router = APIRouter(prefix="/planos-dashboard", tags=["Planos Dashboard"])

@router.get("/")
def listar_planos(session: Session = Depends(get_session), email: str = Depends(verificar_token)):
    usuario = session.exec(select(User).where(User.email == email)).first()
    assinatura = session.exec(
        select(Subscription).where(
            Subscription.usuario_id == usuario.id,
            Subscription.status == "ativo"
        )
    ).first()

    plano_atual = assinatura.plano_id if assinatura else 1

    return {
        "usuario": {"nome": usuario.nome, "email": usuario.email},
        "plano_atual": plano_atual,
        "planos": [
            {
                "id": 1,
                "nome": "Free",
                "preco": 0,
                "descricao": "Para quem está começando",
                "destaque": False,
                "features": [
                    {"texto": "Dashboard básico",              "incluido": True},
                    {"texto": "Até 3 plataformas conectadas",  "incluido": True},
                    {"texto": "Últimas 5 transações",          "incluido": True},
                    {"texto": "Alerta básico do DAS",          "incluido": True},
                    {"texto": "Até 10 alunos",                 "incluido": True},
                    {"texto": "Plataformas ilimitadas",        "incluido": False},
                    {"texto": "Histórico completo",            "incluido": False},
                    {"texto": "Exportação PDF/Excel",          "incluido": False},
                    {"texto": "Nota fiscal automática",        "incluido": False},
                ],
            },
            {
                "id": 2,
                "nome": "Basic",
                "preco": 29.90,
                "descricao": "Para criadores em crescimento",
                "destaque": True,
                "features": [
                    {"texto": "Tudo do Free",                  "incluido": True},
                    {"texto": "Plataformas ilimitadas",        "incluido": True},
                    {"texto": "Histórico completo",            "incluido": True},
                    {"texto": "Exportação PDF/Excel",          "incluido": True},
                    {"texto": "Alertas avançados MEI",         "incluido": True},
                    {"texto": "Até 50 alunos",                 "incluido": True},
                    {"texto": "Gráficos de receita",           "incluido": True},
                    {"texto": "Nota fiscal automática",        "incluido": False},
                    {"texto": "Alunos ilimitados",             "incluido": False},
                ],
            },
            {
                "id": 3,
                "nome": "Premium",
                "preco": 99.90,
                "descricao": "Para criadores profissionais",
                "destaque": False,
                "features": [
                    {"texto": "Tudo do Basic",                 "incluido": True},
                    {"texto": "Nota fiscal automática",        "incluido": True},
                    {"texto": "Alunos ilimitados",             "incluido": True},
                    {"texto": "Relatórios personalizados",     "incluido": True},
                    {"texto": "API de integração",             "incluido": True},
                    {"texto": "Suporte via WhatsApp",          "incluido": True},
                    {"texto": "Multi-usuário (até 3)",         "incluido": True},
                    {"texto": "Consultoria mensal",            "incluido": True},
                    {"texto": "Acesso antecipado a novidades", "incluido": True},
                ],
            },
        ],
        "faq": [
            {
                "pergunta": "Posso cancelar a qualquer momento?",
                "resposta": "Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou burocracia. O acesso continua até o fim do período pago."
            },
            {
                "pergunta": "Como funciona o pagamento?",
                "resposta": "O pagamento é feito via cartão de crédito ou boleto bancário, processado com segurança pelo Stripe. Você recebe um comprovante por email."
            },
            {
                "pergunta": "Posso mudar de plano depois?",
                "resposta": "Sim! Você pode fazer upgrade ou downgrade a qualquer momento. No upgrade, o valor é cobrado proporcionalmente."
            },
            {
                "pergunta": "O plano Free tem limite de tempo?",
                "resposta": "Não! O plano Free é para sempre. Você só precisa fazer upgrade se quiser recursos avançados."
            },
            {
                "pergunta": "Meus dados ficam seguros?",
                "resposta": "Sim. Todos os dados são criptografados e armazenados com segurança. Nunca compartilhamos suas informações com terceiros."
            },
        ]
    }