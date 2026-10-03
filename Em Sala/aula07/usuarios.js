async function buscarUsuarios() {
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!resposta.ok) {
        throw new Error('Não foi possível buscar os usuários');
    }

    return resposta.json();
}

async function carregarUsuarios() {
    const corpoTabela =
        document.getElementById('corpo-tabela');

    const mensagem =
        document.getElementById('mensagem');

    const tabela =
        document.getElementById('tabela-container');

    corpoTabela.innerHTML = '';
    mensagem.textContent = 'Carregando usuários...';

    try {
        const usuarios = await buscarUsuarios();

        await new Promise(function (resolve) {
            setTimeout(resolve, 1000);
        });

        tabela.style.display = 'block';

        usuarios.forEach(function (usuario) {
            const linha = corpoTabela.insertRow();

            linha.insertCell().textContent = usuario.id;
            linha.insertCell().textContent = usuario.name;
            linha.insertCell().textContent = usuario.email;
            linha.insertCell().textContent = usuario.address.city;
        });

        mensagem.textContent =
            `${usuarios.length} usuários encontrados.`;

    } catch (erro) {
        mensagem.textContent =
            'Não foi possível carregar os usuários.';
    }
}