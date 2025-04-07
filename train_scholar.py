import pandas as pd
import pickle
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import os

# === 1. Sample Data ===
data = {
    'GPA': [3.5, 3.8, 4.0, 2.8, 3.2],
    'Extracurriculars': [3, 2, 4, 1, 2],
    'FamilyIncome': [50000, 60000, 75000, 40000, 55000],
    'Scholarship': [1, 1, 1, 0, 0]
}

df = pd.DataFrame(data)

# === 2. Features and Target ===
X = df[['GPA', 'Extracurriculars', 'FamilyIncome']]
y = df['Scholarship']

# === 3. Scaling ===
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# === 4. Model Training ===
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# === 5. Save Model and Scaler ===
os.makedirs("utils", exist_ok=True)
with open("utils/scholarship_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("utils/scholarship_scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

print("✅ Scholarship model and scaler saved in utils/")
