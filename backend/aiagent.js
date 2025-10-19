//I overcome the hardship with this amazing AWS SDK for javascript: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/command/InvokeModelCommand/

import express from "express";
import multer from "multer";
import fs from "fs";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

//This is an express app
const app = express();
const upload = multer({ dest: "uploads/" });  //We want a temporarily store of the image just in case
const client = new BedrockRuntimeClient({ region: "us-west-2" });

//Techinically, we'll be hosting a server which fetch an image where we'll return a json format
app.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const imagePath = req.file.path;
    // convert image for transmission
    const imageBytes = fs.readFileSync(imagePath);
    const base64Image = imageBytes.toString("base64");

    // using the noval pro model, we'll be requesting from https to get responds
    //this is the body
    const requestBody = {
      messages: [
        {
          role: "user",
          content: [
            { text: "Hi You're an AI agents that'll teach and vertify if the person is doing any 'green action' like throwing trash in the right bin, riding bike, or etc. Then you'll give a very short sentence of lecturing and give them points for doing green actions and explain the carbon emission. And remember you are a teacher, please give fun fact when you have nothing to say. Lastly return in valid JSON for me to pharse in typescript. Straight in this format: {'Point': 15, 'FOOTprint': 20, 'feedback': “DO you know? Recycling a washed plastic bottle save the environment more”}"},
            { image: { format: "jpg", source: { bytes: base64Image } } },
          ],
        },
      ],
      inferenceConfig: { maxTokens: 100 },
    };
    // model input
    const input = {
      body: new TextEncoder().encode(JSON.stringify(requestBody)),
      contentType: "application/json",
      accept: "application/json",
      modelId: "arn:aws:bedrock:us-west-2:508881055253:inference-profile/us.amazon.nova-pro-v1:0",
    };
    // invoke the model
    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    //decode the output
    const decoded = new TextDecoder().decode(response.body);
    const answer = JSON.parse(decoded).output.message.content[0].text;

    fs.unlinkSync(imagePath); 
    // we'll return: {'Point': 15, 'FOOTprint': 20, 'feedback': “DO you know? Recycling a washed plastic bottle save the environment more”}
    res.json({ result: answer });
  } catch (err) {
    // debug
    console.error("Error invoking model:", err);
    res.status(500).json({ error: String(err) });
  }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));





