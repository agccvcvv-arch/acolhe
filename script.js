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

/* ===== Ferramentas de autocuidado ===== */
const estilosFerr = document.createElement('style');
estilosFerr.textContent = `
.ajuda-botoes{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:14px}
.ajuda-nota{text-align:center;font-size:.9rem;opacity:.85}
.ferr-grid{display:grid;gap:20px;grid-template-columns:1fr}
@media(min-width:768px){.ferr-grid{grid-template-columns:1fr 1fr}}
.ferr-card{background:#fff;border-radius:16px;padding:22px;box-shadow:0 4px 18px rgba(0,0,0,.07)}
.ferr-card h3{margin-bottom:6px}
.ferr-desc{opacity:.8;margin-bottom:14px;font-size:.95rem}
.resp-area{display:flex;flex-direction:column;align-items:center;gap:10px}
.resp-circulo{width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,#8fb0ff,#4a69d6);margin:24px 0}
.opcoes-checkin,.humor-emojis{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
.opcoes-checkin button{padding:8px 14px;border-radius:999px;border:1px solid #6c8cff;background:#fff;color:#4a69d6;cursor:pointer}
.opcoes-checkin button.sel{background:#4a69d6;color:#fff}
.humor-emojis button{font-size:1.7rem;background:none;border:2px solid transparent;border-radius:12px;padding:4px 8px;cursor:pointer}
.humor-emojis button.sel{border-color:#4a69d6;background:#eef2ff}
.resp-final{margin:10px 0;padding:12px;background:#eef2ff;border-radius:10px}
.diario-lista{list-style:none;padding:0;margin:14px 0 0;font-size:.92rem}
.diario-lista li{padding:6px 0;border-bottom:1px solid #eef0f8}
.btn-apagar{margin-top:10px;background:none;border:none;color:#b45309;text-decoration:underline;cursor:pointer;font-size:.85rem}
`;
document.head.appendChild(estilosFerr);

/* 1. Respiração guiada (4s inspira, 4s segura, 6s solta) */
const circuloResp = document.getElementById('circuloResp');
const textoResp = document.getElementById('textoResp');
const btnResp = document.getElementById('btnResp');
let respAtiva = false;
let respTimer = null;

function faseResp(texto, escala, segundos, proxima) {
    textoResp.textContent = texto;
    circuloResp.style.transition = `transform ${segundos}s ease-in-out`;
    circuloResp.style.transform = `scale(${escala})`;
    respTimer = setTimeout(proxima, segundos * 1000);
}
function cicloResp() {
    if (!respAtiva) return;
    faseResp('Inspire…', 1.35, 4, () =>
        faseResp('Segure…', 1.35, 4, () =>
            faseResp('Solte devagar…', 1, 6, cicloResp)));
}
btnResp.addEventListener('click', () => {
    respAtiva = !respAtiva;
    if (respAtiva) {
        btnResp.textContent = 'Parar';
        cicloResp();
    } else {
        clearTimeout(respTimer);
        btnResp.textContent = 'Iniciar';
        textoResp.textContent = 'Muito bem. Respire no seu ritmo.';
        circuloResp.style.transform = 'scale(1)';
    }
});

/* 2. Como você está hoje? */
const sugestoesCheckin = {
    ansioso: 'Tente a respiração guiada aqui ao lado por 1 minuto. Beba um pouco de água e olhe pela janela por um instante.',
    triste: 'Não tem problema não estar bem. Que tal falar com alguém de confiança? Se pesar demais, o CVV (188) escuta você a qualquer hora.',
    cansado: 'Seu corpo pode estar pedindo uma pausa. Descanse alguns minutos, alongue-se ou tome um copo d’água.',
    bem: 'Que bom! Aproveite para registrar no diário e fazer algo de que você gosta.'
};
const opcoesCheckin = document.querySelectorAll('#opcoesCheckin button');
const respostaCheckin = document.getElementById('respostaCheckin');
opcoesCheckin.forEach(btn => {
    btn.addEventListener('click', () => {
        opcoesCheckin.forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        respostaCheckin.textContent = sugestoesCheckin[btn.dataset.estado];
        respostaCheckin.style.display = 'block';
    });
});

/* 3. Diário de humor (salvo só no aparelho, via localStorage) */
const CHAVE_DIARIO = 'acolhe_diario';
const humorBotoes = document.querySelectorAll('#humorEmojis button');
const notaHumor = document.getElementById('notaHumor');
const diarioLista = document.getElementById('diarioLista');
const btnApagarDiario = document.getElementById('btnApagarDiario');
let emojiEscolhido = null;

function lerDiario() {
    try { return JSON.parse(localStorage.getItem(CHAVE_DIARIO)) || []; }
    catch (e) { return []; }
}
function gravarDiario(lista) {
    try { localStorage.setItem(CHAVE_DIARIO, JSON.stringify(lista)); } catch (e) { /* sem espaço ou bloqueado */ }
}
function desenharDiario() {
    const lista = lerDiario();
    diarioLista.innerHTML = '';
    lista.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.emoji}  ${item.data}${item.nota ? ' — ' + item.nota : ''}`;
        diarioLista.appendChild(li);
    });
    btnApagarDiario.style.display = lista.length ? 'inline-block' : 'none';
}
humorBotoes.forEach(btn => {
    btn.addEventListener('click', () => {
        humorBotoes.forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        emojiEscolhido = btn.dataset.emoji;
    });
});
document.getElementById('btnSalvarHumor').addEventListener('click', () => {
    if (!emojiEscolhido) { alert('Escolha um emoji primeiro 🙂'); return; }
    const lista = lerDiario();
    lista.unshift({
        emoji: emojiEscolhido,
        nota: notaHumor.value.trim(),
        data: new Date().toLocaleDateString('pt-BR')
    });
    gravarDiario(lista.slice(0, 7)); // guarda só os 7 últimos
    notaHumor.value = '';
    humorBotoes.forEach(b => b.classList.remove('sel'));
    emojiEscolhido = null;
    desenharDiario();
});
btnApagarDiario.addEventListener('click', () => {
    if (confirm('Apagar todo o seu diário deste aparelho?')) {
        try { localStorage.removeItem(CHAVE_DIARIO); } catch (e) {}
        desenharDiario();
    }
});
desenharDiario();

/* 4. Mensagem de acolhimento */
const frases = [
    '💙 Você importa, mesmo nos dias difíceis.',
    '🌱 Um passo pequeno hoje já é um passo.',
    '🫶 Pedir ajuda é um ato de coragem, não de fraqueza.',
    '🌤️ Sentimentos passam, mesmo quando não parece.',
    '☕ Você não precisa resolver tudo hoje.',
    '🤝 Você não está sozinho(a).',
    '🌙 Descansar também é cuidar de si.',
    '✨ Respire. Você já superou dias difíceis antes.'
];
const fraseAcolhimento = document.getElementById('fraseAcolhimento');
let ultimaFrase = 0;
document.getElementById('btnFrase').addEventListener('click', () => {
    let i;
    do { i = Math.floor(Math.random() * frases.length); } while (i === ultimaFrase);
    ultimaFrase = i;
    fraseAcolhimento.textContent = frases[i];
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
