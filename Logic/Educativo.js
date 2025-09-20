// JavaScript para funcionalidad de la página educativa

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Educativa cargada');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initHeroButtons();
    initMaterialTabs();
    initAnimations();
    initScrollEffects();
    initShareButtons();
    initCertificationSystem();
    
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
                        // Ya estamos en la página educativa
                        break;
                    case 'Sugerir Punto':
                        alert('Sección Sugerir Punto - Próximamente disponible');
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

// Funcionalidad de botones del hero
function initHeroButtons() {
    const videoBtn = document.querySelector('.hero-buttons .btn-primary');
    const downloadBtn = document.querySelector('.hero-buttons .btn-secondary');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular carga de video
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando video...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Reproduciendo guía en video - Funcionalidad próximamente disponible');
            }, 2000);
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular descarga
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Descargando guía PDF - Funcionalidad próximamente disponible');
            }, 1500);
        });
    }
}

// Funcionalidad de tabs de materiales
function initMaterialTabs() {
    const materialTabs = document.querySelectorAll('.material-tab');
    const materialGuides = document.querySelectorAll('.material-guide');
    
    materialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const material = this.getAttribute('data-material');
            
            // Efecto visual en el tab
            this.style.transform = 'translateY(-2px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Remover clase active de todos los tabs
            materialTabs.forEach(t => t.classList.remove('active'));
            materialGuides.forEach(g => g.classList.remove('active'));
            
            // Añadir clase active al tab clickeado
            this.classList.add('active');
            
            // Mostrar la guía correspondiente con animación
            const guide = document.getElementById(material);
            if (guide) {
                // Pequeño delay para la animación
                setTimeout(() => {
                    guide.classList.add('active');
                }, 100);
            }
        });
    });
}


// Funcionalidad de botones de compartir
function initShareButtons() {
    const shareBtn = document.querySelector('.share-buttons .btn-outline');
    const downloadBtn = document.querySelector('.share-buttons .btn-primary');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular compartir
            if (navigator.share) {
                navigator.share({
                    title: 'Guía de Reciclaje - Grennity',
                    text: 'Aprende a reciclar correctamente con esta guía completa',
                    url: window.location.href
                });
            } else {
                // Fallback para navegadores que no soportan Web Share API
                const shareText = '¡Mira esta increíble guía de reciclaje! Aprende a reciclar correctamente y ayuda al medio ambiente.';
                const shareUrl = window.location.href;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
                        alert('¡Enlace copiado al portapapeles! Compártelo con tus amigos.');
                    });
                } else {
                    alert('Comparte este enlace: ' + shareUrl);
                }
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'translateY(-3px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular descarga de guía completa
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando descarga...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Descargando guía completa en PDF - Funcionalidad próximamente disponible');
            }, 2000);
        });
    }
}

