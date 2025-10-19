# GoGreenAPP

#After clone pls do 'npm install' and run with 'npx expo start'
#The react native's base is built with expo go

#DO 'AWS configure' to log in so you can access to your model and change the region in side the file of backend/aiaigent.js


Inspiration

GoGreen was inspired by Pokemon Go. We attended an environmental science lecture and tell us a lot about protecting our planet. We also recognized that many students face hardships that make it difficult to live sustainably, so we wanted to create something that makes “going green” easier, more engaging, and rewarding for everyone.

What it does

GoGreen recognizes real-world actions that help the environment such as recycling, turning off unused lights, or biking instead of driving. It rewards users with Green Points, which can later be redeemed for prizes in different stores. The app also gives gentle reminders and positive feedback when it detects non-green actions, while showing users how much carbon emission reduction they’ve contributed.

Some main feature including: *BEDROCK HTTP CALL: * With NOVA PRO model, our application aim to give user real time feedback! Just point your camera toward your point of view, it'll be able to lecture you about the nature and environment. In addition, rewarding you for green action! There is more fun fact awaiting to be discover.

*AMAZON S3: * Your profile will be saved safely in the S3 from amazon web services. Access them by entering your username+password correctly OR create an account to get your adventure begin!

DEVELOPMENT

GoGreen is a mobile app built using React Native with Expo as the framework. Our backend deals with AWS Bedrock for AI-driven analysis (Nova Pro) to identify if user perform green-action and giving some positive feedback+story and Amazon S3 as a cloud service to handle user data (user data is stored as a JSON format). Both Bedrock http call and s3 is hosted in server where our frontend can fetch or send information directly.

In addition, we used AI as a tool to help us strengthen the parts that we are not so confidents at, like fixing problems when we are doing front-end designs.

Challenges we ran into

We encountered multiple challenges during development, especially with debugging code, configuring APIs, and implementing the AI model which we have to curve the way we approaches to our solution. At first instead of amazon s3, we tend to use aws cognito to help the login+sign up however, we can't get our program communicating with the amazon cognito service (We're guessing the react native create by expo don't support the way we try to connect); to not hurt more time and decided to do an old fashion way of storing profile information as a JSON and send it to amazon S3.

Took a long time trying to communicate with the model from bedrock. Luckily, we find a great reference and example code to link with the model using http call provided by the amazon in google+just need to host a server and do a fetch and catch. In addition, the model ain't returning the valid json file at all time so our frontend would sometimes crash due to that; so we had a portion of code that'll handle the error and print raw output.

It's all our first time using react native; so it took us a long time to set it up but luckily EXPO is easy to use for setting up the react native + We used Chatgpt to help us in the coding and understanding how frontend work in the framework and typescript.

Accomplishments that we're proud of

We’re proud of building a working demo app that successfully recognizes eco-friendly actions using AI.

What we learned

We learned how to structure large-scale app projects, integrate AI and APIs, and collaborate effectively as a team. This experience strengthened our problem-solving skills and our understanding of how technology can create social and environmental impact.

What's next for GoGreen

Our next goal is to bring GoGreen to wearable devices like AR glasses, so users can automatically detect green actions. We also aim to expand partnerships with environmental organizations which allow Green Points to directly fund community efforts. Lastly, GoGreen can be set as a community driven platform that helps reduce carbon footprints and empowers people, especially students and young people to take part in fighting global climate change.
