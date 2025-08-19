
// Configuración de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY1UfRTvHJrZgQd9nnIQnf-1tRDpVJDNY",
  authDomain: "danielrf-com-adm.firebaseapp.com",
  projectId: "danielrf-com-adm",
  storageBucket: "danielrf-com-adm.appspot.com",
  messagingSenderId: "274725801887",
  appId: "1:274725801887:web:34729113c35fb990aeb7aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