// Animaciones de scroll
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar animación a las tarjetas
    const animatedElements = document.querySelectorAll('.step-card, .myth-card, .tip-card, .fact-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Efectos visuales adicionales
function initAnimations() {
    // Efecto hover en las tarjetas de pasos
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en las tarjetas de mitos
    const mythCards = document.querySelectorAll('.myth-card');
    mythCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en las tarjetas de consejos
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover en los elementos de la tabla
    const tableItems = document.querySelectorAll('.table-item');
    tableItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(34, 197, 94, 0.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Efecto de click en los botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline, .material-tab');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Sistema de Certificación
function initCertificationSystem() {
    // Mostrar pop-up después de 10 segundos
    setTimeout(() => {
        showCertificationPopup();
    }, 10000);
    
    // Inicializar botones de certificación
    initCertificationButtons();
}

// Mostrar pop-up de certificación
function showCertificationPopup() {
    const popup = document.getElementById('certification-popup');
    if (popup) {
        popup.classList.add('show');
        
        // Efecto de entrada
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.visibility = 'visible';
        }, 100);
    }
}

// Ocultar pop-up de certificación
function hideCertificationPopup() {
    const popup = document.getElementById('certification-popup');
    if (popup) {
        popup.classList.remove('show');
        popup.style.opacity = '0';
        popup.style.visibility = 'hidden';
    }
}

// Inicializar botones de certificación
function initCertificationButtons() {
    // Botones del pop-up
    const popupStartBtn = document.querySelector('.popup-start-btn');
    const popupLaterBtn = document.querySelector('.popup-later-btn');
    
    // Botón de la sección de certificación
    const certStartBtn = document.querySelector('.cert-start-btn');
    
    if (popupStartBtn) {
        popupStartBtn.addEventListener('click', function() {
            hideCertificationPopup();
            startTrivia();
        });
    }
    
    if (popupLaterBtn) {
        popupLaterBtn.addEventListener('click', function() {
            hideCertificationPopup();
        });
    }
    
    if (certStartBtn) {
        certStartBtn.addEventListener('click', function() {
            startTrivia();
        });
    }
}

// Preguntas de la trivia
const triviaQuestions = [
    {
        question: "¿Cuál es el símbolo universal del reciclaje?",
        options: [
            "Un círculo con tres flechas",
            "Un triángulo verde",
            "Una hoja de árbol",
            "Un corazón verde"
        ],
        correct: 0,
        explanation: "El símbolo universal del reciclaje es un círculo con tres flechas que representan reducir, reutilizar y reciclar."
    },
    {
        question: "¿Qué número de plástico es más fácil de reciclar?",
        options: [
            "Número 1 (PET)",
            "Número 3 (PVC)",
            "Número 6 (PS)",
            "Número 7 (Otros)"
        ],
        correct: 0,
        explanation: "El plástico número 1 (PET) es el más fácil de reciclar y se usa comúnmente en botellas de agua."
    },
    {
        question: "¿Se debe lavar los envases antes de reciclarlos?",
        options: [
            "Sí, siempre",
            "No, no es necesario",
            "Solo si están muy sucios",
            "Solo los de vidrio"
        ],
        correct: 0,
        explanation: "Sí, es importante lavar los envases antes de reciclarlos para evitar contaminar el proceso de reciclaje."
    },
    {
        question: "¿Cuánto tiempo tarda en degradarse una botella de plástico?",
        options: [
            "450 años",
            "50 años",
            "10 años",
            "2 años"
        ],
        correct: 0,
        explanation: "Una botella de plástico puede tardar hasta 450 años en degradarse completamente en el medio ambiente."
    },
    {
        question: "¿Qué materiales NO se pueden reciclar juntos?",
        options: [
            "Vidrio y metal",
            "Papel y cartón",
            "Plástico y vidrio",
            "Todos se pueden mezclar"
        ],
        correct: 2,
        explanation: "El plástico y el vidrio no se pueden reciclar juntos porque requieren procesos diferentes de reciclaje."
    },
    {
        question: "¿Cuál es la regla de las 3 R's?",
        options: [
            "Reducir, Reutilizar, Reciclar",
            "Recoger, Revisar, Reciclar",
            "Reutilizar, Reducir, Revisar",
            "Reciclar, Reducir, Revisar"
        ],
        correct: 0,
        explanation: "Las 3 R's son: Reducir (consumir menos), Reutilizar (dar segunda vida) y Reciclar (procesar materiales)."
    },
    {
        question: "¿Se pueden reciclar las bolsas de plástico en el contenedor normal?",
        options: [
            "Sí, siempre",
            "No, van en contenedores especiales",
            "Solo las transparentes",
            "Solo las de color"
        ],
        correct: 1,
        explanation: "Las bolsas de plástico no van en el contenedor normal porque pueden dañar las máquinas de reciclaje. Van en contenedores especiales."
    },
    {
        question: "¿Cuánta energía se ahorra reciclando una lata de aluminio?",
        options: [
            "95%",
            "50%",
            "25%",
            "10%"
        ],
        correct: 0,
        explanation: "Reciclar una lata de aluminio ahorra hasta 95% de la energía necesaria para producir una nueva."
    },
    {
        question: "¿Qué tipo de papel NO se puede reciclar?",
        options: [
            "Periódicos",
            "Revistas",
            "Papel encerado",
            "Cajas de cartón"
        ],
        correct: 2,
        explanation: "El papel encerado no se puede reciclar debido a su recubrimiento de cera que contamina el proceso."
    },
    {
        question: "¿Cuántos árboles se salvan reciclando una tonelada de papel?",
        options: [
            "17 árboles",
            "5 árboles",
            "50 árboles",
            "100 árboles"
        ],
        correct: 0,
        explanation: "Reciclar una tonelada de papel salva aproximadamente 17 árboles y reduce significativamente las emisiones de CO2."
    }
];

// Variables del sistema de trivia
let currentQuestion = 0;
let userAnswers = [];
let triviaStarted = false;

// Iniciar trivia
function startTrivia() {
    currentQuestion = 0;
    userAnswers = [];
    triviaStarted = true;
    
    const modal = document.getElementById('trivia-modal');
    if (modal) {
        modal.classList.add('show');
        showQuestion();
    }
}

// Mostrar pregunta actual
function showQuestion() {
    const question = triviaQuestions[currentQuestion];
    const questionElement = document.getElementById('trivia-question');
    const optionsElement = document.getElementById('trivia-options');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const nextBtn = document.getElementById('trivia-next');
    const skipBtn = document.getElementById('trivia-skip');
    
    if (!questionElement || !optionsElement) return;
    
    // Actualizar progreso
    const progress = ((currentQuestion + 1) / triviaQuestions.length) * 100;
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    if (progressText) {
        progressText.textContent = `Pregunta ${currentQuestion + 1} de ${triviaQuestions.length}`;
    }
    
    // Mostrar pregunta
    questionElement.innerHTML = `
        <div class="question-text">${question.question}</div>
    `;
    
    // Mostrar opciones
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    
    // Ocultar botones de navegación
    if (nextBtn) nextBtn.style.display = 'none';
    if (skipBtn) skipBtn.style.display = 'none';
}

// Seleccionar opción
function selectOption(optionIndex) {
    const options = document.querySelectorAll('.option-button');
    const question = triviaQuestions[currentQuestion];
    
    // Remover selección anterior
    options.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Marcar opción seleccionada
    options[optionIndex].classList.add('selected');
    
    // Guardar respuesta
    userAnswers[currentQuestion] = optionIndex;
    
    // Mostrar botón siguiente
    const nextBtn = document.getElementById('trivia-next');
    if (nextBtn) {
        nextBtn.style.display = 'inline-flex';
        nextBtn.onclick = () => nextQuestion();
    }
}

// Siguiente pregunta
function nextQuestion() {
    if (currentQuestion < triviaQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        finishTrivia();
    }
}

// Finalizar trivia
function finishTrivia() {
    const modal = document.getElementById('trivia-modal');
    const resultsModal = document.getElementById('results-modal');
    
    if (modal) modal.classList.remove('show');
    if (resultsModal) {
        resultsModal.classList.add('show');
        showResults();
    }
}

// Mostrar resultados
function showResults() {
    const correctAnswers = userAnswers.filter((answer, index) => 
        answer === triviaQuestions[index].correct
    ).length;
    
    const totalQuestions = triviaQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const resultsContent = document.getElementById('results-content');
    const downloadBtn = document.getElementById('download-certificate');
    const resultsModal = document.getElementById('results-modal');
    
    if (!resultsContent) return;
    
    // Determinar nivel de rendimiento
    let level, message, iconClass, scoreClass;
    
    if (correctAnswers >= 9) {
        level = "¡Excelente!";
        message = "¡Felicitaciones! Has demostrado un conocimiento excepcional sobre reciclaje. Eres un verdadero defensor del medio ambiente.";
        iconClass = "fas fa-trophy";
        scoreClass = "excellent";
    } else if (correctAnswers >= 7) {
        level = "¡Muy bien!";
        message = "¡Buen trabajo! Tienes un buen conocimiento sobre reciclaje. Con un poco más de práctica, serás un experto.";
        iconClass = "fas fa-star";
        scoreClass = "good";
    } else if (correctAnswers >= 5) {
        level = "Regular";
        message = "Tienes algunos conocimientos básicos, pero hay mucho por aprender. Te recomendamos revisar las guías de reciclaje.";
        iconClass = "fas fa-exclamation-triangle";
        scoreClass = "average";
    } else {
        level = "Necesitas mejorar";
        message = "Es importante que aprendas más sobre reciclaje para ayudar al medio ambiente. ¡No te desanimes, todos empezamos así!";
        iconClass = "fas fa-book";
        scoreClass = "poor";
    }
    
    resultsContent.innerHTML = `
        <div class="results-icon ${scoreClass}">
            <i class="${iconClass}"></i>
        </div>
        <h3 class="results-title">${level}</h3>
        <div class="results-score ${scoreClass}">${correctAnswers}/${totalQuestions} (${percentage}%)</div>
        <p class="results-message">${message}</p>
        ${correctAnswers >= 9 ? `
            <div class="certificate-preview">
                <h4><i class="fas fa-certificate"></i> ¡Certificado Disponible!</h4>
                <p>Has aprobado con excelencia. Descarga tu certificado oficial de reciclaje responsable.</p>
            </div>
        ` : ''}
    `;
    
    // Configurar botón de descarga de certificado (solo si tiene 9+ puntos)
    if (downloadBtn) {
        if (correctAnswers >= 9) {
            downloadBtn.style.display = 'inline-flex';
            downloadBtn.onclick = () => downloadCertificate(correctAnswers, percentage);
        } else {
            downloadBtn.style.display = 'none';
        }
    }
    
    // Configurar botones de navegación
    const retakeBtn = document.getElementById('retake-exam');
    const closeBtn = document.getElementById('close-results');
    
    if (retakeBtn) {
        retakeBtn.onclick = function() {
            if (resultsModal) {
                resultsModal.classList.remove('show');
            }
            // Reiniciar el sistema de trivia
            currentQuestion = 0;
            userAnswers = [];
            triviaStarted = false;
            startTrivia();
        };
    }
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            if (resultsModal) {
                resultsModal.classList.remove('show');
            }
        };
    }
}

