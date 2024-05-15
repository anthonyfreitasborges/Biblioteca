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

/*fprmulario emprestar livro*/ 
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
    });
    FecharTableEmprestados.addEventListener("click",function(){
        tableemprestado.style.display = "none";
    })

});
/*tabela todos os livros */
document.addEventListener("DOMContentLoaded", function(){
    const iconetodososlivros = document.getElementById("icone3");
    const tabelatodososlivros = document.getElementById("todos-os-livros");
    const fechar= document.getElementById("fechar-livros");
    iconetodososlivros.addEventListener("click",function () {
        tabelatodososlivros.style.display= "block";
        
    });
    fechar.addEventListener("click",function () {
        tabelatodososlivros.style.display= "none";
        
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