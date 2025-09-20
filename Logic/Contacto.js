// JavaScript para funcionalidad de la página contacto

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Contacto cargada');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initFormValidation();
    initFAQ();
    initContactButtons();
    initAnimations();
    
    // Funcionalidad del botón de Iniciar Sesión
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Efecto visual de click
            this.style.transform = 'translateY(-1px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Redirigir a la página de login
            window.location.href = '/pages/Login.html';
        });
    }
});

// Funcionalidad de navegación
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Solo interceptar si no tiene href o es un enlace interno
            if (!this.href || this.href.includes('#')) {
                e.preventDefault();
                
                // Remover clase active de todos los elementos
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Añadir clase active al elemento clickeado
                this.classList.add('active');
                
                // Mostrar mensaje según la sección
                const text = this.textContent.trim();
                switch(text) {
                    case 'Inicio':
                        window.location.href = '/index.html';
                        break;
                    case 'Mapa':
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        window.location.href = '/pages/Educativo.html';
                        break;
                    case 'Sugerir Punto':
                        window.location.href = '/pages/SugerirPunto.html';
                        break;
                    case 'Contacto':
                        // Ya estamos en la página contacto
                        break;
                    case 'Configuración':
                        alert('Sección Configuración - Próximamente disponible');
                        break;
                }
            }
            // Si tiene href válido, permitir navegación normal
        });
    });
}

// Validación del formulario
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar todos los campos
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Efecto visual de envío
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.style.background = '#22c55e';
                
                // Mostrar mensaje de éxito
                showSuccessMessage();
                
                // Resetear formulario después de un tiempo
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    // Limpiar clases de validación
                    const fields = form.querySelectorAll('.form-field');
                    fields.forEach(field => {
                        field.classList.remove('success', 'error');
                        const errorMsg = field.querySelector('.error-message');
                        if (errorMsg) errorMsg.remove();
                    });
                }, 3000);
            }, 2000);
        }
    });
}

function validateField(field) {
    const fieldContainer = field.closest('.form-field');
    const value = field.value.trim();
    
    // Remover clases de error/success anteriores
    fieldContainer.classList.remove('error', 'success');
    
    // Validaciones específicas
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldContainer, 'Este campo es obligatorio');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldContainer, 'Ingresa un email válido');
        return false;
    }
    
    if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
        showFieldError(fieldContainer, 'Formato inválido');
        return false;
    }
    
    // Si llegamos aquí, el campo es válido
    fieldContainer.classList.add('success');
    return true;
}

function showFieldError(fieldContainer, message) {
    fieldContainer.classList.add('error');
    
    // Remover mensaje de error anterior
    const existingError = fieldContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo mensaje de error
    const errorMessage = document.createElement('span');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 5px; display: block;';
    fieldContainer.appendChild(errorMessage);
}

function clearFieldError(field) {
    const fieldContainer = field.closest('.form-field');
    fieldContainer.classList.remove('error');
    const errorMessage = fieldContainer.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Funciones de validación
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funcionalidad del FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.querySelector('.search-input');
    
    // Toggle FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Efecto visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Búsqueda en FAQ
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Funcionalidad de botones de contacto
function initContactButtons() {
    // Botones de métodos de contacto
    const methodBtns = document.querySelectorAll('.method-btn');
    methodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            const method = this.textContent.trim();
            switch(method) {
                case 'Llamar ahora':
                    alert('Funcionalidad de llamada próximamente disponible');
                    break;
                case 'Enviar email':
                    window.location.href = 'mailto:contacto@greenity.com';
                    break;
                case 'Iniciar chat':
                    alert('Chat en vivo próximamente disponible');
                    break;
            }
        });
    });
    
    // Botón de ubicación
    const locationBtn = document.querySelector('.location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            alert('Funcionalidad de Google Maps próximamente disponible');
        });
    }
    
    // Botón de contacto directo
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Scroll al formulario
            const form = document.querySelector('.form-section');
            form.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Animaciones
function initAnimations() {
    // Animación de entrada para las tarjetas informativas
    const infoCards = document.querySelectorAll('.info-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
        cardObserver.observe(card);
    });
    
    // Animación de entrada para los items del FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    const faqObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        faqObserver.observe(item);
    });
    
    // Efecto de hover en botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Efecto de focus en inputs
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
            <div>
                <div style="font-weight: 600; font-size: 1.1rem;">¡Mensaje enviado!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">Te responderemos en 24 horas</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 500);
    }, 4000);
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-field.success .form-input,
    .form-field.success .form-textarea,
    .form-field.success .form-select {
        border-color: #22c55e;
        background: rgba(34, 197, 94, 0.05);
    }
    
    .form-field.error .form-input,
    .form-field.error .form-textarea,
    .form-field.error .form-select {
        border-color: #ef4444;
        background: rgba(239, 68, 68, 0.05);
    }
`;
document.head.appendChild(style);

console.log('Greenity - Página Contacto cargada correctamente con todas las funcionalidades');