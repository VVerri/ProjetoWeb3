let registerReq = new XMLHttpRequest();

//register realizado com XMLHttpRequest
function register() {

  const username = document.getElementById('username').value;
  const emailReg = document.getElementById('emailReg').value;
  const password = document.getElementById('senhaReg').value;
  const confirmpassword = document.getElementById('confSenhaReg').value;
  const adm = document.getElementById('opt-adm').value;
  const normal = document.getElementById('opt-con').value;


  if (validation(username, emailReg, password, confirmpassword, adm, normal)) {

    let data = {
      username,
      emailReg,
      password,
      confirmpassword,
      adm,
      normal

    }
    registerReq.open('POST', 'https://projetoweb3-victorverri.herokuapp.com/users/register', true);
    registerReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    registerReq.onreadystatechange = function () {
      //Verifica o status de resposta para logar
      if (registerReq.readyState === 4 && registerReq.status === 200) {
        //salva no localStorage o token e o register = 1 para manter a sessão ativa no refresh
        localStorage.setItem('token', JSON.parse(registerReq.responseText).token)
        localStorage.setItem('register', 1);
        showLogado();
        
      } else if (registerReq.status === 400) {
        //Erro de register
        document.getElementsByClassName('email-erro')[0].style.display = 'flex'
        document.getElementsByClassName('email-erro')[0].textContent = '⚠ Registro inválido ⚠'
      }
    }
    registerReq.send(JSON.stringify(data));
  }
}

function validation(username, emailReg, password, confirmpassword, adm, normal) {
  //Verifica se o email é maior que 3 caracteres
  if (emailReg.length < 3) {
    //Se o e-mail e senha estão validados acima de 3 caracteres
    if (password.length < 3) {
      document.getElementsByClassName('senha-erro')[0].style.display = 'none'
      document.getElementsByClassName('email-erro')[0].style.display = 'flex'
      document.getElementsByClassName('email-erro')[0].textContent = '⚠ E-mail e senha inválidos ⚠'
    }else {
      //Erro de validação apenas no e-mail
      document.getElementsByClassName('senha-erro')[0].style.display = 'none'
      document.getElementsByClassName('email-erro')[0].style.display = 'flex'
      document.getElementsByClassName('email-erro')[0].textContent = '⚠ E-mail inválido ⚠'
    }  
    return false
  }
  else if (password.length < 3) {
    //Erro de validação apenas na senha
    document.getElementsByClassName('email-erro')[0].style.display = 'none'
    document.getElementsByClassName('senha-erro')[0].style.display = 'flex'
    document.getElementsByClassName('senha-erro')[0].textContent = '⚠ Senha inválida ⚠'
    return false
  }
  return true
}

//Funcionamento do botão de register do modal
const entrar = document.getElementsByClassName('register-btn')[0];
entrar.addEventListener('click', register);


