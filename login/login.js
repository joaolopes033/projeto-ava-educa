import { login } from "../js/auth.js";
import { salvarUsuarioLogado } from "../js/app.js";

const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const mensagemLogin = document.getElementById("mensagem-login");
const botaoEntrar = document.getElementById("botao-entrar");
const linkEsqueciSenha = document.getElementById("link-esqueci-senha");

function mostrarMensagem(texto) {
    mensagemLogin.textContent = texto;
    mensagemLogin.classList.remove("oculto");
}

function limparMensagem() {
    mensagemLogin.classList.add("oculto");
    campoEmail.classList.remove("campo-invalido");
    campoSenha.classList.remove("campo-invalido");
}

botaoEntrar.addEventListener("click", () => {
    limparMensagem();

    const email = campoEmail.value;
    const senha = campoSenha.value;

    if (email === "" || senha === "") {
        if (email === "") {
            campoEmail.classList.add("campo-invalido");
        }
        if (senha === "") {
            campoSenha.classList.add("campo-invalido");
        }
        mostrarMensagem("Preencha o email e a senha.");
        return;
    }

    login(email, senha)
        .then((usuario) => {
            salvarUsuarioLogado(usuario);
            navigation.navigate("../dashboard/dashboard.html");
        })
        .catch((mensagem) => {
            campoEmail.classList.add("campo-invalido");
            campoSenha.classList.add("campo-invalido");
            mostrarMensagem(mensagem);
        });
});

linkEsqueciSenha.addEventListener("click", () => {
    window.alert("Funcionalidade em construção.");
});
