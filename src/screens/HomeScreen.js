import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../services/firebase";

export default function HomeScreen() {

  const user = auth.currentUser;

  // Placeholder data 
  const sampleSkills = [
    { id: "1", skill: "Guitar Lesson", user: "Mike", credits: 1 },
    { id: "2", skill: "Hair Braiding", user: "Aisha", credits: 1 },
    { id: "3", skill: "Math Lesson", user: "Sarah", credits: 1 },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>
        Welcome, {user?.email}
      </Text>

      <Text style={styles.title}>Skills Feed</Text>

      <FlatList
        data={sampleSkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.skillName}>{item.skill}</Text>
            <Text style={styles.byUser}>Offered by {item.user}</Text>
            <Text style={styles.credits}>Credits: {item.credits}</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 40,
    backgroundColor: "#f4f4f4"
  },
  welcome: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  skillName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5
  },
  byUser: {
    fontSize: 15,
    color: "#555",
    marginBottom: 5
  },
  credits: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    color: "#219EBC"
  },
  button: {
    backgroundColor: "#219EBC",
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: "flex-start"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600"
  }
});
