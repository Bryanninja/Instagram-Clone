import { useState } from "react";
import { auth, storage, db} from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut} from "firebase/auth"; // import importante

function Header({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState(null);


  const handleCadastro = async (e)=>{
    e.preventDefault();

    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
        const user = userCredential.user;

        await updateProfile(user,{
            displayName:nome,
        });

        setNome(nome);
        alert("Conta criada com sucesso")
        document.getElementById('cadastro').reset()
    }catch(err){
        setErro("Erro ao criar conta" + err.message)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault(); // previne o recarregamento da página

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      setUser(user.displayName); // definimos o nome do usuário no App
      setErro(""); // limpa erro
    } catch (err) {
      setErro("Erro ao fazer login: " + err.message);
    }
  };

  const handleLogout = async (e) =>{
    try{
      await signOut(auth);
      setUser("");
      document.querySelector('.modalLogout').style.display = "none"
    }catch(err){
      alert("Erro ao deslogar " + err.message)
    }
  }

  function abrirModal(){
    let open = document.querySelector('.modalCriarConta');
    open.style.display = "block";
  }

  function fecharModal(){
    let open = document.querySelector('.modalCriarConta');
    open.style.display = "none";
  }

  function abrirModalUpload(){
    document.querySelector('.modalUpload').style.display = "block";
  }

  function fecharModalUpload(){
    document.querySelector('.modalUpload').style.display = "none";
  }

  function abrirModalLogout(){
    document.querySelector('.modalLogout').style.display = "block";
  }

  function fecharModalLogout(){
    document.querySelector('.modalLogout').style.display = "none";
  }

  const handleUpload = async (e)=>{
    e.preventDefault();

    if(!imagem || !titulo){
      alert("Preencha o titulo e escolha uma imagem.")
      return;
    }

    const imagemRef = ref(storage, `imagens/${imagem.name}`);

    try{
      await uploadBytes(imagemRef, imagem);
      const imagemUrl = await getDownloadURL(imagemRef);

      await addDoc(collection(db, "posts"), {
        titulo:titulo,
        imagem: imagemUrl,
        userName: user,
        timestamp: serverTimestamp(),
      });

      alert("Post enviado com sucesso!");
      setTitulo("");
      setImagem(null)
      document.querySelector('.modalUpload').style.display ="none"
    }catch(err){
      alert("Erro ao Fazer Upload " + err.message);
    }
  }

  return (

    <div className="header">
  <div className="center">
    
    <div className="header__logo">
      <img
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt="Instagram Logo"/>
    </div>
      
      
        {
           user ?(
            <div className="header__logadoInfo">
            <span>Olá, <b>{user}</b></span>
            <a onClick={abrirModalUpload} href="#">Postar</a>
            <a onClick={abrirModalLogout}>Deslogar</a>
          </div>    
            ):(
        <form className="header__loginForm" onSubmit={handleLogin}>
            <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            />
            <input type="submit" value="Login" />
            <a onClick={abrirModal} href="#">Criar conta</a>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
        </form>
            )}
        
    </div>

    <div className="modalLogout">
      <div className="logoutOptions">
        <h2>Tem certeza?</h2>
        <button name="sair" onClick={handleLogout}>Sair</button>
        <button name="cancelar" onClick={fecharModalLogout}>Cancelar</button>
      </div>
    </div>

    
    <div className="modalCriarConta">
      <form className="formCriarConta" onSubmit={handleCadastro}>
        <h2>Criar Conta</h2>
        
        <div onClick={fecharModal} className="closeModalCriar">X</div>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input type="submit" value="Cadastrar" />
      </form>
    </div>

    <div className="modalUpload">
      <form className="formUpload" onSubmit={handleUpload}>
        <h2>Fazer Postagem</h2>
        <div onClick={fecharModalUpload} className="fecharModalUpload">X</div>

          <input
            type="text"
            placeholder="Título do Post"
            value={titulo}
            onChange={(e)=> setTitulo(e.target.value)}/>

          <input
            type="file"
            onChange={(e)=> setImagem(e.target.files[0])}/>

          <input type="submit"  value={"Postar"}/>
      </form>
    </div>

  
</div>



  );
}

export default Header;
