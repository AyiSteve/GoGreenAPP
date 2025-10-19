import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  // Permission + camera 
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);

  // Component
  const [aiResponse, setAiResponse] = useState<string | null>(null); 
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Can't accomplish wanting the ai to talk whenever needed, just to test do 2 second for now and get respond by taking picture
useEffect(() => {
  if (!permission?.granted) return;

  const interval = setInterval(() => {
    if (!isCapturing) takePicture(); // only take picture if not already busy or there will be error
  }, 2000); 

  return () => clearInterval(interval); // cleanup on unmount
}, [permission, isCapturing]);

  //Take picture and send it to the backend and then display Ai's json response on scnree
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return; //  Skip if busy
    setIsCapturing(true); // say it's busy

    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);

    // Multipart form-data for the server
    const data = new FormData();
    data.append("file", {
      uri: result.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      //send image to backend server
      const res = await fetch("http://10.0.0.75:5001/analyze", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      });


      // Parse the Ai's json output
const json = await res.json();

// THE json format amazon give e kept including '''json and '''
const clean = json.result
  .replace(/```json/g, "")  
  .replace(/```/g, "")      
  .trim();

let parsed;
try {
  parsed = JSON.parse(clean);
} catch (err) {
  //debugg! why is this keep coming to error even I change the format :)
  console.warn("Could not parse JSON:", json.result);
  parsed = { feedback: clean, Point: "?", FOOTprint: "?" };
}

// Display AI feed back on the screen
setAiResponse(`${parsed.feedback}\nPoints: ${parsed.Point} | Footprint: ${parsed.FOOTprint}`);
    } catch (err) {
      console.error("Upload error:", err);
      setAiResponse("Error connecting to server.");
    }finally {
        // Bruh I don't want camera to be too busy 
        setIsCapturing(false);
    }
  };

  // Some UI logic
  if (!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission needed</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      {/* Transparent AI response overlay */}
      {aiResponse && (
        <View style={styles.aiResponseContainer}>
          <Text style={styles.aiResponseText}>{aiResponse}</Text>
        </View>
      )}

    </View>
  );
}

// Style
const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  captureText: {
    fontSize: 28,
    color: "#fff",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  aiResponseContainer: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 12,
    borderRadius: 10,
    maxWidth: "55%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  aiResponseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
  },
});