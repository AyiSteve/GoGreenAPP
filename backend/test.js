import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import fs from "fs";

/*
Example Code provided by AMAZON:https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/bedrock-runtime/command/InvokeModelCommand/
*/
// Configure client
const config = { region: "us-west-2" };
const client = new BedrockRuntimeClient(config);

const imageBytes = fs.readFileSync("image.png"); // replace with your image file path
const base64Image = imageBytes.toString("base64");

// Prepare properly formatted body
const requestBody = {
  messages: [
    {
      role: "user",
      content: [
        { text: "is the person throwing the trash in the right bin?" },
        { image: { format: "png", source: { bytes: base64Image } } }
      ]
    }
  ],
  inferenceConfig: {
    maxTokens: 50
  }
};

// Fill input object
const input = {
  body: new TextEncoder().encode(JSON.stringify(requestBody)),
  contentType: "application/json",
  accept: "application/json",
  modelId: "arn:aws:bedrock:us-west-2:948451199544:inference-profile/us.amazon.nova-pro-v1:0",
  trace: "DISABLED",
  performanceConfigLatency: "standard",
};

// Step 4: Invoke
try {
  const command = new InvokeModelCommand(input);
  const response = await client.send(command);

  const decoded = new TextDecoder().decode(response.body);
  console.log("🗣️ Assistant says:", JSON.parse(decoded).output.message.content[0].text);
} catch (err) {
  console.error("❌ Error invoking Nova model:", err);
}