function registrarEmprestimo() {
    const url = "http://localhost:8080/emprestimos";
    document.getElementById("iform").addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeAluno = document.getElementById("nome").value;
        
        const nomeLivro = document.getElementById("nomeLivro").value;
        
        const dataEmprestimo = document.getElementById("dataEmprestimo").value;
       
        const dataDevolucao = document.getElementById("dataDevolucao").value;
        const salaAluno = document.getElementById("sala").value;
        
        const turnoAluno = document.getElementById("turno").value;
        

        var emprestimo = {
            aluno: {
                nome: nomeAluno,
                turma: salaAluno,
                turno: turnoAluno
            },
            livro: {
                nomeLivro: nomeLivro
            },
            dataEmprestimo: dataEmprestimo,
            dataDevolucao: dataDevolucao
        };
        
        var token = sessionStorage.getItem('token');
        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(emprestimo),
        })
            .then(response => {
                if (!response.ok) {
                    alert("Erro ao enviar os dados!");
                } 
                return response.json(); 
            })
            .then(data => {
                if(data){
                    alert(data.mensagem);
                    location.reload();
                }
            })
            .catch(error => console.error("ERRO", error));
    })
}