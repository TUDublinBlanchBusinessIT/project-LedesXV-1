import { signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../services/firebase";

export default function ProfileScreen() {

  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been signed out.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Profile</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Logged in as:</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: "#f4f4f4"
  },
  title: { 
    fontSize: 28, 
    marginBottom: 40, 
    fontWeight: "600" 
  },
  infoBox: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 40,
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd"
  },
  label: {
    fontSize: 16,
    color: "#777"
  },
  email: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  }
});

