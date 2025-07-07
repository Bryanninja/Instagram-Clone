// Importa as funções necessárias do SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configurações do seu Firebase (já fornecidas)
const firebaseConfig = {
  apiKey: "AIzaSyAMdL64eDm3sVfsxw47B7JfwlgmFFKPxuE",
  authDomain: "instagram-clone-cbee2.firebaseapp.com",
  projectId: "instagram-clone-cbee2",
  storageBucket: "instagram-clone-cbee2.firebasestorage.app",
  messagingSenderId: "731829668555",
  appId: "1:731829668555:web:b15c116a7616dd6a36694e",
  measurementId: "G-DPZL3VFGNV"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Exporta o app para uso em outros arquivos, se precisar
export default app;
