import { alunos } from "../dados/listagem-alunos.js";

export function cadastrarAluno(aluno) {
    return new Promise((resolve, reject) => {
        if (!aluno) {
            reject("Erro ao cadastrar o aluno");
            return;
        }

        let maiorId = 0;
        alunos.forEach((item) => {
            if (item.id > maiorId) {
                maiorId = item.id;
            }
        });

        aluno.id = maiorId + 1;
        alunos.push(aluno);
        resolve("Aluno cadastrado com sucesso!");
    });
}
