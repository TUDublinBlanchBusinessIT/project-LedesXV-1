import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../services/firebase";

export default function PostSkillScreen() {
  const [skill, setSkill] = useState("");
  const [desc, setDesc] = useState("");
  const [credits, setCredits] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        setName(snap.data().name);
      }
    };
    fetchName();
  }, []);

  const handlePost = async () => {
    console.log("Post button pressed");

    if (!skill || !desc || !credits) {
      console.log("Missing fields");
      Alert.alert("Missing Fields", "Fill all fields.");
      return;
    }

    if (!auth.currentUser) {
      console.log("No current user");
      Alert.alert("Not logged in", "Please login again.");
      return;
    }

    try {
      console.log("About to add doc");

      await addDoc(collection(db, "skills"), {
        skill,
        description: desc,
        credits: Number(credits),
        userName: name || "Unknown user",
        userEmail: auth.currentUser.email,
        createdAt: serverTimestamp(),
      });

      setSkill("");
      setDesc("");
      setCredits("");

    } catch (err) {
      console.log("Error while posting skill:", err);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a Skill</Text>

      <TextInput
        style={styles.input}
        placeholder="Skill"
        value={skill}
        onChangeText={setSkill}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
      />

      <TextInput
        style={styles.input}
        placeholder="Credits (1-3)"
        value={credits}
        onChangeText={setCredits}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Post Skill</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, padding: 20 },
  title: { fontSize: 26, marginBottom: 20 },
  input: { padding: 12, backgroundColor: "#fff", borderRadius: 8, marginBottom: 15, borderWidth: 1 },
  button: { backgroundColor: "#219EBC", padding: 15, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" }
});

