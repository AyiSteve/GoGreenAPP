import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null); // ✅ Added this line
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const result = await cameraRef.current.takePictureAsync();
    setPhoto(result.uri);

    const data = new FormData();
    data.append("file", {
      uri: result.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const res = await fetch("http://10.19.174.90:5001/analyze", {
        method: "POST",
        body: data,
        headers: { "Content-Type": "multipart/form-data" },
      });


const json = await res.json();
const parsed = JSON.parse(json.result);
setAiResponse(`${parsed.feedback}\nPoints: ${parsed.Point} | Footprint: ${parsed.FOOTprint}`);
    } catch (err) {
      console.error("Upload error:", err);
      setAiResponse("Error connecting to server.");
    }
  };

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

      <TouchableOpacity onPress={takePicture} style={styles.capture}>
        <Text style={styles.captureText}>📸</Text>
      </TouchableOpacity>

      {photo && <Image source={{ uri: photo }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  capture: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 40,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  captureText: {
    fontSize: 28,
    color: "#fff",
  },
  preview: {
    width: 120,
    height: 180,
    borderRadius: 10,
    position: "absolute",
    bottom: 150,
    alignSelf: "center",
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