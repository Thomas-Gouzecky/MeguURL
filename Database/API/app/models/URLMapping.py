from sqlmodel import Field, SQLModel, Column
from sqlalchemy import Text, Integer


class URLMapping(SQLModel, table=True):
    __tablename__: str = "URLMapping"

    id: int | None = Field(sa_column=Column(Integer, default=None, primary_key=True))
    unique_code: str = Field(sa_column=Column(Text, index=True))
    longURL: str = Field(sa_column=Column(Text, index=True))
