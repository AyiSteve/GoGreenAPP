import express from "express";
import fs from "fs";
import cors from "cors";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Define the port (default to 5002)
const PORT = process.env.PORT || 5002;

// 🔹 AWS S3 configuration
const REGION = "us-west-2";            // AWS region
const BUCKET_NAME = "gogreenprofile";  // your S3 bucket name
const FILE_KEY = "users.json";         // the file storing user data

const s3 = new S3Client({ region: REGION });

/* ======================================================
   🟢 Helper: Load and Save user data from S3
   ====================================================== */
async function loadUsers() {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: FILE_KEY }));
    const body = await res.Body.transformToString();
    return JSON.parse(body);
  } catch (err) {
    console.warn("⚠️ Could not load users.json from S3 (may not exist yet).");
    return []; // return empty list if file not found
  }
}

async function saveUsers(users) {
  const body = JSON.stringify(users, null, 2);
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: FILE_KEY,
      Body: body,
      ContentType: "application/json",
    })
  );
}

/* ======================================================
   🔸 SIGN-UP: Save new user to S3
   ====================================================== */
app.post("/user/signup", async (req, res) => {
  const { email, pw, name, username } = req.body;
  if (!email || !pw)
    return res.status(400).json({ error: "Email and password required" });

  const users = await loadUsers();

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { email, pw, name, username, pts: 100, coupon: [] };
  users.push(newUser);
  await saveUsers(users);

  console.log("🆕 New user added:", newUser.email);
  res.json({ message: "✅ Account created successfully", user: newUser });
});

/* ======================================================
   🔹 SIGN-IN: Compare email + password
   ====================================================== */
app.post("/user/signin", async (req, res) => {
  const { email, pw } = req.body;
  if (!email || !pw)
    return res.status(400).json({ error: "Email and password required" });

  const users = await loadUsers();
  const user = users.find((u) => u.email === email && u.pw === pw);

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  console.log("👤 User logged in:", email);
  res.json({ message: "✅ Login successful", user });
});

/* ======================================================
   🚀 Start Server
   ====================================================== */
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);