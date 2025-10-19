# GoGreenAPP

After clone pls do 'npm install' and run with 'npx expo start'
The react native's base is built with expo go

DO 'AWS configure' to log in so you can access to your model and change the region in side the file of backend/aiaigent.js + backend/datalibrary.js



⸻

Inspiration

GoGreen was inspired by Pokemon Go.
We attended an environmental science lecture that taught us about protecting our planet.
We also recognized that many students face hardships that make it difficult to live sustainably,
so we wanted to create something that makes “going green” easier, more engaging, and rewarding for everyone.

⸻

What It Does

GoGreen recognizes real-world actions that help the environment such as:
	•	Recycling
	•	Turning off unused lights
	•	Biking instead of driving

It rewards users with Green Points, which can later be redeemed for prizes in different stores.
The app also gives gentle reminders and positive feedback when it detects non-green actions,
while showing users how much carbon emission reduction they’ve contributed.

⸻

Main Features

BEDROCK HTTP CALL (Nova Pro Model)

With the NOVA PRO model, our application gives users real-time feedback.
Just point your camera toward your surroundings — it will lecture you about nature and the environment.
In addition, it rewards you for green actions with fun facts and educational insights.

AMAZON S3

Your profile is safely stored on Amazon S3, a cloud service.
Access it by entering your correct username and password,
or create a new account to start your green adventure.

⸻

Development

GoGreen is a mobile app built using React Native with Expo as the framework.
Our backend integrates with:
	•	AWS Bedrock (Nova Pro) for AI-driven image analysis
	•	Amazon S3 as a cloud service to handle user data (stored as JSON)

Both the Bedrock HTTP call and S3 services are hosted on a local Express server,
allowing the frontend to send and receive information directly.

We also used AI tools (like ChatGPT) to help us debug, refine frontend design,
and understand the React Native + TypeScript ecosystem.

⸻

Challenges We Ran Into

We faced multiple challenges during development:
	•	Debugging and configuring API connections
	•	Communicating with AWS services (especially Bedrock and Cognito)
	•	Handling invalid JSON outputs from the AI model (which caused frontend crashes)

Initially, we tried to use AWS Cognito for authentication,
but React Native (Expo) had compatibility issues with the SDK.
So, we switched to a simpler method — storing user profiles as JSON in Amazon S3.

It took time to figure out how to make Bedrock’s HTTP call work properly.
Thankfully, we found great reference examples from AWS documentation.
We also added error-handling code to safely process malformed AI responses.

As first-time React Native developers, setting up the environment took patience —
but Expo made it much easier, and ChatGPT helped us quickly learn the workflow.

⸻

Accomplishments We’re Proud Of

We’re proud of building a working demo app that successfully:
	•	Recognizes eco-friendly actions using AI
	•	Rewards users for positive environmental behavior
	•	Provides real-time, engaging feedback with fun facts

⸻

What We Learned

We learned:
	•	How to structure large-scale app projects
	•	How to integrate AI models and cloud APIs
	•	How to collaborate effectively as a team

This project strengthened our problem-solving skills
and our understanding of how technology can drive environmental impact.

⸻

What’s Next for GoGreen
	•	Bring GoGreen to wearable devices (like AR glasses) for automatic detection of green actions
	•	Partner with environmental organizations so Green Points can directly fund real-world initiatives
	•	Evolve GoGreen into a community-driven platform that empowers people—especially students—
to reduce carbon footprints and fight global climate change
