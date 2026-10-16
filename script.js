/* ===== Estilos extras (injetados aqui pra você só trocar este arquivo) ===== */
const estilosExtras = document.createElement('style');
estilosExtras.textContent = `
.alerta-crise{background:#fff4e5;border:2px solid #f59e0b;color:#7a4300;border-radius:12px;padding:12px 14px;margin:10px 0;font-size:.95rem}
.alerta-crise a{color:#b45309;font-weight:700}
.btn-salvar{margin-top:8px;padding:6px 12px;border-radius:999px;border:1px solid #6c8cff;background:transparent;color:#4a69d6;cursor:pointer;font-size:.85rem}
.btn-salvar.salvo{background:#4a69d6;color:#fff}
.nav a.ativo{font-weight:700;text-decoration:underline}
.tag-demo{display:inline-block;font-size:.75rem;opacity:.75;margin-bottom:8px}
`;
document.head.appendChild(estilosExtras);

/* ===== Menu mobile ===== */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
});

/* Rolagem suave */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const alvo = document.querySelector(this.getAttribute('href'));
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* Destaca no menu a seção onde a pessoa está */
const secoes = document.querySelectorAll('section[id]');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            document.querySelectorAll('.nav a').forEach(a => {
                a.classList.toggle('ativo', a.getAttribute('href') === '#' + entrada.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
secoes.forEach(s => observador.observe(s));

/* ===== Atividades e localização ===== */
const btnLocalizacao = document.getElementById('btnLocalizacao');
const statusLocalizacao = document.getElementById('statusLocalizacao');
const atividadesGrid = document.getElementById('atividadesGrid');

const atividadesExemplo = [
    { icon: 'fas fa-walking', titulo: 'Caminhada em Grupo', descricao: 'Grupo de caminhada matinal no parque mais próximo. Toda terça e quinta às 7h.' },
    { icon: 'fas fa-users', titulo: 'Roda de Conversa', descricao: 'Encontro semanal sobre ansiedade e bem-estar. Ambiente acolhedor e gratuito.' },
    { icon: 'fas fa-spa', titulo: 'Meditação Guiada', descricao: 'Sessão de meditação ao ar livre. Domingo às 9h no parque da cidade.' },
    { icon: 'fas fa-book-open', titulo: 'Clube do Livro', descricao: 'Leitura e conversa sobre saúde mental. Encontros quinzenais.' },
    { icon: 'fas fa-palette', titulo: 'Oficina de Arte', descricao: 'Expressão através da arte. Materiais fornecidos. Toda quarta-feira.' },
    { icon: 'fas fa-music', titulo: 'Música e Relaxamento', descricao: 'Sessão de música ao vivo e relaxamento. Ambiente calmo e seguro.' }
];

function mostrarAtividades() {
    atividadesGrid.innerHTML = '';

    const aviso = document.createElement('p');
    aviso.className = 'tag-demo';
    aviso.style.gridColumn = '1 / -1';
    aviso.textContent = 'Exemplos de demonstração. Num serviço real, estas sugestões viriam de locais próximos.';
    atividadesGrid.appendChild(aviso);

    atividadesExemplo.forEach(ativ => {
        const card = document.createElement('div');
        card.className = 'atividade-card';

        const icone = document.createElement('div');
        icone.className = 'atividade-icon';
        icone.innerHTML = `<i class="${ativ.icon}"></i>`;

        const corpo = document.createElement('div');
        const h4 = document.createElement('h4');
        h4.textContent = ativ.titulo;
        const p = document.createElement('p');
        p.textContent = ativ.descricao;

        const salvar = document.createElement('button');
        salvar.type = 'button';
        salvar.className = 'btn-salvar';
        salvar.textContent = 'Tenho interesse';
        salvar.addEventListener('click', () => {
            const salvo = salvar.classList.toggle('salvo');
            salvar.textContent = salvo ? '✓ Salvo' : 'Tenho interesse';
        });

        corpo.append(h4, p, salvar);
        card.append(icone, corpo);
        atividadesGrid.appendChild(card);
    });
}

btnLocalizacao.addEventListener('click', () => {
    if (!navigator.geolocation) {
        statusLocalizacao.textContent = 'Seu navegador não suporta geolocalização. Mostrando atividades gerais.';
        mostrarAtividades();
        return;
    }

    btnLocalizacao.disabled = true;
    statusLocalizacao.textContent = 'Buscando sua localização...';

    navigator.geolocation.getCurrentPosition(
        () => {
            // Não guardamos nem mostramos coordenadas: a localização não sai do seu aparelho.
            statusLocalizacao.textContent = 'Localização permitida! Veja as sugestões abaixo.';
            btnLocalizacao.disabled = false;
            mostrarAtividades();
        },
        () => {
            statusLocalizacao.textContent = 'Não foi possível obter a localização. Mostrando atividades gerais.';
            btnLocalizacao.disabled = false;
            mostrarAtividades();
        },
        { timeout: 10000 }
    );
});

/* ===== Formulário (demonstração: nada é enviado nem guardado) ===== */
const formEspecialista = document.getElementById('formEspecialista');
const sucessoMsg = document.getElementById('sucessoMsg');

const btnNovoPedido = document.createElement('button');
btnNovoPedido.type = 'button';
btnNovoPedido.className = 'btn btn-secondary';
btnNovoPedido.textContent = 'Fazer outro pedido';
sucessoMsg.appendChild(btnNovoPedido);

/* >>> TROQUE pelo seu e-mail. Os pedidos de teste chegam nele. <<< */
const EMAIL_DESTINO = 'Samara.ezapecemic@gmail.com';

/* Aviso acima do formulário */
const avisoForm = document.createElement('p');
avisoForm.className = 'tag-demo';
avisoForm.textContent = 'Envio de TESTE: o pedido chega ao e-mail do criador do site, não a um psicólogo. Não escreva dados sensíveis. A localização só é enviada se você marcar a caixinha. Em crise, ligue 188 (CVV).';
formEspecialista.parentNode.insertBefore(avisoForm, formEspecialista);

/* Mensagem de erro */
const erroForm = document.createElement('p');
erroForm.className = 'alerta-crise';
erroForm.style.display = 'none';
erroForm.textContent = 'Não foi possível enviar agora. Tente de novo em instantes.';
formEspecialista.appendChild(erroForm);

/* Localização aproximada: só é pedida se a pessoa marcar a caixinha.
   Arredondamos para 2 casas decimais (cerca de 1 km) pra não mostrar o ponto exato. */
function obterLocalizacaoAproximada() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude.toFixed(2);
                const lng = pos.coords.longitude.toFixed(2);
                resolve(`${lat}, ${lng} (aprox.) https://www.google.com/maps?q=${lat},${lng}`);
            },
            () => resolve(null),
            { timeout: 8000 }
        );
    });
}

