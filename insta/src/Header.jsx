import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import logo from './assets/image.png';
import { auth } from './firebase';

function Header({user, setUser}){


    function abrirModalCriarConta(e){
      e.preventDefault();
      let modal = document.querySelector('.modalCriarConta')
      modal.style.display="block"
    }

    function fecharModalCriar(){
      let modal = document.querySelector('.modalCriarConta')
      modal.style.display="none"
    }

    function criarConta(e){
      e.preventDefault();
      let email = document.getElementById('emailCadastro');
      let username = document.getElementById('usernameCadastro')
      let senha = document.getElementById('senhaCadastro')

      //criar conta firebase
      createUserWithEmailAndPassword(auth, email.value, senha.value)
      .then((authUser)=>{
        const user = authUser.user;
        updateProfile(user,{
          displayName:username.value
        })
         alert("Conta criada com sucesso!");
        let modal = document.querySelector('.modalCriarConta');
        modal.style.display="none";
      }).catch(err =>{
        alert(err.message);
      })
    }

    function logar(e){
      e.preventDefault();

      let email = document.getElementById('email-login');
      let senha = document.getElementById('senha-login');

      signInWithEmailAndPassword(auth, email.value, senha.value)
      .then((auth)=>{
        setUser(auth.user.displayName);
        alert("loagdo com sucesso")
      }).catch(err =>{
        alert(err.message)
      })

    }


    return(

      <div className="header">

        <div className="modalCriarConta">
          <div className="formCriarConta">
            <div onClick={fecharModalCriar} className="closeModalCriar">X</div>
            <h2>Criar Conta</h2>
              <form onSubmit={(e)=>criarConta(e)} action="">
                  <input id="emailCadastro" type="text" placeholder="Seu Email.." />
                  <input id="usernameCadastro" type="text" placeholder="Seu Username.." />
                  <input id="senhaCadastro" type="password" placeholder="Sua Senha.." />
                  <input type="submit" value={'Criar conta'}/>
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
                  <a href="#">Postar</a>
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


    );
}

export default Header;