const perguntas = [
function iniciarJogo() {
    telaInicio.classList.remove("ativa");
    telaQuiz.classList.add("ativa");

    carregarPergunta();
}

function carregarPergunta() {
    respostasElemento.innerHTML = "";

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;

    contador.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pergunta.respostas.forEach(resposta => {
        const botao = document.createElement("button");

        botao.textContent = resposta;

        botao.onclick = () => verificarResposta(botao, resposta);

        respostasElemento.appendChild(botao);
    });
}

function verificarResposta(botao, resposta) {
    const correta = perguntas[perguntaAtual].correta;

    const botoes = respostasElemento.querySelectorAll("button");

    botoes.forEach(btn => btn.disabled = true);

    if (resposta === correta) {
        botao.classList.add("correta");
        pontuacao++;
    } else {
        botao.classList.add("errada");

        botoes.forEach(btn => {
            if (btn.textContent === correta) {
                btn.classList.add("correta");
            }
        });
    }

    setTimeout(() => {
        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            mostrarResultado();
        }
    }, 1200);
}

function mostrarResultado() {
    telaQuiz.classList.remove("ativa");
    telaFinal.classList.add("ativa");

    pontuacaoFinal.textContent = `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
}

function reiniciarJogo() {
    perguntaAtual = 0;
    pontuacao = 0;

    telaFinal.classList.remove("ativa");
    telaInicio.classList.add("ativa");
}