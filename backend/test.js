import express from "express";
import multer from "multer";
import fs from "fs";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const app = express();
const upload = multer({ dest: "uploads/" }); // temp folder for images
const client = new BedrockRuntimeClient({ region: "us-west-2" });

app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageBytes = fs.readFileSync(imagePath);
    const base64Image = imageBytes.toString("base64");

    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            { text: "Hi You're an AI agents that'll vertify if the person is doing any 'green action' like throwing trash in the right bin, riding bike, or etc. Then you'll give a very short sentence of feedback and give me points for doing green actions and explain the carbon emission. In the format of {'Label': “yes”, 'Point': +15, 'FOOTprint': +20, 'feedback': “DO you know? Recycling a washed plastic bottle save the environment more”} where label can only be yes or no for green action and you decide the rest. Lastly return in JSON" },
            { image: { format: "jpg", source: { bytes: base64Image } } },
          ],
        },
      ],
      inferenceConfig: { maxTokens: 50 },
    };

    const input = {
      body: new TextEncoder().encode(JSON.stringify(requestBody)),
      contentType: "application/json",
      accept: "application/json",
      modelId: "arn:aws:bedrock:us-west-2:508881055253:inference-profile/us.amazon.nova-pro-v1:0",
    };

    const command = new InvokeModelCommand(input);
    const response = await client.send(command);

    const decoded = new TextDecoder().decode(response.body);
    const answer = JSON.parse(decoded).output.message.content[0].text;

    fs.unlinkSync(imagePath); // clean up temp file

    res.json({ result: answer });
  } catch (err) {
    console.error("❌ Error invoking Nova model:", err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(5001, () => console.log("🚀 Server running on http://localhost:5001"));