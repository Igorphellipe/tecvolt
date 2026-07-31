// AOS Init (o site continua funcional caso a biblioteca externa não carregue)
if (window.AOS) {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: false, mirror: true, offset: 100 });
}

// Navbar toggles
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    const isOpen = navbarMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
});

document.querySelectorAll('.navbar-menu a, .navbar-menu button').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    });
});

hamburger.setAttribute('role', 'button');
hamburger.setAttribute('tabindex', '0');
hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
hamburger.setAttribute('aria-controls', 'navbarMenu');
hamburger.setAttribute('aria-expanded', 'false');
hamburger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        hamburger.click();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Conteúdo dos modais de serviço
const serviceDetails = {
    'Manutenção Residencial': {
        description: 'Inspeção, diagnóstico e correção de falhas em instalações residenciais. Atuamos em tomadas, iluminação, chuveiros, disjuntores, aterramento e dispositivos de proteção, sempre com foco na segurança da sua família.',
        images: [
            'assets/manutencao-residencial.png',
            'assets/instalacao-completa.png',
            'assets/montagem-quadros.png',
            'assets/seguranca-e-conformidade.png'
        ]
    },
    'Manutenção Comercial': {
        description: 'Manutenção preventiva e corretiva para lojas, escritórios e condomínios, reduzindo paradas e riscos. Avaliamos circuitos, iluminação, quadros, cargas e pontos de consumo conforme a operação do negócio.',
        images: [
            'assets/manutencao-comercial.png',
            'assets/instalacao-completa.png',
            'assets/montagem-quadros.png',
            'assets/seguranca-e-conformidade.png'
        ]
    },
    'Manutenção Industrial': {
        description: 'Soluções para instalações e equipamentos industriais, com diagnóstico técnico, manutenção de painéis e circuitos de potência e ações preventivas para aumentar a confiabilidade da operação.',
        images: [
            'assets/manutencao-industrial.png',
            'assets/montagem-quadros.png',
            'assets/instalacao-completa.png',
            'assets/seguranca-e-conformidade.png'
        ]
    },
    'Instalação Elétrica': {
        description: 'Projetos e instalações elétricas completas para obras novas, reformas e ampliações. Executamos o dimensionamento e a distribuição dos circuitos com organização, eficiência e conformidade técnica.',
        images: [
            'assets/instalacao-completa.png',
            'assets/manutencao-residencial.png',
            'assets/manutencao-comercial.png',
            'assets/montagem-quadros.png'
        ]
    },
    'Quadros Elétricos': {
        description: 'Montagem, organização e adequação de quadros de distribuição e painéis elétricos. Instalamos e dimensionamos disjuntores, DR, DPS, barramentos e identificações para uma proteção eficiente.',
        images: [
            'assets/montagem-quadros.png',
            'assets/instalacao-completa.png',
            'assets/manutencao-comercial.png',
            'assets/manutencao-industrial.png'
        ]
    },
    'Conformidade': {
        description: 'Inspeção das instalações, identificação de riscos e adequações às normas técnicas aplicáveis. Entregamos uma avaliação clara das não conformidades e das melhorias recomendadas.',
        images: [
            'assets/seguranca-e-conformidade.png',
            'assets/montagem-quadros.png',
            'assets/manutencao-residencial.png',
            'assets/manutencao-industrial.png'
        ]
    }
};

let selectedServiceName = '';

// Modals
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    const titleEl = document.getElementById('modalServiceTitle');
    const descEl = document.getElementById('modalServiceDesc');
    const galleryEl = document.getElementById('modalGallery');
    const details = serviceDetails[serviceName];

    if (!modal || !titleEl || !descEl || !galleryEl || !details) return;

    selectedServiceName = serviceName;
    titleEl.textContent = serviceName;
    descEl.textContent = details.description;
    galleryEl.replaceChildren(...details.images.map((src, index) => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = `${serviceName} - imagem ${index + 1}`;
        image.loading = 'lazy';
        return image;
    }));
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.active')) document.body.classList.remove('modal-open');
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function openContactModalFromService() {
    const message = document.getElementById('message');
    closeServiceModal();
    openContactModal();
    if (message && selectedServiceName && !message.value.trim()) {
        message.value = `Gostaria de solicitar um orçamento para: ${selectedServiceName}.`;
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.active')) document.body.classList.remove('modal-open');
}

document.addEventListener('click', (event) => {
    const serviceModal = document.getElementById('serviceModal');
    const contactModal = document.getElementById('contactModal');
    if (event.target === serviceModal) closeServiceModal();
    if (event.target === contactModal) closeContactModal();
});

document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeServiceModal();
    closeContactModal();
    hamburger.classList.remove('active');
    navbarMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
});

