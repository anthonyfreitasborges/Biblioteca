// Dados da tabela emprestimos e livros
let emprestimosData = null;
let livrosData = null;
let infoTabela;

document.addEventListener("DOMContentLoaded", function () {
    console.log("O JavaScript está sendo executado!"); // Adicionando um console.log para verificar se o JavaScript está sendo executado corretamente

    const menuIcon = document.querySelector(".menu-icon");
    const closeIcon = document.querySelector(".close-icon");
    const menu = document.querySelector(".menu");

    menuIcon.addEventListener("click", function () {
        menu.classList.add("active"); // Adiciona a classe 'active' no menu
        menuIcon.style.display = "none"; // Oculta o ícone de hamburguer
    });

    closeIcon.addEventListener("click", function () {
        menu.classList.remove("active"); // Remove a classe 'active' do menu
        menuIcon.style.display = "block"; // Exibe o ícone de hamburguer
    });

    // Adicionar evento de clique à imagem para fechar a tabela de empréstimos
    const fecharEmprestados = document.getElementById("fechar-emprestados");
    fecharEmprestados.addEventListener("click", function () {
        const tabelaEmprestados = document.getElementById("tabela-emprestados");
        const info = tabelaEmprestados.querySelector('.INFO-TABELA-EMPRESTIMOS');
        if (info.style.display === 'none') {
            location.reload();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    /*baixar e abrir tutorial*/
    const pdfFileName = 'TUTORIAL.pdf';
    const pdfFilePath = '../pages/documentos/' + pdfFileName;

    document.getElementById('downloadLink').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('buttonsContainer').style.display = 'block';
    });

    document.getElementById('downloadButton').addEventListener('click', function() {
        localStorage.setItem('pdfDownloaded', true);
        const link = document.createElement('a');
        link.href = pdfFilePath;
        link.download = pdfFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        document.getElementById('buttonsContainer').style.display = 'none';
    });

    document.getElementById('openButton').addEventListener('click', function() {
        if (localStorage.getItem('pdfDownloaded')) {
            window.open(pdfFilePath, '_blank');
        } else {
            alert('Por favor, baixe o PDF primeiro.');
        }
        document.getElementById('buttonsContainer').style.display = 'none';
    });



    // Função para exibir e esconder elementos
    function setupToggleVisibility(toggleButtonId, elementId, closeButtonSelector) {
        const toggleButton = document.getElementById(toggleButtonId);
        const element = document.getElementById(elementId);
        const closeButton = element.querySelector(closeButtonSelector);

        toggleButton.addEventListener("click", function () {
            element.style.display = "block";
        });

        closeButton.addEventListener("click", function () {
            element.style.display = "none";
        });
    }

    // Configurações específicas para as tabelas
    function setupTable(toggleButtonId, tableId, closeButtonId, tableType) {
        const toggleButton = document.getElementById(toggleButtonId);
        const table = document.getElementById(tableId);
        const closeButton = document.getElementById(closeButtonId);

        toggleButton.addEventListener("click", function () {
            table.style.display = "block";
            criarTabela(tableType);
        });

        closeButton.addEventListener("click", function () {
            table.style.display = "none";
            // Limpa os dados da tabela ao fechar
            if (tableType === 'emprestimos') {
                emprestimosData = null;
            } else if (tableType === 'livros') {
                livrosData = null;
            }
        });
    }

    //EVENTO CLICK DO ICONE DA LUPA DA TABELA EMPRESTADOS 
    document.getElementById('lupa-button').addEventListener('click', function () {
        var usuarioInput = document.getElementById('encontrarUsuario-input');
        if (usuarioInput.classList.contains('active')) {
            usuarioInput.classList.remove('active');
        } else {
            usuarioInput.classList.add('active');
            usuarioInput.focus();
        }
    });

    document.getElementById('encontrarUsuario-input').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o comportamento padrão do Enter
            this.classList.remove('active');
            const nomeAluno = this.value;
            apagarTabela('table-emprestados');
            buscarEmprestimoNomeAluno(nomeAluno);
        }
    });
    //adicionado a animação da lupa da tabela todos os livros
    document.getElementById('filter-search').addEventListener('click', function() {
        const filterContent = document.querySelector('.filter-content');
        filterContent.classList.toggle('expanded');
    });
    

    //EVENTO DA LUPA DA TABELA LIVROS 
    const teste = document.getElementById('searchTodosLivros');
    teste.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita o comportamento padrão do Enter
            const nomeLivro = this.value;
            this.value = '';
            apagarTabela('table-livros')
            buscarLivroNomeLivro(nomeLivro);
        }
    });

    // Formulário Emprestar Livro
    setupToggleVisibility("icone1", "formulario", "img");

    // Tabela Emprestados
    setupTable("icone2", "tabela-emprestados", "fechar-emprestados", "emprestimos");

    // Tabela Todos os Livros
    setupTable("icone3", "todos-os-livros", "fechar-livros", "livros");

    // Adicionar Livro
    setupToggleVisibility("add-livro", "form-add-livros", "#icone-fechar-form-add");

    // Remover Livro
    setupToggleVisibility("remove-livro-livro", "container-form-remove-form", "#img-fechar-livros");
});

