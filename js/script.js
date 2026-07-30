// ============================================
// INICIALIZAÇÃO - AOS Animation
// ============================================
// Inicializa a biblioteca AOS para animações ao scroll
AOS.init({
    duration: 1000,        // Duração da animação em ms
    easing: 'ease-in-out', // Tipo de easing
    once: false,           // Anima a cada scroll
    mirror: true,          // Anima ao voltar também
    offset: 100            // Offset para ativar animação
});

// ============================================
// NAVBAR FUNCIONALIDADES
// ============================================

/**
 * Alterna o menu mobile ao clicar no hambúrguer
 * Funciona com CSS class 'active' para exibir/ocultar
 */
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

/**
 * Fecha o menu mobile ao clicar em um link
 * Melhora UX em dispositivos móveis
 */
const navbarLinks = document.querySelectorAll('.navbar-menu a');
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

/**
 * Efeito scrolled na navbar ao rolar a página
 * Reduz padding quando scrollou para melhor UX
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MODAIS - Serviços e Contato
// ============================================

/**
 * Abre modal de serviços com informações específicas
 * @param {string} serviceName - Nome do serviço a exibir
 *
 * Descrições dos serviços para cada tipo
 * Pode ser expandido com mais detalhes no futuro
 */
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    const titleEl = document.getElementById('modalServiceTitle');
    const descEl = document.getElementById('modalServiceDesc');
    const galleryEl = document.getElementById('modalGallery'); 

    // Definições dos serviços (pode ser migrado para PHP/BD depois)
    const services = {
        'Manutenção Residencial': {
            title: 'Manutenção Elétrica Residencial',
            desc: 'Oferecemos inspeção completa e manutenção de instalações elétricas residenciais. Nosso serviço inclui diagnóstico de problemas, substituição de componentes defeituosos e adequação às normas de segurança. Garantimos que sua residência está protegida contra riscos elétricos.',
            images: ["./assets/servicos/residencial/android-chrome-300x300.png", "./assets/servicos/residencial/android-chrome-300x300.png","./assets/servicos/residencial/android-chrome-300x300.png","./assets/servicos/residencial/android-chrome-300x300.png",]
        },
        'Manutenção Comercial': {
            title: 'Manutenção Elétrica Comercial',
            desc: 'Solução completa de manutenção para estabelecimentos comerciais. Evitamos interrupções operacionais e garantimos conformidade com regulamentações. Oferecemos planos de manutenção preventiva e suporte 24/7 em emergências.',
            images: ["./assets/servicos/comercial/android-chrome-300x300.png", "./assets/servicos/comercial/android-chrome-300x300.png", "./assets/servicos/comercial/android-chrome-300x300.png", "./assets/servicos/comercial/android-chrome-300x300.png"]
        },
        'Manutenção Industrial': {
            title: 'Manutenção Elétrica Industrial',
            desc: 'Especialista em soluções elétrica para ambientes industriais com alta demanda. Realizamos manutenção preventiva, diagnósticos avançados e adequação às normas de segurança internacionais. Minimizamos paradas operacionais e maximizamos eficiência.',
            images: ["./assets/servicos/industrial/android-chrome-300x300.png", "./assets/servicos/industrial/android-chrome-300x300.png", "./assets/servicos/industrial/android-chrome-300x300.png", "./assets/servicos/industrial/android-chrome-300x300.png"]
        },
        'Instalação Elétrica': {
            title: 'Instalação Elétrica Completa',
            desc: 'Executamos instalações elétricas completas desde o planejamento até a execução. Trabalhamos com materiais de qualidade e respeito total às normas técnicas NBR. Ideal para construções novas ou reformas.',
            images: ["./assets/servicos/eletrica/android-chrome-300x300.png", "./assets/servicos/eletrica/android-chrome-300x300.png", "./assets/servicos/eletrica/android-chrome-300x300.png", "./assets/servicos/eletrica/android-chrome-300x300.png"]
        },
        'Quadros Elétricos': {
            title: 'Montagem de Quadros Elétricos',
            desc: 'Projetamos, confeccionamos e instalamos quadros elétricos personalizados para suas necessidades. Utilizamos componentes de primeira qualidade e garantimos funcionamento seguro e eficiente.',
            images: ["./assets/servicos/quadros/android-chrome-300x300.png", "./assets/servicos/quadros/android-chrome-300x300.png", "./assets/servicos/quadros/android-chrome-300x300.png", "./assets/servicos/quadros/android-chrome-300x300.png"]
        },
        'Conformidade': {
            title: 'Segurança e Conformidade Técnica',
            desc: 'Realizamos inspeções técnicas completas, emitimos laudos de segurança e adequamos instalações às normas NBR vigentes. Garantimos segurança total contra riscos elétricos e conformidade com regulamentações.',
            images: ["./assets/servicos/conformidade/android-chrome-300x300.png", "./assets/servicos/conformidade/android-chrome-300x300.png", "./assets/servicos/conformidade/android-chrome-300x300.png", "./assets/servicos/conformidade/android-chrome-300x300.png"]
        }
    };

    const service = services[serviceName] || services['Manutenção Residencial'];
    titleEl.textContent = service.title;
    descEl.textContent = service.desc;
    if (service.images) {

    galleryEl.innerHTML = "";
    console.log(service.images);

    service.images.forEach(image => {
        console.log(image);

        const img = document.createElement("img");

            img.src = image;

            galleryEl.appendChild(img);

        });

    }

    modal.classList.add('active');
}
/**
 * Fecha o modal de serviços
 * Clica fora do modal também fecha
 */
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
}