// Accordion
function setupAccordion() {
    document.querySelectorAll('.accordion-item, .faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header, .faq-question');
        if (header) {
            header.addEventListener('click', () => {
                const container = item.parentElement;
                container.querySelectorAll('.accordion-item.active, .faq-item.active').forEach(active => {
                    if (active !== item) active.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });
}

function setupServiceCategoryDropdowns() {
    const container = document.getElementById('servicesGrid');
    if (!container || container.querySelector('.service-category-group')) return;

    const groups = [];
    const children = Array.from(container.children);
    let currentGroup = null;

    const createGroup = (title) => {
        const group = document.createElement('div');
        group.className = 'service-category-group';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'service-category-toggle';
        button.setAttribute('aria-expanded', 'false');
        button.innerHTML = `<span>${title}</span><i class="fas fa-chevron-down"></i>`;

        const panel = document.createElement('div');
        panel.className = 'service-category-panel';

        button.addEventListener('click', () => {
            const isOpen = button.getAttribute('aria-expanded') === 'true';
            const parent = button.closest('.services-checkbox-grid');
            const activeGroup = parent ? parent.querySelector('.service-category-group.active') : null;

            if (activeGroup && activeGroup !== group) {
                const activeButton = activeGroup.querySelector('.service-category-toggle');
                const activePanel = activeGroup.querySelector('.service-category-panel');
                activeButton.setAttribute('aria-expanded', 'false');
                activeGroup.classList.remove('active');
                activePanel.style.maxHeight = '0px';
            }

            const shouldOpen = !isOpen;
            button.setAttribute('aria-expanded', String(shouldOpen));
            group.classList.toggle('active', shouldOpen);

            if (shouldOpen) {
                panel.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    panel.style.maxHeight = `${panel.scrollHeight + 24}px`;
                });
            } else {
                panel.style.maxHeight = '0px';
            }
        });

        group.appendChild(button);
        group.appendChild(panel);
        return { group, panel };
    };

    children.forEach(child => {
        if (child.tagName === 'H4' && child.classList.contains('service-category')) {
            if (currentGroup) groups.push(currentGroup);
            currentGroup = createGroup(child.textContent.trim());
        } else if (currentGroup) {
            currentGroup.panel.appendChild(child);
        }
    });

    if (currentGroup) groups.push(currentGroup);

    if (groups.length === 0) return;

    container.innerHTML = '';
    groups.forEach(({ group }) => container.appendChild(group));
}

window.addEventListener('DOMContentLoaded', () => {
    setupAccordion();
    setupServiceCategoryDropdowns();
});

function calculateEstimatedTotal() {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    let total = 0;
    let selectedServices = [];

    checkboxes.forEach(cb => {
        total += parseFloat(cb.getAttribute('data-price'));
        selectedServices.push(cb.value);
    });

    // Update UI Display
    const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('totalPriceDisplay').innerText = formattedTotal;

    // Update WhatsApp Link
    updateWhatsAppLink(formattedTotal, selectedServices);
}

function updateWhatsAppLink(formattedTotal, selectedServices) {
    const waBtn = document.getElementById('btn-whatsapp-modal');
    let baseText = "Olá TecVolt! Gostaria de solicitar um orçamento.";

    if (selectedServices.length > 0) {
        baseText += `\n\n*Serviços Desejados:* \n- ${selectedServices.join('\n- ')}`;
        baseText += `\n\n*Estimativa da Tabela:* ${formattedTotal}`;
    }

    waBtn.href = `https://wa.me/5561999999999?text=${encodeURIComponent(baseText)}`;
}

// Add listeners to checkboxes
document.querySelectorAll('input[name="services"]').forEach(cb => {
    cb.addEventListener('change', calculateEstimatedTotal);
});

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    let selectedServices = [];
    checkboxes.forEach(cb => selectedServices.push(cb.value));

    const total = document.getElementById('totalPriceDisplay').innerText;

    if (!name || !phone) {
        alert('Por favor, preencha os campos obrigatórios!');
        return;
    }

    console.log("=== NOVA SOLICITAÇÃO DE ORÇAMENTO ===");
    console.log("Nome:", name, "| Telefone:", phone);
    console.log("Serviços:", selectedServices.length ? selectedServices.join(', ') : "Nenhum selecionado diretamente");
    console.log("Valor Estimado:", total);
    console.log("Mensagem:", message);

    alert(`Obrigado, ${name}! Sua solicitação de orçamento (Estimativa: ${total}) foi recebida. Entraremos em contato no número ${phone} em breve!`);
    document.querySelector('.contact-form').reset();
    calculateEstimatedTotal(); // Reset Total
    closeContactModal();
}

