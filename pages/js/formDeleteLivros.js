function deletarLivro() {
    document.getElementById('iform-delete-livros').addEventListener('submit', function (event) {
        event.preventDefault();

        const nomeLivro = document.getElementById('iNomeLivro').value;
        const token = sessionStorage.getItem('token');
        const url = `http://localhost:8080/livros/${nomeLivro}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
           .then(response => {
                if (!response.ok) {
                    alert('Erro na exclusão!');
                    location.reload();
                }
                return response.json();
            })
           .then(data => {
                alert(data.mensagem);
                location.reload();
            })
           .catch(error => console.error('Erro: ', error))
    })
}