/**
 * Abre o modal de contato
 * Utilizado pelos botões CTA espalhados pela página
 */
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
}

/**
 * Fecha o modal de contato
 * Clica fora do modal também fecha
 */
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
}

/**
 * Fecha modal quando clica fora do conteúdo
 * Funciona para ambos os modais
 */
document.addEventListener('click', (event) => {
    const serviceModal = document.getElementById('serviceModal');
    const contactModal = document.getElementById('contactModal');

    if (event.target === serviceModal) {
        closeServiceModal();
    }
    if (event.target === contactModal) {
        closeContactModal();
    }
});

// ============================================
// ACCORDION - Manutenção e FAQ
// ============================================

/**
 * Ativa/desativa itens do accordion
 * Fecha automaticamente o item anterior ao abrir novo
 * Funciona para manutenção e FAQ
 */
function setupAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item, .faq-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header, .faq-question');

        if (header) {
            header.addEventListener('click', () => {
                // Fecha todos os items do mesmo grupo
                const container = item.parentElement;
                container.querySelectorAll('.accordion-item.active, .faq-item.active').forEach(active => {
                    if (active !== item) {
                        active.classList.remove('active');
                    }
                });

                // Alterna o item atual
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Wrapper para FAQ especificamente
 * Permite controle independente
 */
function toggleFaq(element) {
    const faqItem = element.parentElement;

    // Fecha todos os FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Alterna o FAQ clicado
    faqItem.classList.toggle('active');
}

/**
 * Inicializa accordions ao carregar a página
 */
window.addEventListener('DOMContentLoaded', setupAccordion);

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================

/**
 * Manipula o envio do formulário de contato
 * Valida campos e prepara para integração com PHP/backend
 * @param {Event} event - Evento de submit do formulário
 *
 * IMPORTANTE: Este formulário deve ser integrado com backend PHP:
 * 1. Criar arquivo: php/enviar_contato.php
 * 2. Adicionar validação server-side
 * 3. Integrar com email/sistema de CRM
 * 4. Adicionar verificação CSRF e rate limiting
 */
function handleFormSubmit(event) {
    event.preventDefault();

    // Coleta valores do formulário
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validação básica client-side
    if (!name || !phone || !email || !message) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Validação de email
    if (!isValidEmail(email)) {
        alert('Por favor, insira um email válido!');
        return;
    }

    // Validação de telefone (básica)
    if (phone.replace(/\D/g, '').length < 10) {
        alert('Por favor, insira um telefone válido!');
        return;
    }

    // PRÓXIMA ETAPA: Integração com PHP
    // Substituir este console.log por fetch/AJAX
    console.log({
        name: name,
        phone: phone,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    });

    // Feedback visual ao usuário
    alert('Obrigado! Sua mensagem foi recebida. Entraremos em contato em breve!');

    // Limpa formulário
    document.querySelector('.contact-form').reset();

    // Fecha modal
    closeContactModal();

    // CÓDIGO FUTURO - Descomente ao integrar com PHP:
    // fetch('php/enviar_contato.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         name: name,
    //         phone: phone,
    //         email: email,
    //         message: message
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         alert('Mensagem enviada com sucesso!');
    //         document.querySelector('.contact-form').reset();
    //         closeContactModal();
    //     } else {
    //         alert('Erro ao enviar mensagem. Tente novamente.');
    //     }
    // })
    // .catch(error => {
    //     console.error('Erro:', error);
    //     alert('Erro de conexão. Tente novamente.');
    // });
}

/**
 * Valida formato de email
 * Regex básico para validação
 * @param {string} email - Email a validar
 * @returns {boolean} - True se válido
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// UTILITÁRIOS
// ============================================

/**
 * Formata telefone enquanto digita
 * Formato: (XX) XXXXX-XXXX
 * Pode ser chamado no evento 'input' do campo telefone
 */
function formatPhone(phoneInput) {
    let phone = phoneInput.value.replace(/\D/g, '');
    if (phone.length > 11) {
        phone = phone.substring(0, 11);
    }
    if (phone.length > 7) {
        phone = phone.substring(0, 5) + '-' + phone.substring(5);
    }
    if (phone.length > 5) {
        phone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2);
    }
    phoneInput.value = phone;
}

/**
 * Scroll suave para seção (já implementado com HTML)
 * Pode ser expandido se necessário
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================
// Qualquer inicialização adicional pode ser feita aqui
console.log('TecVolt Landing Page - Inicializada com sucesso!');