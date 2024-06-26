document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("iform");
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
<<<<<<< HEAD

=======
>>>>>>> 18313bbefcd3095a80f23e447e05747b1adc4f63
            const url = "http://localhost:8080/emprestimos";
            const nomeAluno = document.getElementById("nome").value;
            const nomeLivro = document.getElementById("nomeLivro").value;
            const dataEmprestimo = document.getElementById("dataEmprestimo").value;
            const dataDevolucao = document.getElementById("dataDevolucao").value;
            const salaAluno = document.getElementById("sala").value;
            const turnoAluno = document.getElementById("turno").value;
<<<<<<< HEAD

=======
>>>>>>> 18313bbefcd3095a80f23e447e05747b1adc4f63
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
<<<<<<< HEAD

            const token = sessionStorage.getItem('token');

=======
            const token = sessionStorage.getItem('token');

>>>>>>> 18313bbefcd3095a80f23e447e05747b1adc4f63
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
<<<<<<< HEAD

                const data = await response.json();

                if (data) {
                    alert(data.mensagem);
                    criarTabela('livros');
                    criarTabela('emprestimos')
                    atualizarTabelaLivros(nomeLivro);
                    // Limpa o formulário após o envio bem-sucedido
                    document.getElementById("iform").reset();
=======
                const data = await response.json();
                if (data) {
                    alert(data.mensagem);
                    location.reload();
>>>>>>> 18313bbefcd3095a80f23e447e05747b1adc4f63
                }
            } catch (error) {
                console.error("ERRO", error);
            }
        });
    } else {
        console.error("Elemento 'iform' não encontrado no DOM.");
    }
<<<<<<< HEAD
});
=======
});
>>>>>>> 18313bbefcd3095a80f23e447e05747b1adc4f63
