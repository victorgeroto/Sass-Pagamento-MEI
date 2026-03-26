from pydantic import BaseModel

class PlanCreate(BaseModel):
    nome: str
    preco: float
    descricao: str

class PlanResponse(BaseModel):
    id: int
    nome: str
    preco: float
    descricao: str
    ativo: bool

    class Config:
        from_attributes = True