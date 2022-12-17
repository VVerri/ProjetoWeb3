const url_moeda = "https://brapi.dev/api/v2/currency/available?search=";
const url_par = "https://brapi.dev/api/v2/currency?currency=";

//Busca para convesão disponível, primeiro botão que mostra todas as conversões 
// possíveis para tal moeda pesquisada

  document.querySelector(".searchBtn").addEventListener("click", function () {
    var container = document.querySelector(".box-logado");
    container.innerHTML = "";
    var moeda = document.querySelector("#inpbusca").value;
      axios.get(url_moeda + moeda)
      .then(Response => {
        const data = Response.data.currencies;
        //Limpa Container
        var container = document.querySelector('.box-logado');
        container.innerHTML = "";
        //Limpa Input
        document.querySelector("#inpbusca").value = "";
        //Exibe até 6 valores encontrados que batam com a busca
        for (var i = 0; i < data.length && i < 6; i++) {

          var ul = document.createElement('ul');
              ul.innerHTML = "";

          var li = document.createElement('li');
              li.classList.add('searchResult')
              li.innerHTML = data[i].name;

          var nomes = document.createElement('p');
              nomes.classList.add('searchResult')
              nomes.innerHTML = data[i].currency; 

          container.appendChild(ul);
          container.appendChild(li);
          li.appendChild(nomes);
        }
      })
      .catch(error => {
        console.log(error);
        //Limpa Container
        var container = document.querySelector('.box-logado');
        container.innerHTML = "";
        //Limpa Input
        document.querySelector("#inpbusca").value = "";
        var erro = document.createElement('p');
            erro.classList.add('searchError');
            erro.innerHTML = '⚠️Erro de busca⚠️ <br> Para buscar conversão disponível, <br> digite apenas uma moeda (ex:BRL)';

        container.appendChild(erro);
      })
  });

//Busca para pares de conversão, segundo botão que mostra o par requerido,
// o valor de conversão e a data e hora da ultima atualização

  document.querySelector(".pairBtn").addEventListener("click", function () {
    var container = document.querySelector(".box-logado");
    container.innerHTML = "";
    var moeda = document.querySelector("#inpbusca").value;
      axios.get(url_par + moeda)
      .then(Response => {
        const data = Response.data.currency;
        //Limpa Container
        var container = document.querySelector('.box-logado');
        container.innerHTML = "";
        //Limpa Input
        document.querySelector("#inpbusca").value = "";
        //Exibe o valor de data disponível
        for (var i = 0; i < data.length; i++) {

          var ul = document.createElement('ul');
              ul.innerHTML = "";

          var names = document.createElement('p');
              names.classList.add('searchResultPar')
              names.innerHTML = '✅ '+ data[i].name;

          var price = document.createElement('p');
              price.classList.add('searchResultParComplement')
              price.innerHTML = '🪙1 ' + data[i].fromCurrency +' equivale a '+ data[i].askPrice + ' ' + data[i].toCurrency; 

          var datahrs = document.createElement('p');
              datahrs.classList.add('searchResultParComplement')
              datahrs.innerHTML = 'Ultima atualização: '+ data[i].updatedAtDate + ' ⏰ horário';

          container.appendChild(ul);
          container.appendChild(names);
          names.appendChild(price);
          names.appendChild(datahrs);
        }
      })
      .catch(error => {
        console.log(error);
        //Limpa Container
        var container = document.querySelector('.box-logado');
        container.innerHTML = "";
        //Limpa Input
        document.querySelector("#inpbusca").value = "";
        var erro = document.createElement('p');
            erro.classList.add('searchError');
            erro.innerHTML = '⚠️Erro de busca⚠️ <br> Para buscar o par tente não utilizar espaços ou verificar a moeda escrita (ex:BTC-BRL)';

        container.appendChild(erro);
      })
  });
      