async function validarLogin() {
    const url = 'http://localhost:8080/autenticacao/login';
    const username = document.querySelector('#usuário').value;
    const password = document.querySelector('#senha').value;

    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify({username, password}),
    })
    .then(response => {
        if(!response.ok){
            alert("Credenciais Inválidas");
            location.reload();
        }
        return response.json();
    })
    .then(dados => {
        if(dados) {
            sessionStorage.setItem('token', dados.token);
            window.location.href = '/pages/main.html';
        }
    })
}