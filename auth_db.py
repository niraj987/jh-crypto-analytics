import sqlite3
import bcrypt
import os

DB_NAME = "users.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            dob TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def register_user(name, email, password, dob):
    try:
        # Hash the password securely
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('INSERT INTO users (name, email, password_hash, dob) VALUES (?, ?, ?, ?)',
                  (name, email, hashed.decode('utf-8'), dob))
        conn.commit()
        conn.close()
        return True, "Registration successful! You can now log in."
    except sqlite3.IntegrityError:
        return False, "Email already exists. Please login instead."
    except Exception as e:
        return False, f"An error occurred: {e}"

def verify_login(email, password):
    try:
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('SELECT name, password_hash FROM users WHERE email = ?', (email,))
        result = c.fetchone()
        conn.close()
        
        if result:
            name, stored_hash = result
            if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
                return True, name
        return False, "Invalid email or password."
    except Exception as e:
        return False, f"An error occurred: {e}"
