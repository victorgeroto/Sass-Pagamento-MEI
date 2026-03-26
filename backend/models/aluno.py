from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class Aluno(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    usuario_id: int = Field(foreign_key="user.id")
    nome: str
    email: str
    telefone: Optional[str] = None
    status: str = "ativo"
    data_inicio: date
    data_termino: Optional[date] = None