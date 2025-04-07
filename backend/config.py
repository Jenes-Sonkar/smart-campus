# app/config.py

import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "jenes_secret_key"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:Ex%40mple123@localhost/canteen_db"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
