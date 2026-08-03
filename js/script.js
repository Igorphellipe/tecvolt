// AOS Init (o site continua funcional caso a biblioteca externa não carregue)
if (window.AOS) {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: false, mirror: true, offset: 100 });
}

// Navbar toggles
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navbar = document.getElementById('navbar');

if (hamburger && navbarMenu) {
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
    hamburger.setAttribute('aria-label', 'Abrir menu de navegacao');
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
}

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Conteudo dos modais de servico
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
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal.active')) document.body.classList.remove('modal-open');
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    calculateEstimatedTotal();
}

function openContactModalFromService() {
    const message = document.getElementById('message');
    closeServiceModal();
    openContactModal();
    if (message && selectedServiceName && !message.value.trim()) {
        message.value = `Gostaria de solicitar um orcamento para: ${selectedServiceName}.`;
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) return;
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
    if (hamburger && navbarMenu) {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }
});

function setupAccordion() {
    document.querySelectorAll('.accordion-item, .faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header, .faq-question');
        if (!header) return;

        header.addEventListener('click', () => {
            const container = item.parentElement;
            if (!container) return;

            container.querySelectorAll('.accordion-item.active, .faq-item.active').forEach(active => {
                if (active !== item) active.classList.remove('active');
            });

            item.classList.toggle('active');
        });
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
                if (activeButton) activeButton.setAttribute('aria-expanded', 'false');
                activeGroup.classList.remove('active');
                if (activePanel) activePanel.style.maxHeight = '0px';
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
            return;
        }

        if (currentGroup) currentGroup.panel.appendChild(child);
    });

    if (currentGroup) groups.push(currentGroup);
    if (groups.length === 0) return;

    container.innerHTML = '';
    groups.forEach(({ group }) => container.appendChild(group));
}

function setupServiceQuantityControls() {
    const serviceLabels = document.querySelectorAll('#servicesGrid label');

    serviceLabels.forEach(label => {
        const checkbox = label.querySelector('input[name="services"]');
        if (!checkbox || label.dataset.qtySetup === 'true') return;

        const serviceName = checkbox.value;
        const main = document.createElement('span');
        main.className = 'service-option-main';

        const title = document.createElement('span');
        title.className = 'service-option-title';
        title.textContent = serviceName;

        const qtyControl = document.createElement('span');
        qtyControl.className = 'service-qty-control';

        const decreaseBtn = document.createElement('button');
        decreaseBtn.type = 'button';
        decreaseBtn.className = 'service-qty-btn';
        decreaseBtn.setAttribute('aria-label', `Diminuir quantidade de ${serviceName}`);
        decreaseBtn.textContent = '-';

        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.className = 'service-qty-input';
        qtyInput.min = '0';
        qtyInput.max = '99';
        qtyInput.value = checkbox.checked ? '1' : '0';
        qtyInput.setAttribute('aria-label', `Quantidade de ${serviceName}`);

        const increaseBtn = document.createElement('button');
        increaseBtn.type = 'button';
        increaseBtn.className = 'service-qty-btn';
        increaseBtn.setAttribute('aria-label', `Aumentar quantidade de ${serviceName}`);
        increaseBtn.textContent = '+';

        const syncFromQty = () => {
            let qty = parseInt(qtyInput.value, 10);
            if (Number.isNaN(qty) || qty < 0) qty = 0;
            if (qty > 99) qty = 99;

            qtyInput.value = String(qty);
            checkbox.checked = qty > 0;
            checkbox.dataset.quantity = String(qty);
            calculateEstimatedTotal();
        };

        const syncFromCheckbox = () => {
            const currentQty = parseInt(qtyInput.value, 10) || 0;
            if (checkbox.checked && currentQty === 0) {
                qtyInput.value = '1';
            }
            if (!checkbox.checked) {
                qtyInput.value = '0';
            }
            checkbox.dataset.quantity = qtyInput.value;
            calculateEstimatedTotal();
        };

        decreaseBtn.addEventListener('click', event => {
            event.preventDefault();
            const currentQty = parseInt(qtyInput.value, 10) || 0;
            qtyInput.value = String(Math.max(0, currentQty - 1));
            syncFromQty();
        });

        increaseBtn.addEventListener('click', event => {
            event.preventDefault();
            const currentQty = parseInt(qtyInput.value, 10) || 0;
            qtyInput.value = String(Math.min(99, currentQty + 1));
            syncFromQty();
        });

        qtyInput.addEventListener('input', () => {
            syncFromQty();
        });

        checkbox.addEventListener('change', () => {
            syncFromCheckbox();
        });

        checkbox.dataset.quantity = qtyInput.value;

        main.appendChild(checkbox);
        main.appendChild(title);

        qtyControl.appendChild(decreaseBtn);
        qtyControl.appendChild(qtyInput);
        qtyControl.appendChild(increaseBtn);

        label.innerHTML = '';
        label.appendChild(main);
        label.appendChild(qtyControl);
        label.dataset.qtySetup = 'true';
    });
}

