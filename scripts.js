/* 
Variável - Um pedacinho da memória do computador
que eu guardo o que eu quiser
let 
console.log() - Mostra algo na tela

Função - Pedacinho de código QUE
Só executa QUANDO eu CHAMO ELA

Lógica de Programação - Pensar como computador pensa
Algoritmo - Receita de bolo

[x] Carregar a foto
[x] Falar QUAL FOTO eu vou carregar  
[x] Salva a foto  
[x] Enviar para a IA foto + orientação
[x] Receber a resposta da IA  
[x] Formatar a resposta
[x] Colocar na tela   
[ ] Estilizar a lista
     
document = HTML
querySelector = Selecionar um elemento do HTML
innerHTML = Colocar algo dentro do HTML
*/

let pedido = 'Olhe a foto deste comprovante e responda em UMA linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentro de <strong>, e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaço: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 💊 Saúde, 🎉 Lazer, 🏠 Casa, 💸 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão — R$ 5,00<br>Leite — R$ 4,50|9.50';
let total = 0

async function lerFoto(){
    // Pegar a foto do input
    let foto = document.querySelector(".foto").files[0]

    // Chamada Assincrona
    // Estou pegando a INFO e estou enviando para a IA
    let resposta = await puter.ai.chat(pedido, foto)

    // Pegar a resposta da IA e filtrar para mostrar na tela
    let texto = resposta.message.content
    let partes = texto.split("|")
    console.log(partes)

    // Colocar na tela
    document.querySelector(".lista").innerHTML += `
        <div class="comprovante">

            <div class="itens">${partes[0]}</div>

            <div class="total-nota">Total da nota: R$ ${partes[1]}</div>

        </div>
    `

    total += Number(partes[1])
    document.querySelector(".total-gasto").innerHTML = "R$" + total.toFixed(2)
    console.log(".total-gasto")
}