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

/*formulario emprestar livro*/ 
document.addEventListener("DOMContentLoaded", function () {
    const iconeEmprestarLivro = document.getElementById("icone1"); // Seleciona o ícone "emprestar livro"
    const formulario = document.getElementById("formulario"); // Seleciona o formulário
    const closeIcon = formulario.querySelector("img"); // Seleciona o ícone de fechar dentro do formulário

    // Adiciona um ouvinte de evento de clique ao ícone "emprestar livro"
    iconeEmprestarLivro.addEventListener("click", function () {
        formulario.style.display = "block"; // Torna o formulário visível
    });

    // Adiciona um ouvinte de evento de clique ao ícone de fechar
    closeIcon.addEventListener("click", function () {
        formulario.style.display = "none"; // Torna o formulário invisível
    });
});
/*tabela emprestados*/
document.addEventListener("DOMContentLoaded",function(){
    const iconeEmprestados = document.getElementById("icone2");
    const tableemprestado = document.getElementById("tabela-emprestados");
    const FecharTableEmprestados = document.getElementById("fechar-emprestados")
    iconeEmprestados.addEventListener("click", function () {
        tableemprestado.style.display = "block"; // Torna o formulário visível
        criarTabela("emprestimos");
    });
    FecharTableEmprestados.addEventListener("click",function(){
        tableemprestado.style.display = "none";
        //experimentei colocar o location.reload, mas não cheguei a testar.
        location.reload();
    })

});
/*tabela todos os livros */
document.addEventListener("DOMContentLoaded", function(){
    const iconetodososlivros = document.getElementById("icone3");
    const tabelatodososlivros = document.getElementById("todos-os-livros");
    const fechar= document.getElementById("fechar-livros");
    iconetodososlivros.addEventListener("click",function () {
        tabelatodososlivros.style.display= "block";
        criarTabela("livros")
        
    });
    fechar.addEventListener("click",function () {
        tabelatodososlivros.style.display= "none";
        location.reload();
    });
});
/*adicionar livro */
document.addEventListener("DOMContentLoaded",function(){
    const IconeAdicionarLivro =document.getElementById("add-livro");
    const FormularioAddLivro = document.getElementById("form-add-livros");
    const fecharAdd = document.getElementById("icone-fechar-form-add");
    IconeAdicionarLivro.addEventListener("click",function(){
        FormularioAddLivro.style.display= "block";
    });
    fecharAdd.addEventListener("click",function(){
        FormularioAddLivro.style.display= "none";
    });
})

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
        console.log(registers);
        if(nomeUrl === 'emprestimos'){
            registers.forEach(register => {
                criarElementosTabela('table-emprestados',register.id,register.aluno.nome,register.livro.nomeLivro,register.dataEmprestimo,register.dataDevolucao,register.aluno.turno,register.aluno.turma);
            });
        } else if(nomeUrl === 'livros'){
            registers.forEach(register => {
                console.log(register.nomeAutor);
                criarElementosTabela('table-livros',register.id,register.nomeLivro,register.nomeAutor,register.numeroExemplares);
            });
        }else{
            console.log("ERRO, NÃO FOI POSSÍVEL ENCONTRAR ESSA TABELA");
        }
    })
    .catch(error => console.log(error));
}

//função responsável por criar os elementos de qualquer tabela:
function criarElementosTabela(...args) {
    console.log(args.length);
    const tabela = document.querySelector(`.${args[0]}`);
    const linha = document.createElement('tr');
    const numero = args[1];

    if((numero % 2) === 0) {
        linha.classList.add("linha-branca");
    } else {
        linha.classList.add("linha-cinza");
    }

    for(var i = 2; i <= args.length; i++){
        const coluna = document.createElement('td');
        coluna.textContent = args[i-1]; 
        linha.appendChild(coluna);
        tabela.appendChild(linha);
    }
}