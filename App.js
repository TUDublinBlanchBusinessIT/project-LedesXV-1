import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthStack from "./src/navigation/AuthStack";
import BottomTabs from "./src/navigation/BottomTabs";
import { auth } from "./src/services/firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

