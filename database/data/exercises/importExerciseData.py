import pandas as pd
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Read DB credentials from env
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER_SETUP')
DB_PASSWORD = os.getenv('DB_USER_SETUP_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

# Load CSV file
df = pd.read_csv("megaGymDataset.csv")

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT
)
cur = conn.cursor()

# Insert each row
for _, row in df.iterrows():
    cur.execute("""
        INSERT INTO Exercises (
            exercise_name, description, exercise_type, body_part, equipment,
            difficulty_level, rating, rating_description
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT (exercise_name) DO NOTHING;
    """, (
        row['Title'], row['Desc'], row['Type'], row['BodyPart'], row['Equipment'],
        row['Level'], row['Rating'], row.get('RatingDesc')
    ))

conn.commit()
cur.close()
conn.close()

print("✅ Exercise data imported successfully.")
