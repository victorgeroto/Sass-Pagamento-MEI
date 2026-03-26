from sqlmodel import SQLModel, Field
from typing import Optional

class Plan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    preco: float
    descricao: str
    ativo: bool = True