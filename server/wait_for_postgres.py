#!/usr/bin/env python
import os
import time

import psycopg2


dsn = (
    "host=db "
    f"dbname={os.getenv('POSTGRES_DB')} "
    f"user={os.getenv('POSTGRES_USER')} "
    f"password={os.getenv('POSTGRES_PASSWORD')} "
)

# Try connecting to the db periodically until successful.
while True:
    try:
        conn = psycopg2.connect(dsn)
    except psycopg2.OperationalError as e:
        print(f"waiting for postgres... {e}")
        time.sleep(1)
        continue

    conn.close()
    print("connected")
    break
