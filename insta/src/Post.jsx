import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Post({ id, titulo, imagem, userName, user}) {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "posts", id, "comentarios"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComentarios(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [id]);

  const enviarComentario = async (e) => {
    e.preventDefault();
    if (novoComentario.trim() === "") return;
    console.log("Vai tentar salvar o comentário...");

    await addDoc(collection(db, "posts", id, "comentarios"), {
      texto: novoComentario,
      nome: user,
      timestamp: serverTimestamp(),
    });

    setNovoComentario("");
  };

  return (
    <div className="post-single">
      <p className="comentarioP">
        <b>{userName}</b>
      </p>
      <img src={imagem} alt="Post" />
      <p className="comentarioP">{titulo}</p>

      <div className="comentarios">
        <h4>Últimos comentários</h4>
        {comentarios.map((comentario, index) => (
          <p key={index}><b>{comentario.nome}</b>: {comentario.texto}</p>
        ))}
      </div>

      {(user)?
        <form onSubmit={enviarComentario}>
        <textarea
          placeholder="Adicionar um comentario.."
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        ></textarea>
        <input type="submit" value="Comentar" />
      </form>
      :<div></div>
      }
    </div>
  );
}

export default Post;
