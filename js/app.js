export function salvarUsuarioLogado(usuario) {
    const usuarioSessao = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    };
    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioSessao));
}

export function obterUsuarioLogado() {
    const usuario = sessionStorage.getItem("usuarioLogado");
    if (usuario === null) {
        return null;
    }
    return JSON.parse(usuario);
}

export function sair() {
    sessionStorage.removeItem("usuarioLogado");
    navigation.navigate("../login/login.html");
}

export function protegerPagina() {
    const usuario = obterUsuarioLogado();
    if (usuario === null) {
        navigation.navigate("../login/login.html");
    }
    return usuario;
}

export function montarLayout(usuario) {
    const cabecalho = document.getElementById("cabecalho");

    const nomeSistema = document.createElement("span");
    nomeSistema.textContent = "AVA-EDUCA+";
    nomeSistema.classList.add("nome-sistema");

    const nomeUsuario = document.createElement("span");
    nomeUsuario.textContent = usuario.nome;

    cabecalho.appendChild(nomeSistema);
    cabecalho.appendChild(nomeUsuario);

    const menu = document.getElementById("menu");
    menu.innerHTML =
        '<button id="botao-dashboard">Dashboard</button>' +
        '<button id="botao-cursos" disabled>Cursos</button>' +
        '<button id="botao-cadastro">Cadastro de Alunos</button>' +
        '<button id="botao-sair">Sair</button>';

    document.getElementById("botao-dashboard").addEventListener("click", () => {
        navigation.navigate("../dashboard/dashboard.html");
    });

    document.getElementById("botao-cadastro").addEventListener("click", () => {
        navigation.navigate("../cadastro-aluno/cadastro-aluno.html");
    });

    document.getElementById("botao-sair").addEventListener("click", () => {
        sair();
    });
}

if (document.getElementById("pagina-index") !== null) {
    navigation.navigate("login/login.html");
}
