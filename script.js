// ===== NAVBAR FIXA E MENU MOBILE =====

// Elementos da navbar
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

// 1. NAVBAR FIXA AO ROLAR
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// 2. MENU MOBILE TOGGLE
if (menuToggle && mobileMenu) {
    // Alternar menu hamburguer/X
    function toggleMobileMenu() {
        const isHidden = mobileMenu.hasAttribute('hidden');
        
        if (isHidden) {
            // Abrir menu
            mobileMenu.removeAttribute('hidden');
            menuToggle.setAttribute('aria-expanded', 'true');
            menuToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            // Fechar menu
            mobileMenu.setAttribute('hidden', '');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    }
    
    // Evento do botão hamburguer
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Fechar menu ao clicar nos links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.setAttribute('hidden', '');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.hasAttribute('hidden') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.setAttribute('hidden', '');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            `;
        }
    });
}

// 3. AJUSTAR ÂNCORAS PARA NAVBAR FIXA
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        
        // Ajustar padding do body
        document.body.style.paddingTop = navbarHeight + 'px';
        
        // Ajustar scroll-padding para âncoras
        document.documentElement.style.scrollPaddingTop = navbarHeight + 'px';
        
        // Corrigir links âncora
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se aberto
                    if (mobileMenu && !mobileMenu.hasAttribute('hidden')) {
                        mobileMenu.setAttribute('hidden', '');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }
});

// 4. RECALCULAR AO REDIMENSIONAR
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const navbarHeight = navbar.offsetHeight;
        document.body.style.paddingTop = navbarHeight + 'px';
        document.documentElement.style.scrollPaddingTop = navbarHeight + 'px';
    }
});

// ===== WHATSAPP INTELIGENTE =====
document.addEventListener('DOMContentLoaded', function() {
    let whatsappBtn = document.querySelector('.whatsapp-simple') || 
                     document.querySelector('.whatsapp-float') ||
                     document.querySelector('a[href*="whatsapp"], a[href*="wa.me"]');
    
    if (whatsappBtn) {
        console.log('✅ Botão WhatsApp encontrado!');
        
        // Função para ajustar mensagem
        function ajustarMensagemWhatsApp() {
            const servicosSection = document.getElementById('servicos');
            const quemSomosSection = document.getElementById('quem-somos');
            const contatoSection = document.getElementById('contato');
            
            let mensagemPadrao = "Olá! Gostaria de um orçamento para conserto elétrico automotivo.";
            let numeroWhatsApp = "5518997739062";
            
            // Verifica qual seção está visível
            if (elementoVisivel(servicosSection)) {
                mensagemPadrao = "Olá! Vi os serviços no site e gostaria de um orçamento para:";
            } else if (elementoVisivel(quemSomosSection)) {
                mensagemPadrao = "Olá! Gostei do trabalho de vocês, preciso de ajuda com:";
            } else if (elementoVisivel(contatoSection)) {
                mensagemPadrao = "Olá! Estou na página de contato, preciso falar sobre:";
            }
            
            // Atualiza o link
            const novaURL = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagemPadrao)}`;
            whatsappBtn.href = novaURL;
        }
        
        // Função para verificar visibilidade
        function elementoVisivel(el) {
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= window.innerHeight * 0.8 &&
                rect.bottom >= window.innerHeight * 0.2
            );
        }
        
        // Ajustar mensagem ao scroll
        window.addEventListener('scroll', function() {
            setTimeout(ajustarMensagemWhatsApp, 100);
        });
        
        // Inicializar
        ajustarMensagemWhatsApp();
        
        // Tracking de clique
        whatsappBtn.addEventListener('click', function() {
            console.log('📱 WhatsApp clicado!');
        });
    } else {
        console.log('⚠️ Botão WhatsApp não encontrado');
    }
});