//FETCH PARA BUSCAR (GET) EMPRÉSTIMOS DE LIVROS
async function criarTabela(nomeUrl) {
    try {
        if (nomeUrl === 'emprestimos' && emprestimosData === null) {
            // Busca dados apenas se não estiverem armazenados
            var token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/${nomeUrl}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados da tabela.');
            }

            emprestimosData = await response.json();
        } else if (nomeUrl === 'livros' && livrosData === null) {
            // Busca dados apenas se não estiverem armazenados
            var token = sessionStorage.getItem('token');
            const url = `http://localhost:8080/${nomeUrl}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados da tabela.');
            }

            livrosData = await response.json();
        }

        // Verifica qual tabela está sendo solicitada e cria os elementos se necessário
        if (nomeUrl === 'emprestimos') {
            if (emprestimosData) {
                emprestimosData.forEach(register => {
                    criarElementosTabela('table-emprestados', register.id, register.aluno.nome, register.livro.nomeLivro, register.dataEmprestimo, register.dataDevolucao, register.aluno.turno, register.aluno.turma);
                });
            }
        } else if (nomeUrl === 'livros') {
            if (livrosData) {
                livrosData.forEach(register => {
                    criarElementosTabela('table-livros', register.id, register.nomeLivro, register.nomeAutor, register.numeroExemplares);
                });
            }
        } else {
            console.log("Erro: Tipo de tabela desconhecido");
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}


//função responsável por criar os elementos de qualquer tabela:
async function criarElementosTabela(...args) {
    const tabela = document.querySelector(`.${args[0]}`);
    const corpoTabela = document.createElement('tbody');
    const linhaExistente = tabela.querySelector(`tr[data-id="${args[1]}"]`);

    if (linhaExistente) {
        return; // Retorna se a linha já existir na tabela
    }

    const linha = document.createElement('tr');
    linha.setAttribute('data-id', args[1]); // Define um atributo para identificar a linha

    const numero = args[1];

    if ((numero % 2) === 0) {
        linha.classList.add("linha-branca");
    } else {
        linha.classList.add("linha-cinza");
    }

    if (tabela.className === 'table-emprestados') {
        infoTabela = document.querySelector('.INFO-TABELA-EMPRESTIMOS');
        infoTabela.style.display = 'none';
        for (let i = 2; i <= args.length + 1; i++) {
            const coluna = document.createElement('td');
            if (i === args.length + 1) {
                const botao = document.createElement('button');
                botao.textContent = 'Devolver';
                coluna.classList.add('botao-devolver-container');
                botao.classList.add('botao-devolver');
                botao.addEventListener('click', async function (event) {
                    event.preventDefault();
                    linha.style.backgroundColor = '#9dbd8c';
                    botao.textContent = 'Devolvido';
                    const url = `http://localhost:8080/livros/${args[1]}`;
                    const token = sessionStorage.getItem('token');

                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!response.ok) {
                            alert("Erro na devolução!");
                            return;
                        }

                        await response.json();

                    } catch (error) {
                        console.error("ERRO", error);
                    }
                });
                coluna.appendChild(botao);
                linha.appendChild(coluna);
            } else {
                coluna.textContent = args[i - 1];
                linha.appendChild(coluna);
            }
        }
        corpoTabela.appendChild(linha);
        tabela.appendChild(corpoTabela);
    } else {
        for (let i = 2; i <= args.length; i++) {
            const coluna = document.createElement('td');
            const texto = document.createTextNode(args[i - 1]);
            infoTabela = document.querySelector('.INFO-TABELA-LIVROS');
            infoTabela.style.display = 'none';

            if (i === args.length) {
                const img = document.createElement('img');
                img.src = 'img/mais.png';
                img.style.width = '10px';
                img.style.height = '10px';
                img.style.marginLeft = '20px';
                img.style.cursor = "pointer";

                // Função auxiliar para adicionar o evento e atualizar a quantidade de livros
                const adicionarLivro = async () => {
                    const url = `http://localhost:8080/livros/adicionar/${args[1]}`;
                    const token = sessionStorage.getItem('token');

                    try {
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });

                        if (!response.ok) {
                            alert("Erro na atualização!");
                            return;
                        }

                        const data = await response.json();
                        if (data) {
                            // Atualiza a quantidade de livros na última coluna da linha
                            const quantidadeLivros = parseInt(coluna.textContent);
                            const quantidadeLivrosAtualizada = quantidadeLivros + 1;
                            coluna.textContent = quantidadeLivrosAtualizada;
                            coluna.appendChild(img);
                        }
                    } catch (error) {
                        console.error("ERRO", error);
                    }
                };
                img.addEventListener('click', adicionarLivro);
                coluna.appendChild(texto);
                coluna.appendChild(img);
                linha.appendChild(coluna);
            } else {
                coluna.appendChild(texto);
                linha.appendChild(coluna);
            }
        }
        corpoTabela.appendChild(linha);
        tabela.appendChild(corpoTabela);
    }
}

