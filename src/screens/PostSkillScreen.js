import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function PostSkillScreen() {

  const [skill, setSkill] = useState("");
  const [description, setDescription] = useState("");
  const [credits, setCredits] = useState("");

  const handlePostSkill = () => {
    if (!skill || !description || !credits) {
      Alert.alert("Missing fields", "Please fill in all fields.");
      return;
    }

    Alert.alert("Success", "Your skill has been posted!");
    setSkill("");
    setDescription("");
    setCredits("");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Post a Skill</Text>

      <TextInput
        style={styles.input}
        placeholder="Skill Name"
        value={skill}
        onChangeText={setSkill}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Credits (1 to 3)"
        value={credits}
        onChangeText={setCredits}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handlePostSkill}>
        <Text style={styles.buttonText}>Post Skill</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 40,
    backgroundColor: "#f4f4f4" 
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 30
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  button: {
    backgroundColor: "#219EBC",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center"
  }
});

