async function validarLogin() {
    const url = 'http://localhost:8080/autenticacao/login';
    const username = document.querySelector('#usuário').value;
    const password = document.querySelector('#senha').value;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            alert("Credenciais Inválidas");
            return;
        }

        const dados = await response.json();

        if (dados) {
            console.log(dados);
            sessionStorage.setItem('token', dados.token);
            window.location.href = 'main.html';
        }
    } catch (error) {
        console.error('Erro na solicitação:', error);
        alert("Ocorreu um erro ao tentar fazer login.");
    }
}
