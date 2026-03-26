from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(index=True, sa_column_kwargs={"unique": True})
    senha: str
    ativo: bool = True
    criado_em: datetime = Field(default_factory=datetime.utcnow)
