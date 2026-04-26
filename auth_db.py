import sqlite3
import bcrypt
import os
import uuid

DB_NAME = "users.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_id TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone_number TEXT NOT NULL,
            gender TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            dob TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def register_user(name, email, phone_number, gender, password, dob):
    try:
        # Hash the password securely
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        # Generate short customer ID
        customer_id = "JHC-" + str(uuid.uuid4().hex[:8]).upper()
        
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('INSERT INTO users (customer_id, name, email, phone_number, gender, password_hash, dob) VALUES (?, ?, ?, ?, ?, ?, ?)',
                  (customer_id, name, email, phone_number, gender, hashed.decode('utf-8'), dob))
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
        c.execute('SELECT customer_id, name, email, phone_number, gender, dob, password_hash FROM users WHERE email = ?', (email,))
        result = c.fetchone()
        conn.close()
        
        if result:
            customer_id, name, email, phone_number, gender, dob, stored_hash = result
            if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
                user_info = {
                    "customer_id": customer_id,
                    "name": name,
                    "email": email,
                    "phone": phone_number,
                    "gender": gender,
                    "dob": dob
                }
                return True, user_info
        return False, "Invalid email or password."
    except Exception as e:
        return False, f"An error occurred: {e}"
