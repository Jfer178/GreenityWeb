// JavaScript para funcionalidad de la página sugerir punto

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Sugerir Punto cargada');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initFormValidation();
    initLocationButtons();
    initFileUpload();
    initFormSubmission();
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
                        // Ya estamos en la página sugerir punto
                        break;
                    case 'Contacto':
                        alert('Sección Contacto - Próximamente disponible');
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
    const form = document.getElementById('suggestionForm');
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
    
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(fieldContainer, 'Ingresa un teléfono válido');
        return false;
    }
    
    if (field.type === 'url' && value && !isValidURL(value)) {
        showFieldError(fieldContainer, 'Ingresa una URL válida');
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

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Funcionalidad de botones de ubicación
function initLocationButtons() {
    const useCurrentLocationBtn = document.getElementById('useCurrentLocation');
    const openMapBtn = document.getElementById('openMap');
    
    if (useCurrentLocationBtn) {
        useCurrentLocationBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            if (navigator.geolocation) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obteniendo ubicación...';
                this.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        // Simular llenado de campos
                        setTimeout(() => {
                            document.getElementById('address').value = 'Ubicación obtenida automáticamente';
                            document.getElementById('city').value = 'Ciudad detectada';
                            
                            useCurrentLocationBtn.innerHTML = '<i class="fas fa-check"></i> Ubicación obtenida';
                            useCurrentLocationBtn.style.background = '#22c55e';
                            
                            setTimeout(() => {
                                useCurrentLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Usar mi ubicación actual';
                                useCurrentLocationBtn.style.background = '';
                                useCurrentLocationBtn.disabled = false;
                            }, 2000);
                        }, 1000);
                    },
                    function(error) {
                        useCurrentLocationBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error al obtener ubicación';
                        useCurrentLocationBtn.style.background = '#ef4444';
                        
                        setTimeout(() => {
                            useCurrentLocationBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Usar mi ubicación actual';
                            useCurrentLocationBtn.style.background = '';
                            useCurrentLocationBtn.disabled = false;
                        }, 2000);
                    }
                );
            } else {
                alert('Tu navegador no soporta geolocalización');
            }
        });
    }
    
    if (openMapBtn) {
        openMapBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            alert('Funcionalidad de selección en mapa próximamente disponible');
        });
    }
}

// Funcionalidad de carga de archivos
function initFileUpload() {
    const fileInput = document.getElementById('photos');
    const fileLabel = document.querySelector('.file-upload-label');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                fileLabel.innerHTML = `<i class="fas fa-check"></i> ${files.length} archivo(s) seleccionado(s)`;
                fileLabel.style.background = 'rgba(34, 197, 94, 0.1)';
                fileLabel.style.borderColor = '#22c55e';
                fileLabel.style.color = '#22c55e';
            }
        });
    }
}

// Funcionalidad de envío del formulario
function initFormSubmission() {
    const form = document.getElementById('suggestionForm');
    const saveDraftBtn = document.getElementById('saveDraft');
    const submitBtn = document.getElementById('submitForm');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular guardado de borrador
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Borrador guardado';
                this.style.background = '#22c55e';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Guardar Borrador';
                    this.style.background = '';
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    if (form && submitBtn) {
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
            
            // Validar checkboxes de materiales
            const materialCheckboxes = form.querySelectorAll('input[name="materials"]:checked');
            if (materialCheckboxes.length === 0) {
                alert('Por favor selecciona al menos un material que acepta el punto de reciclaje');
                isValid = false;
            }
            
            // Validar términos y condiciones
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                alert('Debes aceptar los términos y condiciones');
                isValid = false;
            }
            
            if (isValid) {
                // Efecto visual de envío
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                // Simular envío
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                    submitBtn.style.background = '#22c55e';
                    
                    // Mostrar mensaje de éxito
                    showSuccessMessage();
                    
                    // Resetear formulario después de un tiempo
                    setTimeout(() => {
                        form.reset();
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Sugerencia';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('loading');
                        
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
                <div style="font-weight: 600; font-size: 1.1rem;">¡Sugerencia enviada!</div>
                <div style="font-size: 0.9rem; opacity: 0.9;">Gracias por contribuir a nuestra comunidad</div>
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

// Animaciones adicionales
function initAnimations() {
    // Efecto de hover en checkboxes
    const checkboxes = document.querySelectorAll('.checkbox-item');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        checkbox.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
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
    
    // Animación de entrada para las categorías de materiales
    const materialCategories = document.querySelectorAll('.material-category');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    materialCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        category.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(category);
    });
    
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
    
    // Animación de entrada para las estadísticas
    const statItems = document.querySelectorAll('.stat-item');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Animación de conteo para los números
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    animateCounter(statNumber);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        statObserver.observe(item);
    });
    
    // Animación de entrada para los pasos del proceso
    const processSteps = document.querySelectorAll('.process-step');
    const stepObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });
    
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        step.style.transitionDelay = `${index * 0.2}s`;
        stepObserver.observe(step);
    });
}

// Función para animar contadores
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 2000; // 2 segundos
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Función de easing para suavizar la animación
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOutCubic);
        
        // Formatear el número con comas
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
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
`;
document.head.appendChild(style);

console.log('Grennity - Página Sugerir Punto cargada correctamente con todas las funcionalidades');