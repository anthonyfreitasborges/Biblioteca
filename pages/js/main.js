// Dados da tabela emprestimos e livros
let emprestimosData = null;
let livrosData = null;

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
});

document.addEventListener("DOMContentLoaded", function () {
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
    let colunaTableEmprestados;
    let botaoTableEmprestados = document.createElement('button');

    if (linhaExistente) {
        return; // Retorna se a linha já existir na tabela
    }

    const linha = document.createElement('tr');
    linha.setAttribute('data-id', args[1]); // Define um atributo para identificar a linha

    const numero = args[1];
    let infoTabela;

    if ((numero % 2) === 0) {
        linha.classList.add("linha-branca");
    } else {
        linha.classList.add("linha-cinza");
    }

    if (tabela.className === 'table-emprestados') {
        infoTabela = document.querySelector('.INFO-TABELA-EMPRESTIMOS');
        infoTabela.style.display = 'none';
        for (let i = 2; i <= args.length + 1; i++) {
            colunaTableEmprestados = document.createElement('td');
            if (i === args.length + 1) {
                botaoTableEmprestados.textContent = 'Devolver';
                colunaTableEmprestados.classList.add('botao-devolver-container');
                botaoTableEmprestados.classList.add('botao-devolver');
                botaoTableEmprestados.addEventListener('click', async function (event) {
                    event.preventDefault();
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

                        // Atualiza o estado da interface do usuário
                        linha.style.backgroundColor = '#9dbd8c';
                        botaoTableEmprestados.textContent = 'Devolvido';

                        // Atualiza a tabela de livros
                        criarTabela("livros");
                        atualizarTabelaLivros(args[3]);
                    } catch (error) {
                        console.error("ERRO", error);
                    }
                });
                colunaTableEmprestados.appendChild(botaoTableEmprestados);
                linha.appendChild(colunaTableEmprestados);
                corpoTabela.appendChild(linha);
            } else {
                colunaTableEmprestados.textContent = args[i - 1];
                linha.appendChild(colunaTableEmprestados);
                corpoTabela.appendChild(linha);
            }
        }
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
            corpoTabela.appendChild(linha);
        }
        tabela.appendChild(corpoTabela);
    }
}

async function atualizarTabelaLivros(nomeLivro) {
    const url = `http://localhost:8080/livros/${nomeLivro}`;
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
            console.error("Erro ao buscar dados do livro!");
            return;
        }

        const livro = await response.json();
        console.log(livro);
        const linhaLivro = document.querySelector(`.table-livros tr[data-id="${livro.id}"]`);
        console.log(linhaLivro);
        if (linhaLivro) {
            const quantidadeColuna = linhaLivro.querySelector('td:nth-child(4)');
            console.log(quantidadeColuna);
            if (quantidadeColuna) {
                quantidadeColuna.textContent = livro.numeroExemplares; // Assumindo que o JSON retornado contém a quantidade do livro
                console.log(quantidadeColuna);
            }
        }
    } catch (error) {
        console.error("ERRO", error);
    }
}

