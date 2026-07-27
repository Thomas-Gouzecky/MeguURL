from sqlmodel import Field, SQLModel, Column
from sqlalchemy import Text, Integer


class URLMapping(SQLModel, table=True):
    __tablename__: str = "URLMapping"

    id: int | None = Field(sa_column=Column(Integer, default=None, primary_key=True))
    long_url: str = Field(sa_column=Column(Text, index=True))
