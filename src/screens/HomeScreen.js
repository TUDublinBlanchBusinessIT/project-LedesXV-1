import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../services/firebase";

export default function HomeScreen() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Query Firestore collection ordered by newest first
    const q = query(
      collection(db, "skills"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setSkills(data);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skills Feed</Text>

      {skills.length === 0 ? (
        <Text style={styles.empty}>No skills posted yet.</Text>
      ) : (
        <FlatList
          data={skills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.skillName}>{item.skill}</Text>

              <Text style={styles.byUser}>
                By: {item.userName ? item.userName : "Unknown user"}
              </Text>

              <Text style={styles.credits}>
                Credits: {item.credits}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  empty: {
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  skillName: {
    fontSize: 20,
    fontWeight: "600",
  },
  byUser: {
    fontSize: 15,
    color: "#555",
    marginTop: 5,
  },
  credits: {
    fontSize: 15,
    marginTop: 5,
    color: "#219EBC",
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: "#444",
  },
});
