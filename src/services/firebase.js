import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAnPpBJ5pl4GOu4AIR3jnGvbUPdiMpZmhk",
  authDomain: "skillswap-57abc.firebaseapp.com",
  projectId: "skillswap-57abc",
  storageBucket: "skillswap-57abc.appspot.com",
  messagingSenderId: "233931776208",
  appId: "1:233931776208:web:8a685ae0b15b3273a4fed5",
  measurementId: "G-YSBJNTC6QP"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);

