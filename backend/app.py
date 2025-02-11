import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Set up upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
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

    # Save the file
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)
    file_url = f"http://127.0.0.1:5000/uploads/{file.filename}"  # Public file URL

    poster = {"title": title, "description": description, "file_url": file_url}
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

if __name__ == "__main__":
    app.run(debug=True, port=5000)
