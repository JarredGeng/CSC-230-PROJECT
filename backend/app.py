import os
import sqlite3
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import fitz  # PyMuPDF
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Set up folders for uploads and thumbnails
UPLOAD_FOLDER = "uploads"
THUMBNAIL_FOLDER = "thumbnails"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(THUMBNAIL_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Store posters in memory (replace with a database in production)
posters = []

@app.route('/api/posters', methods=['POST'])
def upload_poster():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    title = request.form.get("title", "").strip()
    description = request.form.get("description", "").strip()

    if not title or not description:
        return jsonify({"error": "Title and description are required"}), 400

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Save the uploaded file
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)
    file_url = f"http://127.0.0.1:5000/uploads/{file.filename}"  # Public file URL

    poster = {
        "title": title,
        "description": description,
        "file_url": file_url
    }

    # If the file is a PDF, generate a thumbnail using PyMuPDF and Pillow
    if file.filename.lower().endswith(".pdf"):
        try:
            doc = fitz.open(file_path)
            page = doc.load_page(0)  # Load first page
            pix = page.get_pixmap()
            img_data = pix.tobytes("png")
            image = Image.open(io.BytesIO(img_data))
            # Resize to a uniform thumbnail size (200x300)
            image = image.resize((200, 300))
            thumbnail_filename = file.filename + ".png"  # e.g., "document.pdf.png"
            thumbnail_path = os.path.join(THUMBNAIL_FOLDER, thumbnail_filename)
            image.save(thumbnail_path, "PNG")
            thumbnail_url = f"http://127.0.0.1:5000/thumbnails/{thumbnail_filename}"
            poster["thumbnail_url"] = thumbnail_url
        except Exception as e:
            print("Error generating thumbnail:", e)

    posters.append(poster)

    return jsonify({
        "message": "Poster uploaded successfully!",
        "poster": poster
    }), 201

@app.route('/api/posters', methods=['GET'])
def get_posters():
    """Return all uploaded posters"""
    return jsonify(posters)

# Serve uploaded files
@app.route('/uploads/<filename>')
def get_uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# Function to search the fucking posters 
def search_posters(query):
    conn = sqlite3.connect("cirt.db")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, title, description, file_path
        FROM posters 
        WHERE title LIKE ? OR description LIKE ?
        """, (f"%{query}%", f"%{query}%"))
    results = cursor.fetchall()
    conn.close()
    
    return [{"id": row[0], "title": row[1], "description": row[2], "file_url": row[3]} for row in results]
   

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get("query", "").strip()
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400
    results = search_posters(query)

    if results:
        return jsonify(results)
    else:
        return jsonify({"message": "No results found"})
   

# Serve thumbnail files
@app.route('/thumbnails/<filename>')
def get_thumbnail_file(filename):
    return send_from_directory(THUMBNAIL_FOLDER, filename)

if __name__ == "__main__":
    print(app.url_map)
    app.run(debug=True, port=5000)
