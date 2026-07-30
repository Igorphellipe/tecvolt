// AOS Init
AOS.init({ duration: 1000, easing: 'ease-in-out', once: false, mirror: true, offset: 100 });

// Navbar toggles
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

document.querySelectorAll('.navbar-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Modals
function openServiceModal(serviceName) {
    const modal = document.getElementById('serviceModal');
    const titleEl = document.getElementById('modalServiceTitle');
    const descEl = document.getElementById('modalServiceDesc');
    titleEl.textContent = serviceName;
    descEl.textContent = "Oferecemos inspeção completa, diagnóstico e adequação às normas de segurança da sua instalação.";
    modal.classList.add('active');
}

function closeServiceModal() { document.getElementById('serviceModal').classList.remove('active'); }
function openContactModal() { document.getElementById('contactModal').classList.add('active'); }
function closeContactModal() { document.getElementById('contactModal').classList.remove('active'); }

document.addEventListener('click', (event) => {
    const serviceModal = document.getElementById('serviceModal');
    const contactModal = document.getElementById('contactModal');
    if (event.target === serviceModal) closeServiceModal();
    if (event.target === contactModal) closeContactModal();
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
        if (href !== '#' && href !== '#!' && document.querySelector(href)) {
            e.preventDefault();
            window.scrollTo({ top: document.querySelector(href).offsetTop - 100, behavior: 'smooth' });
        }
    });
});