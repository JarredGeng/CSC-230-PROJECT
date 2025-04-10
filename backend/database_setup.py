import sqlite3

# Connect to SQLite database (creates a new file if it doesn't exist)
conn = sqlite3.connect("cirt.db")
cursor = conn.cursor()

# Create a table for research posters
cursor.execute("SELECT * FROM posters")
rows = cursor.fetchall()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS posters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        file_path TEXT NOT NULL
    )
""")

# Save and close connection
conn.commit()
conn.close()

## Testing for later print (rows)
#print("✅ Database and table created successfully!")
