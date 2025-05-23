import os
import datetime
import io
import time
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
CORS(app, supports_credentials=True, origins="*")


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Register User and assign role ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data['email']
    password = data['password']
    name = data.get('name', '').strip()

    try:
        res = supabase.auth.sign_up({'email': email, 'password': password})
        if res.user is None:
            return jsonify({'error': res.error.message if res.error else 'Unknown error'}), 400

        time.sleep(0.5)

        user_id = res.user.id

        supabase.table("profiles").insert({
            "id": user_id,
            "role": "student",
            "name": name
        }).execute()

        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Manage Users API ---

@app.route("/api/users", methods=["GET"])
def list_users():
    try:
        res = supabase.table("profiles").select("*").execute()
        return jsonify(res.data)
    except Exception as e:
        print("Error fetching users:", e)
        return jsonify({"error": str(e)}), 500


# Change role
@app.route("/api/users/<uuid:user_id>/role", methods=["PATCH"])
def change_role(user_id):
    new_role = request.json["role"]
    supabase.table("profiles").update({"role": new_role}).eq("id", str(user_id)).execute()
    return jsonify(success=True)

# Toggle active
@app.route("/api/users/<uuid:user_id>/toggle", methods=["PATCH"])
def toggle_active(user_id):
    user = supabase.table("profiles").select("is_active").eq("id", str(user_id)).single().execute().data
    new_status = not user["is_active"]
    supabase.table("profiles").update({"is_active": new_status}).eq("id", str(user_id)).execute()
    return jsonify(success=True)

# Delete user
@app.route("/api/users/<uuid:user_id>", methods=["DELETE"])
def delete_user(user_id):
    supabase.table("profiles").delete().eq("id", str(user_id)).execute()
    return jsonify(success=True)



# --- Login User and return role ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    try:
        res = supabase.auth.sign_in_with_password({'email': email, 'password': password})
        if res.user is None:
            return jsonify({'error': res.error.message if res.error else 'Invalid login'}), 401

        user_id = res.user.id
        email = res.user.email

        # Get role and name from profiles table
        profile_res = supabase.table("profiles").select("role", "name").eq("id", user_id).single().execute()
        role = profile_res.data['role'] if profile_res.data else 'student'
        name = profile_res.data['name'] if profile_res.data else 'User'

        token = jwt.encode(
            {
                'user_id': user_id,
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            },
            JWT_SECRET,
            algorithm='HS256'
        )

        return jsonify({
            'token': token,
            'user_id': user_id,
            'role': role,
            'name': name
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# --- Confirm Email via token and return user + role ---
@app.route('/api/confirm', methods=['POST'])
def confirm_login():
    token = request.json.get("token")
    try:
        res = supabase.auth.get_user(token)
        user = res.user
        if not user:
            return jsonify({"error": "Invalid or expired token"}), 401

        user_id = user.id
        email = user.email

        role_res = supabase.table("profiles").select("role").eq("id", user_id).single().execute()
        role = role_res.data['role'] if role_res.data else 'student'

        jwt_token = jwt.encode(
            {
                'user_id': user_id,
                'email': email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            },
            JWT_SECRET,
            algorithm='HS256'
        )

        return jsonify({
            "token": jwt_token,
            "user_id": user_id,
            "email": email,
            "role": role
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

    print(f"Uploading poster: {title} from user {user_id}")

    file_bytes = file.read()
    file_ext = file.filename.split('.')[-1]
    file_name = f"{title.replace(' ', '_')}_{datetime.datetime.utcnow().timestamp()}.{file_ext}"

    supabase.storage.from_('uploads').upload(file_name, file_bytes, {"content-type": file.content_type})

    file_url = f"{SUPABASE_URL}/storage/v1/object/public/uploads/{file_name}"

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
            print("Thumbnail generation failed:", e)

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

# --- Get All Posters (with optional status filter) ---
@app.route('/api/posters', methods=['GET'])
def get_posters():
    status = request.args.get("status")

    query = supabase.table("documents").select("*").order("uploaded_at", desc=True)
    if status:
        query = query.eq("status", status)

    res = query.execute()
    return jsonify(res.data)

# --- Get Poster by ID ---
@app.route('/api/posters/<int:poster_id>', methods=['GET'])
def get_poster(poster_id):
    try:
        res = supabase.table("documents").select("*").eq("id", poster_id).single().execute()
        if res.data:
            return jsonify(res.data)
        else:
            return jsonify({"error": "Poster not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Search Posters ---
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
        results = res.data or []
        return jsonify(results) 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PATCH"
    return response

@app.route('/api/comments/<int:poster_id>', methods=['GET'])
def get_comments(poster_id):
    try:
        res = supabase.rpc("get_comments_with_name", {"poster_id_input": poster_id}).execute()
        return jsonify(res.data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Post a Comment ---
@app.route('/api/comments/<int:poster_id>', methods=['POST'])
def post_comment(poster_id):
    data = request.get_json()
    content = data.get("content", "").strip()
    user_id = data.get("user_id", "").strip()

    if not content or not user_id:
        return jsonify({"error": "Missing content or user ID"}), 400

    try:
        supabase.table("comments").insert({
            "poster_id": poster_id,
            "content": content,
            "user_id": user_id
        }).execute()
        return jsonify({"message": "Comment added successfully"}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Update Poster Status ---
@app.route('/api/posters/<int:poster_id>/status', methods=['PATCH'])
def update_poster_status(poster_id):
    data = request.get_json()
    new_status = data.get("status", "").strip()
    reviewer_id = data.get("reviewer_id", "").strip()

    valid_statuses = ["submitted", "needs_edits", "resubmitted", "approved"]
    if new_status not in valid_statuses:
        return jsonify({"error": f"Invalid status. Must be one of: {valid_statuses}"}), 400

    update_fields = {"status": new_status}
    if reviewer_id:
        update_fields["reviewer_id"] = reviewer_id

    try:
        supabase.table("documents") \
            .update(update_fields) \
            .eq("id", poster_id) \
            .execute()

        return jsonify({"message": f"Poster status updated to '{new_status}'"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
