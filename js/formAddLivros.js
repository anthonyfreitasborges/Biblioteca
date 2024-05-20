const url = "http://localhost:8080/livros";
const token = sessionStorage.getItem("token");
const formulario = document.getElementById("iform");
const addLivro = document.getElementsByClassName("input-botao-form-add");

function postLivro(){
    const url = "http://localhost:8080/livros";
    document.getElementById('iformLivro').addEventListener('submit', function (event) {
        event.preventDefault();

        const inputNomeLivro = document.getElementById('nameLivro').value;
        const inputAutorLivro = document.getElementById('autorLivro').value;
        const inputQuantLivro = document.getElementById('quantLivro').value;

        var token = sessionStorage.getItem('token');

        const infoLivros = {
            nomeLivro: inputNomeLivro,
            numeroExemplares: inputQuantLivro,
            nomeAutor: inputAutorLivro
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(infoLivros),
        })  
            .then(response => {
                if (!response.ok) {
                    alert('Erro no cadastro de livro');
                    location.reload();
                }
                return response.json();
            })
            .then(data => {
                alert(`Livro(${data.nomeLivro}) cadastrado com sucesso!`);
                location.reload();
            })
            .catch(error => console.error('Erro: ', error))

    })
}