function getSelectedServiceItems() {
    const checkboxes = document.querySelectorAll('input[name="services"]');
    const selected = [];

    checkboxes.forEach(checkbox => {
        const qty = parseInt(checkbox.dataset.quantity || '0', 10);
        if (!checkbox.checked || qty <= 0) return;

        const price = parseFloat(checkbox.getAttribute('data-price')) || 0;
        selected.push({
            name: checkbox.value,
            quantity: qty,
            unitPrice: price,
            subtotal: price * qty
        });
    });

    return selected;
}

function calculateEstimatedTotal() {
    const selectedItems = getSelectedServiceItems();
    const total = selectedItems.reduce((acc, item) => acc + item.subtotal, 0);

    const formattedTotal = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const totalDisplay = document.getElementById('totalPriceDisplay');
    if (totalDisplay) totalDisplay.innerText = formattedTotal;

    updateWhatsAppLink(formattedTotal, selectedItems);
}

function updateWhatsAppLink(formattedTotal, selectedItems) {
    const waBtn = document.getElementById('btn-whatsapp-modal');
    if (!waBtn) return;

    const name = document.getElementById('name') ? document.getElementById('name').value.trim() : '';
    const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    const email = document.getElementById('email') ? document.getElementById('email').value.trim() : '';
    const userMessage = document.getElementById('message') ? document.getElementById('message').value.trim() : '';

    let baseText = 'Ola TecVolt! Gostaria de solicitar um orcamento.';

    if (name) baseText += `\n\n*Nome:* ${name}`;
    if (phone) baseText += `\n*Telefone:* ${phone}`;
    if (email) baseText += `\n*E-mail:* ${email}`;

    if (selectedItems.length > 0) {
        const lines = selectedItems.map(item => {
            return `- ${item.name} | Qtd: ${item.quantity}`;
        });

        baseText += `\n\n*Servicos desejados:*\n${lines.join('\n')}`;
    }

    if (userMessage) baseText += `\n\n*Mensagem:* ${userMessage}`;

    waBtn.href = `https://wa.me/5561999999999?text=${encodeURIComponent(baseText)}`;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !phone || !email) {
        alert('Por favor, preencha os campos obrigatorios.');
        return;
    }

    const selectedItems = getSelectedServiceItems();
    const total = document.getElementById('totalPriceDisplay')
        ? document.getElementById('totalPriceDisplay').innerText
        : 'R$ 0,00';

    console.log('=== NOVA SOLICITACAO DE ORCAMENTO ===');
    console.log('Nome:', name, '| Telefone:', phone, '| E-mail:', email);
    console.log(
        'Servicos:',
        selectedItems.length
            ? selectedItems.map(item => `${item.name} (Qtd: ${item.quantity})`).join(', ')
            : 'Nenhum selecionado diretamente'
    );
    console.log('Valor Estimado:', total);
    console.log('Mensagem:', message);

    alert(`Obrigado, ${name}! Sua solicitacao de orcamento (Estimativa: ${total}) foi recebida.`);

    const form = document.querySelector('.contact-form');
    if (form) form.reset();

    document.querySelectorAll('input[name="services"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.dataset.quantity = '0';
    });

    document.querySelectorAll('.service-qty-input').forEach(input => {
        input.value = '0';
    });

    calculateEstimatedTotal();
    closeContactModal();
}

function formatPhone(phoneInput) {
    let phone = phoneInput.value.replace(/\D/g, '');
    if (phone.length > 11) phone = phone.substring(0, 11);
    if (phone.length > 7) phone = `${phone.substring(0, 5)}-${phone.substring(5)}`;
    if (phone.length > 5) phone = `(${phone.substring(0, 2)}) ${phone.substring(2)}`;
    phoneInput.value = phone;
}

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
            labels.forEach(label => {
                label.style.display = 'flex';
            });
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

window.addEventListener('DOMContentLoaded', () => {
    setupAccordion();
    setupServiceCategoryDropdowns();
    setupServiceQuantityControls();
    calculateEstimatedTotal();

    ['name', 'phone', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener('input', () => {
            calculateEstimatedTotal();
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
        const safetySpacing = 16;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - safetySpacing;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    });
});
