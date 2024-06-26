const images = [
    { src: 'img/imgTodos.jpeg', text: `Com a intenção de aumentar a praticidade e reduzir o tempo gasto durante um empréstimo de um livro, o Rodrigo Tomaz, aluno do curso Técnico em Informática da própria escola ( E. E. Técnico Industrial Professor Fontes ) teve a brilhante ideia de colocar em prática um projeto onde abrange a ideia de criar um site do zero com utilidade de cortar o uso de papéis e registrar os empréstimos.<br><br>Essa ideia chamou atenção dos alunos, onde todos toparam o desafio, com intuito também de utilizar como apresentação para o projeto final ( TCC ).<br><br>Utilizamos linguagens de programações e hipertextos através das matérias e temas abordados no decorrer do curso, o que ajudou no desempenho dos alunos. Foram divididos vários grupos com funções definidas, para no fim chegar no mesmo objetivo, o site pronto.` , email: 'suporte.controledelivros@gmail.com'},
    { src: 'img/imgDesing.jpeg', title: 'Equipe de Design', text: `A equipe de design, integrada por Henrique, Davi e Vander foi a responsável pela primeira parte visual do projeto, criando do zero os mínimos detalhes de como deveria ser feito o site, utilizando cores suaves e entregando um visual simples e prático que favorecesse a bibliotecária.<br><br>As páginas criadas foram todas projetadas separadamente para que fizéssemos por parte, Davi foi quem declarou que a cor fosse mais voltado para o preto e cinza, para que não tivesse cores na qual cansasse as vistas, e o leve escolhido tom de verde por votação unânime da turma.`},
    { src: 'img/imgFront.jpeg', title: 'Equipe de Front-end ', text: `A equipe de front-end, integrada por Anthony, Dalton, Ícaro e Wallace foi a responsável pelo desenvolvimento da parte visual do projeto, criando a partir da base feita pela equipe de design, mencionada anteriormente.<br><br>As páginas foram criadas utilizando as linguagens de hipertexto HTML, CSS e JavaScript, visando chegar o mais próximo possível das páginas prontas do design.`},
    { src: 'img/imgBack.jpeg', title: 'Equipe de Back-end', text: `A equipe de back-end, integrada por Rodrigo, Marcos e William foi a responsável pela parte lógica do projeto, criando do zero os mínimos detalhes de como deveria ser feito o sistema.<br><br>A API foi desenvolvida com a linguagem JAVA ultilizando o Framework  Spring Boot, onde foi feito a ligação com as páginas Web feitas pelo front-end.`},
    { src: 'img/imgBd.jpeg', title: 'Equipe de Banco de Dados ', text: `A equipe de banco de dados, integrada por Álvaro, Paulo, Odaide e Matheus foi a responsável pela criação do mesmo, onde seria armazenado as informações do projeto.<br><br>Foram criadas tabelas no MYSQL, conforme as informações fornecidas pela bibliotecária, iniciando com uma estrutura básica, contemplando dados como títulos, autores e categorias, em seguida colaboramos com as demais equipes para entregar as tabelas para que o sistema seja feita.`,},
    { src: 'img/imgComunicacao.jpeg', title: 'Equipe de Comunicação ', text: 'A equipe de comunicação, composta por Ana, Caua, Pablo e Cássia, foi responsável por intermediar a comunicação entre a bibliotecária e os grupos de desenvolvimento. Eles consultaram a bibliotecária sobre suas necessidades e preferências para a aplicação, incluindo a quantidade de livros e a aparência visual do sistema.'},
    
];

let currentIndex = 0;

const imageElement = document.getElementById('image-sobre');
const textElement = document.getElementById('text-sobre');
const nextButton = document.getElementById('next-btn-sobre');
const prevButton = document.getElementById('prev-btn-sobre');
const emailElement = document.getElementById('email-sobre');

function updateContent() {
    const { src, text, title, email } = images[currentIndex];
    imageElement.src = src;
    textElement.innerHTML = (title ? `<h2>${title}</h2>` : '') + text.split('<br>').map(line => `<p style="text-indent: 20px;">${line}</p>`).join('');
    emailElement.textContent = email;
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateContent();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateContent();
});

updateContent();
/** */
function goToMain() {
    location.replace('main.html');
}

function goToIndex() {
    // Simula o encerramento da sessão ao voltar para o index
    localStorage.removeItem('session');
    location.replace('index.html');
}

function checkSession() {
    // Verifica se a sessão está ativa
    if (!localStorage.getItem('session')) {
        location.replace('index.html');
    }
}