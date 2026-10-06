import { protegerPagina, montarLayout } from "../js/app.js";
import { listarCursos } from "../js/cursos.js";

const usuario = protegerPagina();

if (usuario !== null) {
    montarLayout(usuario);

    const areaCartoes = document.getElementById("cartoes");
    const mensagemCursos = document.getElementById("mensagem-cursos");

    listarCursos(usuario)
        .then((cursos) => {
            cursos.forEach((curso) => {
                const cartao = document.createElement("article");
                cartao.classList.add("cartao");

                const titulo = document.createElement("h2");
                titulo.textContent = curso.nomeCurso;

                const dataInicio = document.createElement("p");
                dataInicio.textContent = "Início: " + moment(curso.dataInicio).format("DD/MM/YYYY");

                const dataFim = document.createElement("p");
                dataFim.textContent = "Fim: " + moment(curso.dataFim).format("DD/MM/YYYY");

                cartao.appendChild(titulo);
                cartao.appendChild(dataInicio);
                cartao.appendChild(dataFim);
                areaCartoes.appendChild(cartao);
            });
        })
        .catch((mensagem) => {
            mensagemCursos.textContent = mensagem;
            mensagemCursos.classList.remove("oculto");
        });
}
