// Importa as funções que você precisa
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Suas configurações
const firebaseConfig = {
  apiKey: "AIzaSyAMdL64eDm3sVfsxw47B7JfwlgmFFKPxuE",
  authDomain: "instagram-clone-cbee2.firebaseapp.com",
  projectId: "instagram-clone-cbee2",
  storageBucket: "instagram-clone-cbee2.appspot.com",
  messagingSenderId: "731829668555",
  appId: "1:731829668555:web:b15c116a7616dd6a36694e",
  measurementId: "G-DPZL3VFGNV"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Exporta o app pra usar em outros arquivos
export default app;
