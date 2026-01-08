from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
import os
import secrets

app = Flask(__name__)
# react와의 통신 허용
CORS(app)

# DB file path
DB_PATH = os.path.join(os.path.dirname(__file__), 'users.db')
# DB management
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

#[Route Definitions]
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

@app.route('/api/register', methods=['POST'])
def register():
    """User Register API"""
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    email = (data.get('email') or '').strip()
    password = data.get('password') or ''

    # Input validation
    if not all([username, email, password]):
        return jsonify({'error': 'Username, email, and password are required.'}), 400

    if len(username) < 3:
        return jsonify({'error': 'Username must be at least 3 characters long.'}), 400
    
    if len(password) < 4:
        return jsonify({'error': 'Password must be at least 4 characters long.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check for duplicate username&email (아이디 중복 확인)
    cursor.execute('SELECT id FROM users WHERE username = ? OR email = ?', (username, email))
    if cursor.fetchone():
        conn.close()
        return jsonify({'error': 'Username or email already exists.'}), 400

    # Hash password and save
    password_hash = generate_password_hash(password)
    try:
        cursor.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            (username, email, password_hash)
        )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Registration completed successfully.'}), 201
    except Exception as e:
        conn.close()
        return jsonify({'error': 'An error occurred during registration.'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Login API"""
    data = request.get_json() or {}
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Find user
    cursor.execute('SELECT id, username, password_hash FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    conn.close()
    
    if not user:
        return jsonify({'error': 'Invalid username or password.'}), 401
    
    # Verify password
    if check_password_hash(user['password_hash'], password):
        token = secrets.token_urlsafe(32)
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'username': user['username']
            },
            'message': 'Login successful'
        }), 200
    else:
        return jsonify({'error': 'Invalid username or password.'}), 401

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
