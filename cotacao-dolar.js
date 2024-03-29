/**
 * @author GILVAN MORAES DE MOURA
 * @version 1.0.5
*/

var url = "https://economia.awesomeapi.com.br/last/USD-BRL";
        var real = null;
        fetch(url).then(response => response.json()).then(
            function(responseData) {
                console.log(responseData);
                var containerCotacao = document.getElementById("cotacao_dolar_widget");
                real = parseFloat(responseData.USDBRL.ask);
                var dataCotacao = new Date(responseData.USDBRL.create_date);
           
                var cotacaoHtml = `
                <style>
                  #input_cotacao_real{
                      font-weight: bold;
                      font-size: 14px;
                      width:230px;
                  }
                  #cotacao_input_dolar{
                    width:230px;
                  }
                  .cotacao_dolar_class_atualizacao{
                      padding: 5px 0px;
                      color: blue;
                  }
                  .cotacao_title{
                    font-size:13px;
                  }
                </style> 
                <label class="cotacao_title">Digite o valor do dólar -  e em seguida aperte ENTER</label>     
                <br><br>         
                <label>Dólar<br>
                <input type="text" value="1" id="cotacao_input_dolar" title="INFORME O VALOR EM REAIS"/>
                </label>
                <br><br>
                <label>Real brasileiro<br>
                <input type="text" value="R$ ${real.toFixed(2)}" id="input_cotacao_real" disabled/>
                </label>                
                <p id="cotacao_dolar_data">Atualizado em:</br><span class="cotacao_dolar_class_atualizacao">${dataCotacao.toLocaleDateString('pt-BR')} ${dataCotacao.getHours()} : ${dataCotacao.getMinutes()}</span></p>
               `;
                containerCotacao.innerHTML = cotacaoHtml;

            }
        ).catch(e => console.log(e));

        setTimeout(function() {
            var inputDolar = document.getElementById("cotacao_input_dolar");
            
            inputDolar.addEventListener("keyup", function() {
                 if(this.value=="" || this.value <= 0){                    
                    inputDolar.style.cssText = "border: 2px solid red;";
                    return;
                 } 
                 var valorInserido = parseFloat(this.value.toString().replace(",","."));        
                   
                 var resultSet = (real * valorInserido).toFixed(2);
                 if(!resultSet){
                    inputDolar.style.cssText = "border: 2px solid red;";
                    return;
                 }
                 document.getElementById("input_cotacao_real").value = `R$ ${resultSet}`;
                 inputDolar.style.cssText = "";
            });
        }, 1000);