function formatPhone(phoneInput) {
    let phone = phoneInput.value.replace(/\D/g, '');
    if (phone.length > 11) phone = phone.substring(0, 11);
    if (phone.length > 7) phone = phone.substring(0, 5) + '-' + phone.substring(5);
    if (phone.length > 5) phone = '(' + phone.substring(0, 2) + ') ' + phone.substring(2);
    phoneInput.value = phone;
}

// ============================================
//   PESQUISA/FILTRO DE SERVIÇOS NO MODAL
// ============================================
function filterServices() {
    const input = document.getElementById('serviceSearch');
    const grid = document.getElementById('servicesGrid');
    if (!input || !grid) return;

    const filter = input.value.toLowerCase().trim();
    const groups = grid.querySelectorAll('.service-category-group');

    groups.forEach(group => {
        const labels = Array.from(group.querySelectorAll('label'));
        const visibleLabels = labels.filter(label => label.textContent.toLowerCase().includes(filter));
        const panel = group.querySelector('.service-category-panel');

        if (!filter) {
            group.style.display = 'block';
            labels.forEach(label => label.style.display = 'flex');
            group.classList.remove('active');
            if (panel) panel.style.maxHeight = '0px';
            return;
        }

        if (visibleLabels.length > 0) {
            group.style.display = 'block';
            labels.forEach(label => {
                label.style.display = visibleLabels.includes(label) ? 'flex' : 'none';
            });
            group.classList.add('active');
            if (panel) panel.style.maxHeight = `${panel.scrollHeight}px`;
        } else {
            group.style.display = 'none';
        }
    });
}

// ============================================
//   CÁLCULO AUTOMÁTICO DE ORÇAMENTO
// ============================================
function calculateEstimatedTotal() {
    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    let total = 0;
    let selectedServices = [];

    checkboxes.forEach(cb => {
        total += parseFloat(cb.getAttribute('data-price'));
        selectedServices.push(cb.value);
    });

    // Atualiza o display do valor total na tela
    const formattedTotal = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const totalDisplay = document.getElementById('totalPriceDisplay');
    if (totalDisplay) {
        totalDisplay.innerText = formattedTotal;
    }

    // Atualiza também o link do WhatsApp para incluir os serviços e o orçamento estimado
    updateWhatsAppLink(selectedServices);
}

function updateWhatsAppLink(selectedServices) {
    const waBtn = document.querySelector('.btn-whatsapp');
    if (!waBtn) return;

    let baseText = "Olá TecVolt! Gostaria de solicitar um orçamento.";

    if (selectedServices.length > 0) {
        baseText += `\n\n*Serviços Desejados:* \n- ${selectedServices.join('\n- ')}`;
    }

    waBtn.href = `https://wa.me/5561999999999?text=${encodeURIComponent(baseText)}`;
}

// Adiciona o evento de escuta a todos os checkboxes de serviços
document.querySelectorAll('input[name="services"]').forEach(cb => {
    cb.addEventListener('change', calculateEstimatedTotal);
});

// Modifique também a função handleFormSubmit existente para registrar os serviços no console/alerta se necessário:
const originalHandleFormSubmit = window.handleFormSubmit;
window.handleFormSubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    const checkboxes = document.querySelectorAll('input[name="services"]:checked');
    let selectedServices = [];
    checkboxes.forEach(cb => selectedServices.push(cb.value));

    const total = document.getElementById('totalPriceDisplay') ? document.getElementById('totalPriceDisplay').innerText : "R$ 0,00";

    if (!name || !phone) {
        alert('Por favor, preencha os campos obrigatórios!');
        return;
    }

    alert(`Obrigado, ${name}! Sua solicitação de orçamento (Estimativa: ${total}) foi recebida. Entraremos em contato em breve!`);

    // Reseta o formulário e os checkboxes
    document.querySelector('.contact-form').reset();
    calculateEstimatedTotal();
    closeContactModal();
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const safetySpacing = 16;
        const targetPosition = target.getBoundingClientRect().top
            + window.scrollY
            - navbarHeight
            - safetySpacing;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    });
});
