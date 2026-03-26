from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    nome: str
    email: str
    senha: str


class UserResponse(BaseModel):
    id: int
    nome: str
    email: str
    ativo: bool

    class Config:
        from_attributes = True
