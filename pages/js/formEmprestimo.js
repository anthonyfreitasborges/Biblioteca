async function registrarEmprestimo() {
    const url = "http://localhost:8080/emprestimos";
    document.getElementById("iform").addEventListener("submit", async function (event) {
        event.preventDefault();

        const nomeAluno = document.getElementById("nome").value;
        const nomeLivro = document.getElementById("nomeLivro").value;
        const dataEmprestimo = document.getElementById("dataEmprestimo").value;
        const dataDevolucao = document.getElementById("dataDevolucao").value;
        const salaAluno = document.getElementById("sala").value;
        const turnoAluno = document.getElementById("turno").value;

        const emprestimo = {
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
        
        const token = sessionStorage.getItem('token');

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(emprestimo),
            });

            if (!response.ok) {
                alert("Erro ao enviar os dados!");
                document.getElementById("iform").reset();
                return;
            }

            const data = await response.json();

            if (data) {
                alert(data.mensagem);
                // Limpa o formulário após o envio bem-sucedido
                document.getElementById("iform").reset();
            }
        } catch (error) {
            console.error("ERRO", error);
        }
    });
}
