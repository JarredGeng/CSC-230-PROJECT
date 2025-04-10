import os
import datetime
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from supabase import create_client, Client
from PIL import Image
import fitz  # PyMuPDF
import jwt

# --- Load environment variables ---
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
JWT_SECRET = os.getenv("JWT_SECRET")

# --- Initialize Flask + Supabase ---
app = Flask(__name__)
CORS(app)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Auth: Register User ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = data['password']

    try:
        res = supabase.auth.sign_up({'email': email, 'password': password})
        if res.user is None:
            return jsonify({'error': res.error.message if res.error else 'Unknown error'}), 400
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Auth: Log In User ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    try:
        res = supabase.auth.sign_in_with_password({'email': email, 'password': password})
        if res.user is None:
            return jsonify({'error': res.error.message if res.error else 'Invalid login'}), 401

        token = jwt.encode(
            {
                'user_id': res.user['id'],
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            },
            JWT_SECRET,
            algorithm='HS256'
        )

        return jsonify({'token': token, 'user_id': res.user['id']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Upload Poster: File + Metadata ---
@app.route('/api/posters', methods=['POST'])
def upload_poster():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    title = request.form.get("title", "").strip()
    description = request.form.get("description", "").strip()
    user_id = request.form.get("user_id", "").strip()

    if not title or not description or not user_id:
        return jsonify({"error": "Missing title, description, or user_id"}), 400

    print(f"📥 Uploading poster: {title} from user {user_id}")

    file_bytes = file.read()
    file_ext = file.filename.split('.')[-1]
    file_name = f"{title.replace(' ', '_')}_{datetime.datetime.utcnow().timestamp()}.{file_ext}"

    # Upload file to Supabase Storage
    supabase.storage.from_('uploads').upload(file_name, file_bytes)
    file_url = f"{SUPABASE_URL}/storage/v1/object/public/uploads/{file_name}"

    # Generate thumbnail for PDFs
    thumbnail_url = None
    if file.filename.lower().endswith(".pdf"):
        try:
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            page = doc.load_page(0)
            pix = page.get_pixmap()
            img_data = pix.tobytes("png")
            image = Image.open(io.BytesIO(img_data))
            image = image.resize((200, 300))
            thumb_name = file_name + ".png"
            thumb_bytes = io.BytesIO()
            image.save(thumb_bytes, format="PNG")
            thumb_bytes.seek(0)
            supabase.storage.from_('uploads').upload(thumb_name, thumb_bytes.read())
            thumbnail_url = f"{SUPABASE_URL}/storage/v1/object/public/uploads/{thumb_name}"
        except Exception as e:
            print("⚠️ Thumbnail generation failed:", e)

    # Save metadata to Supabase
    supabase.table("documents").insert({
        "title": title,
        "description": description,
        "file_url": file_url,
        "thumbnail_url": thumbnail_url,
        "user_id": user_id
    }).execute()

    return jsonify({
        "message": "Uploaded successfully",
        "file_url": file_url,
        "thumbnail_url": thumbnail_url
    }), 201

# --- Get All Posters ---
@app.route('/api/posters', methods=['GET'])
def get_posters():
    res = supabase.table("documents").select("*").order("uploaded_at", desc=True).execute()
    return jsonify(res.data)

# --- Search Posters (via Supabase) ---
@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get("query", "").strip()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    try:
        res = supabase.table("documents") \
            .select("*") \
            .ilike("title", f"%{query}%") \
            .execute()
        results = res.data
        if results:
            return jsonify(results)
        else:
            return jsonify({"message": "No results found"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Run Server ---
if __name__ == "__main__":
    print("✅ Server is running at http://localhost:5000")
    app.run(debug=True, port=5000)
