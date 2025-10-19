// Overnight saver: https://docs.aws.amazon.com/code-library/latest/ug/javascript_3_s3_code_examples.html#basics
import express from "express";
import cors from "cors";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// This express application
const app = express();
app.use(cors());
app.use(express.json());


// AWS S3 configuration
const REGION = "us-east-1";            
const BUCKET_NAME = "gogreenprofile";  
const FILE_KEY = "users.json";         

const s3 = new S3Client({ region: REGION });

//Load and Save user data from S3
async function loadUsers() {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: FILE_KEY }));
    const body = await res.Body.transformToString();
    return JSON.parse(body);
  } catch (err) {
    console.warn("Could not load users.json from S3 (creating new one).");
    return [];
  }
}

// Save Users
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

// Sign up want input of    {"email": "example@email.com","pw": "password123","name": "John Doe","username": "johnny"}
// BUt honesly, I just want email and password for now... we can add more when we got time
app.post("/user/signup", async (req, res) => {
    console.log("Sign Up gotten", req.body);
  const { email, coupon, name, username , pw} = req.body;
  // Ensure we got everything
  if (!email || !pw) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const users = await loadUsers();

  // No duplicate accounts
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Create and save new user object
  const newUser = { email, pw, name, username, pts: 100, coupon: [] };
  users.push(newUser);
  await saveUsers(users);

  console.log("New user added:", newUser.email);
  res.json({ message: "Account created successfully", user: newUser });
});

// SIGN-IN: Compare email + password
// Expect a json input of email + pw combination
app.post("/user/signin", async (req, res) => {
  const { email, pw } = req.body;
  if (!email || !pw) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const users = await loadUsers();
  // Do a comparsion to see if username + password matches
  const user = users.find((u) => u.email === email && u.pw === pw);

  if (!user) {
    console.log("Invalid login attempt:", email);
    return res.status(401).json({ error: "Invalid email or password" });
  }
  // login success!
  console.log("User logged in:", email);
  res.json({ message: "Login successful", user });
});

// Had to bend this sevrer host so much hopfully if we can make this easiler
const PORT = 5002;
const HOST = "0.0.0.0"; 

// Start Server
app.listen(PORT, 5002, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});