async function buscarEmprestimoNomeAluno(nomeAluno) {
    const url = `http://localhost:8080/emprestimos/${nomeAluno}`;
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            alert("Erro na busca pelo registro!");
            return;
        }

        const registers = await response.json();
        if (registers.length === 0){
            infoTabela = document.querySelector('.INFO-TABELA-EMPRESTIMOS');
            infoTabela.textContent = 'Não existem empréstimos para este nome'.toUpperCase();
            infoTabela.style.display = 'block';
        } else {
            registers.forEach(register => {
                criarElementosTabela('table-emprestados', register.id, register.aluno.nome, register.livro.nomeLivro, register.dataEmprestimo, register.dataDevolucao, register.aluno.turno, register.aluno.turma);
            })
        }

    } catch (error) {
        console.error("ERRO", error);
    }
}

async function buscarLivroNomeLivro(nomeLivro) {
    const url = `http://localhost:8080/livros/${encodeURIComponent(nomeLivro)}`;
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            alert("Erro na busca do livro!");
            return;
        }

        const registers = await response.json();
        if (registers.length === 0){
            infoTabela = document.querySelector('.INFO-TABELA-LIVROS');
            infoTabela.textContent = 'Não existem livros com este nome'.toUpperCase();
            infoTabela.style.display = 'block';
        } else {
            registers.forEach(register => {
                criarElementosTabela('table-livros', register.id, register.nomeLivro, register.nomeAutor, register.numeroExemplares);    
            })
        }

    } catch (error) {
        console.error("ERRO", error);
    }
}

function apagarTabela(nomeClassTabela){
    const corpoTable = document.querySelectorAll(`.${nomeClassTabela} tbody`);
    corpoTable.forEach(corpo =>{
        corpo.innerHTML = '';
    });
}

/*impedir que a tela volte*/

function goToSobre() {
    location.replace('sobre.html');
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