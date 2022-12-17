function showModal(idModal){
    const modal = document.getElementById(idModal);
    //Adiciona a classe show ao modal para ele vir a aparecer
    if (modal) {
        modal.classList.add('show');
        modal.addEventListener('click', (event) => {
            event.preventDefault()
            //Botão de close funciona para remover a classe show do modal
            if(event.target.className == 'close-modal'){
                modal.classList.remove('show')
                //Limpar os campos de e-mail e senha caso modal fechado
                document.querySelector('#email').value = "";
                document.querySelector('#senha').value = "";
                //Limpa as mensagens de erros anteriores
                document.getElementsByClassName('email-erro')[0].style.display = 'none'
                document.getElementsByClassName('senha-erro')[0].style.display = 'none'
            }
        })
    }
}

//Botção de Acesse sua conta funciona para abrir o modal de login
const loginButton = document.querySelector('#buttonLogin');
loginButton.addEventListener('click', () => {
    showModal('bgModal')
})