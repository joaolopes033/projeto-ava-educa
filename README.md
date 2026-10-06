# AVA-EDUCA+

Protótipo de um ambiente virtual de aprendizagem (AVA) feito com HTML, CSS e JavaScript puro, como projeto avaliativo do Módulo 01 (Front-End).

## Descrição e problema que resolve

Uma empresa de educação profissional tinha os dados de cursos e alunos espalhados em vários sistemas e planilhas, o que dificultava o acompanhamento pedagógico. O AVA-EDUCA+ centraliza essas informações em um único lugar:

- login de professores;
- dashboard com os cursos em que o usuário logado atua;
- cadastro de alunos com busca automática de endereço pelo CEP;
- boa experiência em computadores e celulares.

## Técnicas e tecnologias

| Área        | O que foi usado                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Estrutura   | HTML5 com tags semânticas (header, nav, main, section, article), formulários, fieldset, label, select        |
| Estilo      | CSS3, Flexbox (cabeçalho, menu e formulários), CSS Grid (layout geral e cards), Media Query (responsividade) |
| Lógica      | Variáveis, condicionais, operadores lógicos, laços, funções, arrow functions, arrays, objetos                |
| POO         | Classe `Aluno` com `constructor`                                                                             |
| Assíncrono  | Promises (`resolve` e `reject`), `then`, `catch` e `fetch`                                                   |
| Módulos     | `export` e `import`, com `"type": "module"` no `package.json`                                                |
| Navegador   | DOM, eventos de mouse e foco, `sessionStorage`, `window.alert`, Navigation API                               |
| Biblioteca  | Moment.js via CDN (validação e formatação de datas)                                                          |
| API externa | ViaCEP (busca de endereço pelo CEP)                                                                          |

> **Nota:** Foi utilizada inteligência artificial para auxiliar na criação e refinamento do CSS, estilos e responsividade do projeto.

## Estrutura do projeto

```
ava-educa/
├── index.html
├── login/
│   ├── login.html
│   ├── login.js
│   └── login.css
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.js
│   └── dashboard.css
├── cadastro-aluno/
│   ├── cadastro-aluno.html
│   ├── cadastro-aluno.js
│   └── cadastro-aluno.css
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── cursos.js
│   ├── alunos.js
│   └── Aluno.js
├── dados/
│   ├── listagem-usuarios.js
│   ├── listagem-cursos.js
│   └── listagem-alunos.js
├── package.json
└── README.md
```

## Como executar

O projeto usa módulos JavaScript, então não funciona abrindo o arquivo direto no navegador. É preciso servir a pasta com um servidor local simples. Não há back-end nem banco de dados.

Opção 1: no VS Code, instale a extensão Live Server, clique com o botão direito no `index.html` e escolha Open with Live Server.

Opção 2: com Node.js instalado, dentro da pasta do projeto:

```
npm start
```

### Usuários para teste

| Email                     | Senha   | Cursos                   |
| ------------------------- | ------- | ------------------------ |
| ana.silva@edutech.com     | 123456  | 6 cursos                 |
| carlos.santos@edutech.com | 654321  | 2 cursos                 |
| mariana.costa@edutech.com | edu2026 | nenhum (mostra mensagem) |