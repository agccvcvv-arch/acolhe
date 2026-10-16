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

/* ===== Chat (demonstração) ===== */
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

const palavrasDeCrise = [
    'suicid', 'me matar', 'morrer', 'quero morrer', 'acabar com tudo',
    'não aguento mais', 'nao aguento mais', 'me machucar', 'sumir pra sempre'
];

function adicionarMensagem(texto, tipo = 'sent') {
    const div = document.createElement('div');
    div.className = `message ${tipo}`;

    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, '0') + ':' +
                 agora.getMinutes().toString().padStart(2, '0');

    const info = document.createElement('div');
    info.className = 'message-info';
    info.textContent = `${tipo === 'sent' ? 'Você' : 'Resposta automática (demo)'} • ${hora}`;

    const bolha = document.createElement('div');
    bolha.className = 'message-bubble';
    bolha.textContent = texto; // textContent: o que a pessoa digita nunca vira código

    div.appendChild(info);
    div.appendChild(bolha);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function mostrarAlertaCrise() {
    const alerta = document.createElement('div');
    alerta.className = 'alerta-crise';
    alerta.innerHTML =
        'Sentimos muito que você esteja passando por isso. Você não precisa enfrentar isso sozinho. ' +
        'Ligue agora para o <a href="tel:188">CVV – 188</a> (24h, gratuito) ' +
        'ou, em risco imediato, para o <a href="tel:192">SAMU – 192</a>.';
    chatMessages.appendChild(alerta);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function enviarMensagem() {
    const texto = chatInput.value.trim();
    if (texto === '') return;

    adicionarMensagem(texto, 'sent');
    chatInput.value = '';

    const minuscula = texto.toLowerCase();
    const emCrise = palavrasDeCrise.some(p => minuscula.includes(p));

    setTimeout(() => {
        if (emCrise) {
            mostrarAlertaCrise();
            return;
        }
        const respostas = [
            'Obrigado por compartilhar. Estamos aqui com você 💙',
            'Sua mensagem foi recebida. Lembre-se que este espaço é seguro.',
            'Que bom que você está aqui. Continue participando!',
            'Se precisar de ajuda urgente, ligue 188 (CVV).'
        ];
        adicionarMensagem(respostas[Math.floor(Math.random() * respostas.length)], 'received');
    }, 800 + Math.random() * 1200);
}

sendBtn.addEventListener('click', enviarMensagem);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        enviarMensagem();
    }
});

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
avisoForm.textContent = 'Envio de TESTE: o pedido chega ao e-mail do criador do site, não a um psicólogo. Não escreva dados pessoais reais. Em crise, ligue 188 (CVV).';
formEspecialista.parentNode.insertBefore(avisoForm, formEspecialista);

/* Mensagem de erro */
const erroForm = document.createElement('p');
erroForm.className = 'alerta-crise';
erroForm.style.display = 'none';
erroForm.textContent = 'Não foi possível enviar agora. Tente de novo em instantes.';
formEspecialista.appendChild(erroForm);

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

    try {
        const resposta = await fetch(`https://formsubmit.co/ajax/${EMAIL_DESTINO}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: 'Acolhe (teste): novo pedido de atendimento',
                nome: nome,
                assunto: assunto,
                mensagem: mensagem || '(sem mensagem)'
            })
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
