import sqlite3

conn = sqlite3.connect("chatbot.db")
cursor = conn.cursor()

cursor.execute("DELETE FROM messages")
cursor.execute("DELETE FROM conversations")

# Reset auto-increment counters
cursor.execute("DELETE FROM sqlite_sequence WHERE name='messages'")
cursor.execute("DELETE FROM sqlite_sequence WHERE name='conversations'")

conn.commit()
conn.close()

print("Database cleaned successfully!")
