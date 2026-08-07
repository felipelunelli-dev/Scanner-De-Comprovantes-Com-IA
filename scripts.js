let total = 0;

async function lerFoto() {
    const foto = document.querySelector(".foto").files[0];

    if (!foto) {
        alert("Selecione uma foto do comprovante.");
        return;
    }

    const botao = document.querySelector("button");

    try {
        if (botao) {
            botao.disabled = true;
            botao.innerText = "Lendo comprovante...";
        }

        // ==============================
        // PREPARAR FOTO
        // ==============================

        const formData = new FormData();
        formData.append("foto", foto);

        // ==============================
        // ENVIAR PARA PUTER WORKER
        // ==============================

        const resposta = await fetch(
            "https://scanner.puter.work/scanner",
            {
                method: "POST",
                body: formData
            }
        );

        // ==============================
        // RECEBER RESULTADO
        // ==============================

        const dados = await resposta.json();

        console.log("Resposta do Worker:", dados);

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Erro ao analisar comprovante."
            );
        }

        // ==============================
        // VALIDAR DADOS
        // ==============================

        const estabelecimento =
            dados.estabelecimento || "Estabelecimento não identificado";

        const categoria =
            dados.categoria || "💸 Outros";

        const itens =
            Array.isArray(dados.itens) ? dados.itens : [];

        let valorTotal = Number(dados.total);

        if (isNaN(valorTotal)) {
            valorTotal = 0;
        }

        // ==============================
        // MONTAR ITENS
        // ==============================

        let itensHTML = "";

        if (itens.length > 0) {
            itens.forEach(item => {

                const nome =
                    item.nome || "Item não identificado";

                let valor =
                    Number(item.valor);

                if (isNaN(valor)) {
                    valor = 0;
                }

                itensHTML += `
                    <p>
                        ${nome}
                        — R$ ${valor.toFixed(2).replace(".", ",")}
                    </p>
                `;
            });

        } else {
            itensHTML = `
                <p>
                    Nenhum item identificado
                </p>
            `;
        }

        // ==============================
        // MOSTRAR NA TELA
        // ==============================

        document.querySelector(".lista").innerHTML += `
            <div class="comprovante">

                <div class="categoria">
                    ${categoria}
                </div>

                <h3>
                    ${estabelecimento}
                </h3>

                <div class="itens">
                    ${itensHTML}
                </div>

                <div class="total-nota">
                    Total da nota:
                    R$ ${valorTotal.toFixed(2).replace(".", ",")}
                </div>

            </div>
        `;

        // ==============================
        // SOMAR TOTAL GERAL
        // ==============================

        total += valorTotal;

        document.querySelector(".total-gasto").innerHTML =
            "R$ " + total.toFixed(2).replace(".", ",");

    } catch (erro) {

        console.error("Erro:", erro);

        alert(
            "Não foi possível ler o comprovante."
        );

    } finally {

        if (botao) {
            botao.disabled = false;
            botao.innerText = "Escanear comprovante";
        }
    }
}