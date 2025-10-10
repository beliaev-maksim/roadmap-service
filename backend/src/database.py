import os
import psycopg2
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    DATABASE_URL = os.environ['DATABASE_URL']
    conn = psycopg2.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        conn.close()
