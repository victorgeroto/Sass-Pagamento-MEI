from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="user.id")
    plano_id: int = Field(foreign_key="plan.id")
    status: str = "ativo"
    criado_em: datetime = Field(default_factory=datetime.utcnow)