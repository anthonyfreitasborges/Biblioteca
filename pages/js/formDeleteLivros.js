async function deletarLivro() {
    document.getElementById('iform-delete-livros').addEventListener('submit', async function (event) {
        event.preventDefault();

        const nomeLivro = document.getElementById('iNomeLivro').value;
        const token = sessionStorage.getItem('token');
        const url = `http://localhost:8080/livros/${encodeURIComponent(nomeLivro)}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                alert('Erro na exclusão!');
            }

            const data = await response.json();
            alert(data.mensagem);
            // Limpa o formulário após a exclusão bem-sucedida
            document.getElementById('iform-delete-livros').reset();
            location.reload();
        } catch (error) {
            console.error('Erro:', error);
        }
    });
}
