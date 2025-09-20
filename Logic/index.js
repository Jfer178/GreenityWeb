// JavaScript para funcionalidad interactiva de la página

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del botón de búsqueda
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Buscando: "${searchTerm}" - Esta funcionalidad se implementará próximamente`);
            } else {
                alert('Por favor, ingresa una dirección o código postal');
            }
        });
        
        // Permitir búsqueda con Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Funcionalidad del botón de ubicación actual
    const locationBtn = document.querySelector('.location-btn');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        alert(`Ubicación obtenida: ${lat.toFixed(4)}, ${lng.toFixed(4)} - Buscando puntos de reciclaje cercanos...`);
                    },
                    function(error) {
                        alert('No se pudo obtener tu ubicación. Por favor, ingresa tu dirección manualmente.');
                    }
                );
            } else {
                alert('Tu navegador no soporta geolocalización. Por favor, ingresa tu dirección manualmente.');
            }
        });
    }
    
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
    
    // Funcionalidad de navegación
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
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        break;
                    case 'Mapa':
                        // Permitir navegación normal al mapa
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        alert('Sección Educativo - Próximamente disponible');
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
    
    // Funcionalidad de los botones CTA
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (text.includes('Explorar Mapa')) {
                // Navegar al mapa
                window.location.href = '/pages/Mapa.html';
            } else if (text.includes('Aprender Más')) {
                alert('Sección educativa - Próximamente disponible');
            }
        });
    });
    
    // Funcionalidad del enlace "Ver mapa completo"
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', function(e) {
            // Permitir navegación normal al mapa
            window.location.href = '/pages/Mapa.html';
        });
    }
    
    // Funcionalidad de las tarjetas de características
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.feature-title').textContent;
            alert(`Característica: ${title} - Próximamente disponible`);
        });
    });
    
    // Funcionalidad de las tarjetas de estadísticas
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            const number = this.querySelector('.stat-number').textContent;
            const label = this.querySelector('.stat-label').textContent;
            alert(`Estadística: ${number} ${label} - Información detallada próximamente`);
        });
    });
    
    // Efecto de scroll suave para enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de entrada para las tarjetas
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
    const animatedElements = document.querySelectorAll('.stat-card, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efecto de hover mejorado para botones
    const buttons = document.querySelectorAll('button, .nav-item, .cta-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Grennity - Página de reciclaje cargada correctamente');
});