formEspecialista.addEventListener('submit', async (e) => {
    e.preventDefault();
    erroForm.style.display = 'none';

    const botao = formEspecialista.querySelector('button[type="submit"]');
    const textoOriginal = botao.innerHTML;
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    const nome = document.getElementById('nome').value.trim();
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    const emailPessoa = document.getElementById('email').value.trim();
    const aceitouLocal = document.getElementById('compartilharLocal').checked;
    const localizacao = aceitouLocal ? await obterLocalizacaoAproximada() : null;

    const dados = {
        _subject: 'Acolhe (teste): novo pedido de atendimento',
        nome: nome,
        assunto: assunto,
        mensagem: mensagem || '(sem mensagem)',
        localizacao: aceitouLocal
            ? (localizacao || '(aceitou, mas não foi possível obter)')
            : '(não compartilhou)'
    };
    // Só inclui "email" se a pessoa preencheu: o FormSubmit usa esse campo como endereço de resposta.
    if (emailPessoa) dados.email = emailPessoa;

    try {
        const resposta = await fetch(`https://formsubmit.co/ajax/${EMAIL_DESTINO}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!resposta.ok) throw new Error('Falha no envio');

        sucessoMsg.querySelector('p').textContent =
            `Pedido de teste enviado${nome ? ', ' + nome : ''}! Ele chegou ao e-mail do criador do site. Este protótipo não tem atendimento psicológico real.`;
        formEspecialista.style.display = 'none';
        sucessoMsg.style.display = 'block';
    } catch (err) {
        erroForm.style.display = 'block';
    } finally {
        botao.disabled = false;
        botao.innerHTML = textoOriginal;
    }
});

btnNovoPedido.addEventListener('click', () => {
    formEspecialista.reset();
    sucessoMsg.style.display = 'none';
    formEspecialista.style.display = '';
});
