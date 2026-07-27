from typing import Annotated

from fastapi import FastAPI, HTTPException, Query
from sqlmodel import select
from .sql.session import SessionDep, create_db_and_tables

from .models.URLMapping import URLMapping

app = FastAPI()


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.post("/db/")
def create_mapping(mapping: URLMapping, session: SessionDep) -> URLMapping:
    session.add(mapping)
    session.commit()
    session.refresh(mapping)
    return mapping


@app.get("/db/")
def get_mappings(
    session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100
) -> list[URLMapping]:
    mappings = session.exec(select(URLMapping).offset(offset).limit(limit)).all()
    return list(mappings)


@app.get("/db/{id}")
def get_mapping_by_id(id: int, session: SessionDep) -> URLMapping:
    mapping = session.get(URLMapping, id)
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    return mapping


@app.delete("/db/{id}")
def delete_mapping_by_id(id: int, session: SessionDep):
    mapping = session.get(URLMapping, id)
    if not mapping:
        raise HTTPException(status_code=404, detail="Mapping not found")
    session.delete(mapping)
    session.commit()

    return {"ok": True}