// Generar y descargar certificado
function downloadCertificate(score, percentage) {
    const userName = prompt("Por favor, ingresa tu nombre para el certificado:");
    if (!userName) return;
    
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Crear contenido del certificado
    const certificateContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificado de Reciclaje - ${userName}</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 40px;
                    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                    min-height: 100vh;
                }
                .certificate {
                    background: white;
                    border: 8px solid #22c55e;
                    border-radius: 20px;
                    padding: 60px;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(34, 197, 94, 0.2);
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                }
                .certificate::before {
                    content: '';
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 2px solid #22c55e;
                    border-radius: 15px;
                    pointer-events: none;
                }
                .logo {
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #22c55e, #16a34a);
                    border-radius: 50%;
                    margin: 0 auto 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 3rem;
                    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
                }
                .title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #22c55e;
                    margin-bottom: 20px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                }
                .subtitle {
                    font-size: 1.2rem;
                    color: #666;
                    margin-bottom: 40px;
                }
                .name {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
                    border-radius: 15px;
                    border: 2px solid #22c55e;
                }
                .achievement {
                    font-size: 1.3rem;
                    color: #22c55e;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                .score {
                    font-size: 1.1rem;
                    color: #666;
                    margin-bottom: 40px;
                }
                .date {
                    font-size: 1rem;
                    color: #999;
                    margin-bottom: 30px;
                }
                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #e5e7eb;
                }
                .signature {
                    text-align: center;
                }
                .signature-line {
                    width: 200px;
                    height: 2px;
                    background: #22c55e;
                    margin: 10px auto;
                }
                .certificate-number {
                    font-size: 0.9rem;
                    color: #999;
                    font-family: monospace;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="logo">🌱</div>
                <h1 class="title">Certificado de Reciclaje</h1>
                <p class="subtitle">Certificación en Reciclaje Responsable</p>
                
                <div class="name">${userName}</div>
                
                <div class="achievement">¡Felicitaciones por tu excelente desempeño!</div>
                <div class="score">Puntuación: ${score}/10 (${percentage}%)</div>
                <div class="date">Fecha de certificación: ${currentDate}</div>
                
                <p style="font-size: 1.1rem; color: #666; line-height: 1.6; margin: 30px 0;">
                    Este certificado reconoce el compromiso de <strong>${userName}</strong> con el medio ambiente 
                    y su conocimiento demostrado en las mejores prácticas de reciclaje. 
                    Has demostrado ser un verdadero defensor de la sostenibilidad.
                </p>
                
                <div class="footer">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <div>Grennity Team</div>
                        <div style="font-size: 0.9rem; color: #666;">Organización de Sostenibilidad</div>
                    </div>
                    <div class="certificate-number">
                        Cert. #${Date.now().toString().slice(-8)}
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Crear y descargar archivo
    const blob = new Blob([certificateContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_Reciclaje_${userName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Mostrar mensaje de éxito
    alert('¡Certificado descargado exitosamente! Revisa tu carpeta de descargas.');
}

// Cerrar modales
document.addEventListener('click', function(e) {
    // Cerrar modal al hacer clic en el overlay
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
    
    // Cerrar modal de trivia con el botón X
    if (e.target.id === 'close-trivia' || e.target.closest('#close-trivia')) {
        const triviaModal = document.getElementById('trivia-modal');
        if (triviaModal) {
            triviaModal.classList.remove('show');
        }
    }
    
    // Cerrar pop-up de certificación al hacer clic en el overlay
    if (e.target.id === 'certification-popup') {
        hideCertificationPopup();
    }
});

console.log('Grennity - Página Educativa cargada correctamente con todas las funcionalidades');