// ===== FUNCIONALIDADES DA PÁGINA FAQ =====

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. TOGGLE PARA ABRIR/FECHAR RESPOSTAS
    const faqItems = document.querySelectorAll('.faq-item');
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    // Adicionar índice para animação em cascata
    faqItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
        
        // Abrir primeiro item por padrão
        if (index === 0) {
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            answer.classList.add('show');
            toggle.classList.add('open');
            toggle.textContent = '−';
        }
    });
    
    // Adicionar evento de clique aos toggles
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const item = this.closest('.faq-item');
            const answer = item.querySelector('.faq-answer');
            
            // Fechar todas as outras respostas (opcional)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         const otherAnswer = otherItem.querySelector('.faq-answer');
            //         const otherToggle = otherItem.querySelector('.faq-toggle');
            //         otherAnswer.classList.remove('show');
            //         otherToggle.classList.remove('open');
            //         otherToggle.textContent = '+';
            //     }
            // });
            
            // Alternar estado atual
            if (answer.classList.contains('show')) {
                // Fechar
                answer.classList.remove('show');
                this.classList.remove('open');
                this.textContent = '+';
            } else {
                // Abrir
                answer.classList.add('show');
                this.classList.add('open');
                this.textContent = '−';
            }
        });
    });
    
    // 2. PESQUISA EM TEMPO REAL (se tiver campo de busca)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (searchTerm === '' || question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Se encontrou no texto, destaque
                    if (searchTerm && (question.includes(searchTerm) || answer.includes(searchTerm))) {
                        item.style.animation = 'highlight 0.5s ease';
                        setTimeout(() => {
                            item.style.animation = '';
                        }, 500);
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // 3. ABRIR FAQ PELA URL (ex: faq.html#q5)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#q')) {
        const faqId = hash.replace('#q', '');
        const targetItem = document.querySelector(`.faq-item[data-id="${faqId}"]`);
        
        if (targetItem) {
            setTimeout(() => {
                const answer = targetItem.querySelector('.faq-answer');
                const toggle = targetItem.querySelector('.faq-toggle');
                
                // Abrir resposta
                answer.classList.add('show');
                toggle.classList.add('open');
                toggle.textContent = '−';
                
                // Scroll suave até o item
                targetItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Destacar
                targetItem.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.3)';
                setTimeout(() => {
                    targetItem.style.boxShadow = '';
                }, 2000);
            }, 500);
        }
    }
    
    // 4. COMPARTILHAR LINK ESPECÍFICO DA FAQ
    faqItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('faq-toggle')) {
                const faqId = this.getAttribute('data-id');
                const shareUrl = `${window.location.origin}${window.location.pathname}#q${faqId}`;
                
                // Atualizar URL sem recarregar
                history.pushState(null, null, `#q${faqId}`);
                
                // Feedback visual
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
    
    // 5. CONTADOR DE CLICKS NAS FAQs (para analytics)
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const faqId = this.getAttribute('data-id');
            console.log(`FAQ ${faqId} clicada`);
            
            // Para Google Analytics (se tiver)
            // gtag('event', 'faq_click', {
            //     'faq_id': faqId,
            //     'faq_question': this.querySelector('.faq-question').textContent
            // });
        });
    });
    
    // 6. ANIMAÇÃO DE ENTRADA
    setTimeout(() => {
        document.querySelector('.faq-section').style.opacity = '1';
    }, 100);
});

// ===== FUNÇÃO PARA COPIAR LINK DA FAQ =====
function copiarLinkFAQ(faqId) {
    const link = `${window.location.origin}${window.location.pathname}#q${faqId}`;
    
    navigator.clipboard.writeText(link).then(() => {
        // Feedback visual
        const item = document.querySelector(`.faq-item[data-id="${faqId}"]`);
        const originalText = item.querySelector('.faq-question span').textContent;
        
        item.querySelector('.faq-question span').textContent = '✓ Link copiado!';
        item.style.backgroundColor = 'rgba(37, 211, 102, 0.1)';
        
        setTimeout(() => {
            item.querySelector('.faq-question span').textContent = originalText;
            item.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar link:', err);
    });
}

// ===== EXPORTAR FUNÇÕES (se necessário) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { copiarLinkFAQ };
}

// script-carrossel.js
document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel-ativo');
    const track = document.querySelector('.carrossel-track-ativo');
    
    if (!track) return;
    
    // Clonar logos para efeito infinito mais suave
    const logos = track.querySelectorAll('.logo-ativa');
    const logosParaClonar = Array.from(logos).slice(0, 8); // Pega as primeiras 8
    
    // Adiciona cópias no final
    logosParaClonar.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Ajustar velocidade com scroll
    let velocidade = 1;
    const velocidadeMin = 0.5;
    const velocidadeMax = 2;
    
    window.addEventListener('wheel', function(e) {
        const rect = carrossel.getBoundingClientRect();
        const estaVisivel = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (estaVisivel) {
            if (e.deltaY > 0) {
                // Scroll para baixo = mais rápido
                velocidade = Math.min(velocidade + 0.1, velocidadeMax);
            } else {
                // Scroll para cima = mais devagar
                velocidade = Math.max(velocidade - 0.1, velocidadeMin);
            }
            
            track.style.animationDuration = `${30 / velocidade}s`;
        }
    }, { passive: true });
    
    // Resetar velocidade após 3 segundos sem scroll
    let timeoutVelocidade;
    window.addEventListener('scroll', function() {
        clearTimeout(timeoutVelocidade);
        timeoutVelocidade = setTimeout(() => {
            velocidade = 1;
            track.style.animationDuration = '30s';
        }, 3000);
    });
    
    // Console log para debug
    console.log('Carrossel carregado:', {
        totalLogos: track.children.length,
        animation: getComputedStyle(track).animation,
        width: track.scrollWidth + 'px'
    });
});