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
            location.reload();
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

    // Deletar Registro
    setupToggleVisibility("remove-registro", "container-form-remove-registro", "#img-fechar-form-registro");
});

//FETCH PARA BUSCAR (GET) EMPRÉSTIMOS DE LIVROS
async function criarTabela(nomeUrl) {
    var token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/${nomeUrl}`;
    fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(data => {
            return data.json();
        })
        .then(registers => {
            if (nomeUrl === 'emprestimos') {
                registers.forEach(register => {
                    criarElementosTabela('table-emprestados', register.id, register.aluno.nome, register.livro.nomeLivro, register.dataEmprestimo, register.dataDevolucao, register.aluno.turno, register.aluno.turma);
                });
            } else if (nomeUrl === 'livros') {
                registers.forEach(register => {
                    criarElementosTabela('table-livros', register.id, register.nomeLivro, register.nomeAutor, register.numeroExemplares);
                });
            } else {
                console.log("ERRO, NÃO FOI POSSÍVEL ENCONTRAR ESSA TABELA");
            }
        })
        .catch(error => console.log(error));
}

//função responsável por criar os elementos de qualquer tabela:
function criarElementosTabela(...args) {
    const tabela = document.querySelector(`.${args[0]}`);
    const corpoTabela = document.createElement('tbody');
    const linha = document.createElement('tr');
    const numero = args[1];

    if ((numero % 2) === 0) {
        linha.classList.add("linha-branca");
    } else {
        linha.classList.add("linha-cinza");
    }

    if (tabela.className === 'table-emprestados') {
        for (var i = 2; i <= args.length + 1; i++) {
            const coluna = document.createElement('td');
            if (i === args.length + 1) {
                const botao = document.createElement('button');
                botao.textContent = 'Devolver';
                botao.classList.add('botao-devolver');
                botao.addEventListener('click', function (event) {
                    event.preventDefault();
                    linha.style.backgroundColor = '#9dbd8c';
                    botao.textContent = 'Devolvido';
                    const url = `http://localhost:8080/livros/${args[3]}`;
                    var token = sessionStorage.getItem('token');
                    
                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                alert("Erro na devolução!");
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data) {
                                alert(data.mensagem);
                                location.reload();
                            }
                        })
                        .catch(error => console.error("ERRO", error));
                })
                coluna.appendChild(botao);
                linha.appendChild(coluna);
                corpoTabela.appendChild(linha);
            } else {
                coluna.textContent = args[i - 1];
                linha.appendChild(coluna);
                corpoTabela.appendChild(linha);
            }
        }
        tabela.appendChild(corpoTabela);
    } else {
        for (var i = 2; i <= args.length; i++) {
            const coluna = document.createElement('td');
            coluna.textContent = args[i - 1];
            linha.appendChild(coluna);
            corpoTabela.appendChild(linha);
        }
        tabela.appendChild(corpoTabela);
    }
}