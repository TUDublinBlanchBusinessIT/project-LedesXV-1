import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { auth, db } from "../services/firebase";

export default function MyRequestsScreen() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "skills"),
      where("userEmail", "==", user.email),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
      setItems(arr);
    });

    return unsub;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Posts</Text>

      {items.length === 0 && (
        <Text style={styles.empty}>You have no posts yet.</Text>
      )}

      {items.map(it => (
        <View key={it.id} style={styles.card}>
          <Text style={styles.skill}>{it.skill}</Text>
          <Text style={styles.desc}>{it.description}</Text>
          <Text style={styles.credits}>Credits: {it.credits}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F4F4F4" },
  title: {fontSize: 26, fontWeight: "600", marginBottom: 20},
  empty: { color: "#777", fontSize: 16, marginTop: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15
  },
  skill: { fontSize: 22, fontWeight: "700" },
  desc: { marginTop: 10, color: "#444" },
  credits: { marginTop: 10, color: "#219EBC", fontWeight: "700" }
});
