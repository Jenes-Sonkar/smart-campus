import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import r2_score, accuracy_score

# === Create utils folder if it doesn't exist ===
os.makedirs("utils", exist_ok=True)

# === 1. TRAINING MEAL DEMAND PREDICTION MODEL ===

print("📦 Training meal demand prediction model...")

df_demand = pd.read_csv("data/food_demand_dataset.csv")

# Features & target
features = ['day_of_week', 'season', 'is_holiday', 'special_event', 'menu_type']
target = 'meal_demand'
X_raw = df_demand[features]
y = df_demand[target]

# One-hot encode
X_encoded = pd.get_dummies(X_raw, drop_first=True)
feature_columns = X_encoded.columns.tolist()

# Scale
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_encoded)

# Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Random Forest
rf = RandomForestRegressor(random_state=42)
rf.fit(X_train, y_train)

# Evaluate
rf_preds = rf.predict(X_test)
print(f"✅ Meal Demand Model R² Score: {r2_score(y_test, rf_preds):.2f}")

# Save components
with open("utils/random_forest_model.pkl", "wb") as f:
    pickle.dump(rf, f)

with open("utils/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

with open("utils/feature_columns.pkl", "wb") as f:
    pickle.dump(feature_columns, f)


# === 2. TRAINING NUTRITION SUGGESTION MODEL ===
# with open("utils/food_recommender_model.pkl", "wb") as f:
#     pickle.dump(pipeline, f)
print("🥗 Training nutrition suggestion model...")
df_nutrition = pd.read_csv("data/nutrition_suggestions_dataset.csv")

# These should match your frontend inputs:
features_nutrition = ['Gender', 'Weight', 'Height', 'Activity Level', 'Dietary Preference', 'Meals per Day']
target_nutrition = 'Recommended Foods'

X_nutrition = df_nutrition[features_nutrition]
y_nutrition = df_nutrition[target_nutrition]

# Encode target
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y_nutrition)

# Encode categorical features (if any)
X_encoded_nutrition = pd.get_dummies(X_nutrition, drop_first=True)

# Split
X_train_n, X_test_n, y_train_n, y_test_n = train_test_split(X_encoded_nutrition, y_encoded, test_size=0.2, random_state=42)

# Model
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train_n, y_train_n)

# Evaluate
clf_preds = clf.predict(X_test_n)
print(f"✅ Nutrition Suggestion Accuracy: {accuracy_score(y_test_n, clf_preds):.2f}")

# Save model and label encoder
with open("utils/food_recommender_model.pkl", "wb") as f:
    pickle.dump(clf, f)

with open("utils/food_label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("🎉 All models trained and saved to utils/")

