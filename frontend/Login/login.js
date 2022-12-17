let loginReq = new XMLHttpRequest();

//Login realizado com XMLHttpRequest
function login() {

  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value

  if (validation(email, password)) {

    let data = {
      email,
      password
    }
    loginReq.open('POST', 'https://reqres.in/api/login', true);
    loginReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    loginReq.onreadystatechange = function () {
      //Verifica o status de resposta para logar
      if (loginReq.readyState === 4 && loginReq.status === 200) {
        //salva no localStorage o token e o login = 1 para manter a sessão ativa no refresh
        localStorage.setItem('token', JSON.parse(loginReq.responseText).token)
        localStorage.setItem('login', 1);
        showLogado();
        
      } else if (loginReq.status === 400) {
        //Erro de login
        document.getElementsByClassName('email-erro')[0].style.display = 'flex'
        document.getElementsByClassName('email-erro')[0].textContent = '⚠ Login inválido ⚠'
      }
    }
    loginReq.send(JSON.stringify(data));
  }
}

function showLogado() {
  //Esconde o modal de login trocando a class show por hide
  var ctr = document.querySelector('.modalCont');
  ctr.className = ctr.className.replace('show', 'hide');
  //Estrutura a pagina para logado e mostrar busca
  document.getElementsByClassName('grid-dir')[0].style.display = 'none';
  document.getElementsByClassName('login')[0].style.display = 'none';
  document.getElementsByClassName('logadoBtn')[0].style.display = 'iniline';
  document.getElementsByClassName('logado')[0].style.display = 'flex';
  document.getElementsByClassName('box-logado')[0].style.display = 'flex';
  document.getElementsByClassName('btnDeslog')[0].style.display = 'flex';
  document.getElementsByClassName('open-account')[0].style.display = 'none'
  document.getElementsByClassName('soma-btn')[0].style.display = 'none'
}

function showDeslogado() {
  //Esconde o modal do login novamente
  var ctr = document.querySelector('.modalCont');
  ctr.className = ctr.className.replace('hide');
  //Limpa os campos de login e senha do modal
  ctr = document.querySelector('#email');
  ctr.value = "";
  ctr = document.querySelector('#senha');
  ctr.value = "";
  //Reestrrutura a pagina como inicial
  document.getElementsByClassName('grid-dir')[0].style.display = 'flex';
  document.getElementsByClassName('login')[0].style.display = 'inline';
  document.getElementsByClassName('logadoBtn')[0].style.display = 'none';
  document.getElementsByClassName('logado')[0].style.display = 'none';
  document.getElementsByClassName('box-logado')[0].style.display = 'none';
  document.getElementsByClassName('btnDeslog')[0].style.display = 'none';
  document.getElementsByClassName('open-account')[0].style.display = 'inline-block'
  document.getElementsByClassName('soma-btn')[0].style.display = 'inline-flex'
}

function validation(email, password) {
  //Verifica se o email é maior que 3 caracteres
  if (email.length < 3) {
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

//Verifica se já há alguma sessão logada prévia
function logado () {
  if (localStorage.getItem("login") == 1 && localStorage.getItem("token")) {
    showLogado();
  }
}

//Verificação para todo refresh
logado();

//Limpa o localStorage e reestrutura a pagina para inicial
function deslogar() {
  localStorage.clear();
  showDeslogado();
}

//Funcionamento do botão logout levando a função deslogar
document.querySelector('.btnDeslog').addEventListener('click', function () {
  deslogar();
});

//Funcionamento do botão de login do modal
const entrar = document.getElementsByClassName('submit-btn')[0];
entrar.addEventListener('click', login);


