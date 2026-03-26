from pydantic import BaseModel
from datetime import datetime

class SubscriptionCreate(BaseModel):
    plano_id: int

class SubscriptionResponse(BaseModel):
    id: int
    usuario_id: int
    plano_id: int
    status: str
    criado_em: datetime

    class Config:
        from_attributes = True