import { useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {auth, db} from "./firebase"
import './App.css'
import Header from './Header'
import Post from './Post'

function App() {
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
      }
    });

    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()})));
    });
    return ()=> unsubscribe();
  }, []);

  return (
    <div className='app'>
      <Header user={user} setUser={setUser} ></Header>

      {posts.map((post)=>( 
        <Post
        key={post.id}
        id={post.id}
        titulo={post.titulo}
        imagem={post.imagem}
        userName={post.userName}
        user={user}      
        ></Post>
      ))}

      
    </div>
  )
}

export default App
