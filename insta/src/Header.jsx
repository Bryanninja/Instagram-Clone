import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import logo from './assets/image.png';

function Header({user, setUser}){

  /*

  const auth = getAuth();
  const [progress,setProgress] = useState(0);
  const [file, setFile] = useState(null)

    useEffect(()=>{
   
    },[])



   function criarConta(e){
      e.preventDefault()
      let email = document.getElementById('email-cadastro').value
      let username = document.getElementById('username-cadastro').value
      let senha = document.getElementById('senha-cadastro').value
      //criar conta firebase

      createUserWithEmailAndPassword(auth,email,senha)
      .then((userCredential)=>{
        const user = userCredential.user;
        updateProfile(user, {
          displayName:username
        })
        alert("Conta criada com sucesso!");
        let modal = document.querySelector('.modalCriarConta');
        modal.style.display="none";
      }).catch((error)=>{
        alert(error.message);
      })
    }

    function logar(e){
      e.preventDefault()
      let email = document.getElementById('email-login').value
      let senha = document.getElementById('senha-login').value

      signInWithEmailAndPassword(auth,email,senha)
      .then((authUser)=>{
        setUser(authUser.user.displayName);
        alert('logado com sucesso')
      }).catch((error)=>{
        alert(error.message);
      })
    }

    function abrirModalCriarConta(e){
      e.preventDefault();
      let modal = document.querySelector('.modalCriarConta');
      modal.style.display="block";
          
    }

    function fecharModalCriar(){
      let modal = document.querySelector('.modalCriarConta');
      modal.style.display="none"; 
    }

    function abrirModalUpload(e){
      e.preventDefault();
      let modal = document.querySelector('.modalUpload');
      modal.style.display="block"; 
    }

    function fecharModalUpload(){
      let modal = document.querySelector('.modalUpload');
      modal.style.display="none";  
    }

    function uploadPost(e){
     e.preventDefault();
     let tituloPost = document.getElementById('titulo-upload').value;
     let progressEl = document.getElementById('progress-upload');
     alert(tituloPost)
    }

    */


    return(

      <div className="header">

            
        <div className="center">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
          </div>
          {
            (user)?
              <div className="header__logadoInfo">
                  <span>Olá, <b>{user}</b></span>
                  <a href="#">Postar</a>
                </div>
              :
              <div className="header__loginForm">
            <form>
              <input id="email-login" type="text" placeholder="Login.." />
              <input id="senha-login" type="password" placeholder="Senha.." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn__criarConta">
              <a href="#">Criar Conta!</a>
            </div>
          </div>
            
          }

      

        </div>

</div>

      /*
          <div className="header">

            <div className="modalCriarConta">
              <div className="formCriarConta">
                <div onClick={()=>fecharModalCriar()} className="closeModalCriar">X</div>
                <h2>Crie sua Conta</h2>
                  <form onSubmit={(e)=>criarConta(e)}>
                    <input id="email-cadastro" type="text" placeholder="Seu e-mail.." />
                    <input id="username-cadastro" type="text" placeholder="Seu Nomde de usuario.." />
                    <input id="senha-cadastro" type="password" placeholder="Sua senha.."/>
                    <input type="submit" value='Cadastrar' />
                  </form>  
              </div>
            </div>

            <div className="modalUpload">
              <div className="formUpload">
                <div onClick={()=>fecharModalUpload()} className="fecharModalUpload">X</div>
                <h2>Fazer Upload</h2>
                  <form onSubmit={(e)=>uploadPost(e)}>
                    <progress id="progress-upload" value={progress}></progress>
                    <input id="titulo-upload" type="text" placeholder="Nome da sua foto.." />
                    <input onChange={(e)=>setFile(e.target.files[0])} type="file" name="file" />
                    <input type="submit" value="Postar no Instagram" />

                  </form>  
              </div>
            </div>

            

        <div className="center">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
          </div>
          {
            (user)?
              <div className="header__logadoInfo">
                  <span>Olá, <b>{user}</b></span>
                  <a onClick={(e)=>abrirModalUpload(e)} href="#">Postar</a>
                </div>
              :
              <div className="header__loginForm">
            <form onSubmit={(e)=>logar(e)}>
              <input id="email-login" type="text" placeholder="Login.." />
              <input id="senha-login" type="password" placeholder="Senha.." />
              <input type="submit" name="acao" value="Logar" />
            </form>
            <div className="btn__criarConta">
              <a onClick={(e)=>abrirModalCriarConta(e)} href="#">Criar Conta!</a>
            </div>
          </div>
            
          }

      

        </div>

</div>

*/


    );
}

export default Header;