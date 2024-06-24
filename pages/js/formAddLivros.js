async function postLivro() {
    const url = "http://localhost:8080/livros";
    document.getElementById('iformLivro').addEventListener('submit', async function (event) {
        event.preventDefault();

        const inputNomeLivro = document.getElementById('nameLivro').value;
        const inputAutorLivro = document.getElementById('autorLivro').value;
        const inputQuantLivro = document.getElementById('quantLivro').value;

        const token = sessionStorage.getItem('token');

        const infoLivros = {
            nomeLivro: inputNomeLivro,
            numeroExemplares: inputQuantLivro,
            nomeAutor: inputAutorLivro
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(infoLivros),
            });

            if (!response.ok) {
                alert('Erro no cadastro do livro!');
                return;
            }

            const data = await response.json();
            alert(`Livro (${data.nomeLivro}) cadastrado com sucesso!`);
            // Limpa o formulário após o envio bem-sucedido
            document.getElementById('iformLivro').reset();
            location.reload();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
}

