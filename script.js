const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function adicionarMensagem(texto, tipo = 'sent') {
    const div = document.createElement('div');
    div.className = `message ${tipo}`;

    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, '0') + ':' + 
                 agora.getMinutes().toString().padStart(2, '0');

    div.innerHTML = `
        <div class="message-info">${tipo === 'sent' ? 'Você' : 'Usuário'} • ${hora}</div>
        <div class="message-bubble">${texto}</div>
    `;

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function enviarMensagem() {
    const texto = chatInput.value.trim();
    if (texto === '') return;

    adicionarMensagem(texto, 'sent');
    chatInput.value = '';

    setTimeout(() => {
        const respostas = [
            "Obrigado por compartilhar. Estamos aqui com você 💙",
            "Sua mensagem foi recebida. Lembre-se que este espaço é seguro.",
            "Que bom que você está aqui. Continue participando!",
            "A moderação está acompanhando. Se precisar de ajuda urgente, ligue 188."
        ];
        const resposta = respostas[Math.floor(Math.random() * respostas.length)];
        adicionarMensagem(resposta, 'received');
    }, 1000 + Math.random() * 1500);
}

sendBtn.addEventListener('click', enviarMensagem);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        enviarMensagem();
    }
});

const btnLocalizacao = document.getElementById('btnLocalizacao');
const statusLocalizacao = document.getElementById('statusLocalizacao');
const atividadesGrid = document.getElementById('atividadesGrid');

const atividadesExemplo = [
    {
        icon: 'fas fa-walking',
        titulo: 'Caminhada em Grupo',
        descricao: 'Grupo de caminhada matinal no parque mais próximo. Toda terça e quinta às 7h.'
    },
    {
        icon: 'fas fa-users',
        titulo: 'Roda de Conversa',
        descricao: 'Encontro semanal sobre ansiedade e bem-estar. Ambiente acolhedor e gratuito.'
    },
    {
        icon: 'fas fa-spa',
        titulo: 'Meditação Guiada',
        descricao: 'Sessão de meditação ao ar livre. Domingo às 9h no parque da cidade.'
    },
    {
        icon: 'fas fa-book-open',
        titulo: 'Clube do Livro',
        descricao: 'Leitura e conversa sobre saúde mental. Encontros quinzenais.'
    },
    {
        icon: 'fas fa-palette',
        titulo: 'Oficina de Arte',
        descricao: 'Expressão através da arte. Materiais fornecidos. Toda quarta-feira.'
    },
    {
        icon: 'fas fa-music',
        titulo: 'Música e Relaxamento',
        descricao: 'Sessão de música ao vivo e relaxamento. Ambiente calmo e seguro.'
    }
];

function mostrarAtividades() {
    atividadesGrid.innerHTML = '';

    atividadesExemplo.forEach(ativ => {
        const card = document.createElement('div');
        card.className = 'atividade-card';
        card.innerHTML = `
            <div class="atividade-icon">
                <i class="${ativ.icon}"></i>
            </div>
            <div>
                <h4>${ativ.titulo}</h4>
                <p>${ativ.descricao}</p>
            </div>
        `;
        atividadesGrid.appendChild(card);
    });
}

btnLocalizacao.addEventListener('click', () => {
    if (!navigator.geolocation) {
        statusLocalizacao.textContent = 'Seu navegador não suporta geolocalização.';
        return;
    }

    statusLocalizacao.textContent = 'Buscando sua localização...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lon = position.coords.longitude.toFixed(4);
            statusLocalizacao.textContent = `Localização encontrada! (Lat: ${lat}, Lon: ${lon})`;
            mostrarAtividades();
        },
        (error) => {
            statusLocalizacao.textContent = 'Não foi possível obter a localização. Mostrando atividades gerais.';
            mostrarAtividades();
        }
    );
});

const formEspecialista = document.getElementById('formEspecialista');
const sucessoMsg = document.getElementById('sucessoMsg');

formEspecialista.addEventListener('submit', (e) => {
    e.preventDefault();
    formEspecialista.style.display = 'none';
    sucessoMsg.style.display = 'block';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
