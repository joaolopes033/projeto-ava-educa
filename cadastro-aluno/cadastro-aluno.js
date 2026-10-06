import { protegerPagina, montarLayout } from "../js/app.js";
import { Aluno } from "../js/Aluno.js";
import { cadastrarAluno } from "../js/alunos.js";

const usuario = protegerPagina();

if (usuario !== null) {
    montarLayout(usuario);
    iniciarFormulario();
}

function iniciarFormulario() {
    const idsObrigatorios = [
        "nome", "genero", "dataNascimento", "cpf", "telefone", "email",
        "cep", "cidade", "estado", "logradouro", "numero", "bairro"
    ];
    const idsTodos = idsObrigatorios.concat(["complemento"]);

    const mensagemFormulario = document.getElementById("mensagem-formulario");
    const botaoSalvar = document.getElementById("botao-salvar");
    const campoCep = document.getElementById("cep");

    function somenteNumeros(valor) {
        for (let i = 0; i < valor.length; i++) {
            if (!"0123456789".includes(valor[i])) {
                return false;
            }
        }
        return true;
    }

    function obrigatorio(valor) {
        if (valor.trim() === "") {
            return "Campo obrigatório.";
        }
        return "";
    }

    const validacoes = {
        nome: (valor) => {
            const nome = valor.trim();
            if (nome === "") {
                return "Campo obrigatório.";
            }
            if (nome.length < 4) {
                return "O nome deve ter no mínimo 4 caracteres.";
            }
            if (nome.length > 80) {
                return "O nome deve ter no máximo 80 caracteres.";
            }
            return "";
        },
        genero: obrigatorio,
        dataNascimento: (valor) => {
            if (valor.trim() === "") {
                return "Campo obrigatório.";
            }
            const data = moment(valor, "DD/MM/YYYY", true);
            if (!data.isValid()) {
                return "Data inválida. Use o padrão DD/MM/YYYY.";
            }
            if (!data.isAfter(moment("01/01/1900", "DD/MM/YYYY"))) {
                return "A data deve ser maior que 01/01/1900.";
            }
            if (!data.isBefore(moment())) {
                return "A data deve ser menor que a data atual.";
            }
            return "";
        },
        cpf: (valor) => {
            if (valor === "") {
                return "Campo obrigatório.";
            }
            if (!somenteNumeros(valor) || valor.length !== 11) {
                return "O CPF deve ter 11 números.";
            }
            return "";
        },
        telefone: (valor) => {
            if (valor === "") {
                return "Campo obrigatório.";
            }
            if (!somenteNumeros(valor) || valor.length < 10) {
                return "O telefone deve ter 10 ou 11 números.";
            }
            return "";
        },
        email: (valor) => {
            if (valor.trim() === "") {
                return "Campo obrigatório.";
            }
            if (!valor.includes("@") || !valor.includes(".")) {
                return "E-mail inválido.";
            }
            return "";
        },
        cep: (valor) => {
            if (valor === "") {
                return "Campo obrigatório.";
            }
            if (!somenteNumeros(valor) || valor.length !== 8) {
                return "O CEP deve ter 8 números.";
            }
            return "";
        },
        cidade: obrigatorio,
        estado: obrigatorio,
        logradouro: obrigatorio,
        numero: (valor) => {
            if (valor === "") {
                return "Campo obrigatório.";
            }
            if (!somenteNumeros(valor)) {
                return "O número deve conter apenas dígitos.";
            }
            return "";
        },
        bairro: obrigatorio
    };

    function mostrarErro(id, texto) {
        document.getElementById(id).classList.add("campo-invalido");
        document.getElementById("erro-" + id).textContent = texto;
    }

    function limparErro(id) {
        document.getElementById(id).classList.remove("campo-invalido");
        document.getElementById("erro-" + id).textContent = "";
    }

    function validarCampo(id) {
        const valor = document.getElementById(id).value;
        const texto = validacoes[id](valor);
        if (texto !== "") {
            mostrarErro(id, texto);
            return false;
        }
        limparErro(id);
        return true;
    }

    function mostrarMensagem(texto, tipo) {
        mensagemFormulario.textContent = texto;
        mensagemFormulario.classList.remove("oculto");
        mensagemFormulario.classList.remove("mensagem-erro");
        mensagemFormulario.classList.remove("mensagem-sucesso");
        mensagemFormulario.classList.add("mensagem-" + tipo);
    }

    function esconderMensagem() {
        mensagemFormulario.classList.add("oculto");
    }

    idsObrigatorios.forEach((id) => {
        document.getElementById(id).addEventListener("blur", () => {
            validarCampo(id);
        });
    });

    campoCep.addEventListener("blur", () => {
        const cep = campoCep.value;
        if (cep.length !== 8 || !somenteNumeros(cep)) {
            return;
        }

        fetch("https://viacep.com.br/ws/" + cep + "/json/")
            .then((resposta) => resposta.json())
            .then((dados) => {
                if (dados.erro) {
                    mostrarMensagem("CEP não encontrado. Preencha o endereço manualmente.", "erro");
                    return;
                }

                document.getElementById("cidade").value = dados.localidade;
                document.getElementById("estado").value = dados.uf;
                document.getElementById("logradouro").value = dados.logradouro;
                document.getElementById("bairro").value = dados.bairro;
                document.getElementById("complemento").value = dados.complemento;

                limparErro("cidade");
                limparErro("estado");
                limparErro("logradouro");
                limparErro("bairro");
                esconderMensagem();
            })
            .catch(() => {
                mostrarMensagem("Não foi possível consultar o CEP. Preencha o endereço manualmente.", "erro");
            });
    });

    botaoSalvar.addEventListener("click", () => {
        esconderMensagem();

        let tudoValido = true;
        idsObrigatorios.forEach((id) => {
            if (!validarCampo(id)) {
                tudoValido = false;
            }
        });

        if (!tudoValido) {
            mostrarMensagem("Corrija os campos destacados antes de salvar.", "erro");
            return;
        }

        const dataNascimento = moment(document.getElementById("dataNascimento").value, "DD/MM/YYYY")
            .format("YYYY-MM-DD");

        const aluno = new Aluno({
            nome: document.getElementById("nome").value.trim(),
            genero: document.getElementById("genero").value,
            dataNascimento: dataNascimento,
            cpf: document.getElementById("cpf").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value.trim(),
            cep: document.getElementById("cep").value,
            cidade: document.getElementById("cidade").value.trim(),
            estado: document.getElementById("estado").value.trim(),
            logradouro: document.getElementById("logradouro").value.trim(),
            numero: document.getElementById("numero").value,
            complemento: document.getElementById("complemento").value.trim(),
            bairro: document.getElementById("bairro").value.trim()
        });

        cadastrarAluno(aluno)
            .then((mensagem) => {
                mostrarMensagem(mensagem, "sucesso");
                idsTodos.forEach((id) => {
                    document.getElementById(id).value = "";
                });
            })
            .catch((mensagem) => {
                mostrarMensagem(mensagem, "erro");
            });
    });
}
