// JavaScript para funcionalidad de la página configuración

document.addEventListener('DOMContentLoaded', function() {
    console.log('Página Configuración cargada');
    
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
                        window.location.href = '/index.html';
                        break;
                    case 'Mapa':
                        window.location.href = '/pages/Mapa.html';
                        break;
                    case 'Educativo':
                        showNotification('Sección Educativo - Próximamente disponible', 'info');
                        break;
                    case 'Sugerir Punto':
                        showNotification('Sección Sugerir Punto - Próximamente disponible', 'info');
                        break;
                    case 'Contacto':
                        showNotification('Sección Contacto - Próximamente disponible', 'info');
                        break;
                    case 'Configuración':
                        // Ya estamos en la página configuración
                        break;
                }
            }
            // Si tiene href válido, permitir navegación normal
        });
    });

    // Funcionalidad del slider de radio de búsqueda
    const searchRadiusSlider = document.getElementById('search-radius');
    const sliderValue = document.querySelector('.slider-value');
    
    if (searchRadiusSlider && sliderValue) {
        searchRadiusSlider.addEventListener('input', function() {
            const value = this.value;
            sliderValue.textContent = value + ' km';
            
            // Animación del valor
            sliderValue.style.transform = 'scale(1.1)';
            sliderValue.style.color = '#22c55e';
            
            setTimeout(() => {
                sliderValue.style.transform = 'scale(1)';
            }, 200);
        });
    }

    // Funcionalidad de los toggle switches
    const toggleSwitches = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const toggleItem = this.closest('.toggle-item');
            if (toggleItem) {
                // Animación de feedback visual
                toggleItem.style.transform = 'scale(1.02)';
                toggleItem.style.backgroundColor = this.checked ? '#f0fdf4' : '#f8fafc';
                
                setTimeout(() => {
                    toggleItem.style.transform = 'scale(1)';
                }, 200);
            }
            
            // Mostrar notificación de cambio
            const label = toggleItem ? toggleItem.querySelector('span').textContent : 'Configuración';
            const status = this.checked ? 'activada' : 'desactivada';
            showNotification(`${label} ${status}`, 'success');
        });
    });

    // Funcionalidad de los selects personalizados
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#22c55e';
                this.style.backgroundColor = '#f0fdf4';
                
                // Animación de confirmación
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                const label = this.previousElementSibling ? this.previousElementSibling.textContent : 'Configuración';
                showNotification(`${label} actualizada`, 'success');
            }
        });
    });

    // Funcionalidad del botón Guardar cambios
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // Animación del botón
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.innerHTML = '<i class="fas fa-check"></i> ¡Guardado!';
                this.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
                
                showNotification('Configuración guardada exitosamente', 'success');
                
                // Resetear botón después de 2 segundos
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-save"></i> Guardar cambios';
                    this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                }, 2000);
            }, 1500);
        });
    }

    // Funcionalidad de los botones de seguridad
    const securityBtns = document.querySelectorAll('.security-btn');
    securityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action.includes('Eliminar cuenta')) {
                if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
                    showNotification('Funcionalidad de eliminación de cuenta próximamente disponible', 'warning');
                }
            } else if (action.includes('Exportar datos')) {
                showNotification('Exportando datos... - Funcionalidad próximamente disponible', 'info');
            } else if (action.includes('Cambiar contraseña')) {
                showNotification('Funcionalidad de cambio de contraseña próximamente disponible', 'info');
            }
        });
    });

    // Funcionalidad del botón Editar Perfil
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showNotification('Funcionalidad de edición de perfil próximamente disponible', 'info');
        });
    }

    // Funcionalidad de los enlaces de privacidad
    const privacyLinks = document.querySelectorAll('.privacy-link');
    privacyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            showNotification(`${linkText} - Próximamente disponible`, 'info');
        });
    });

    // Animaciones de entrada para las secciones
    const sections = document.querySelectorAll('.config-section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Efectos hover mejorados para elementos interactivos
    const interactiveElements = document.querySelectorAll('.toggle-item, .feature-item, .stat-item, .security-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Cargar configuraciones guardadas (simulado)
    loadSavedSettings();
});

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #22c55e, #16a34a)',
        'error': 'linear-gradient(135deg, #ef4444, #dc2626)',
        'warning': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'info': 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    return colors[type] || colors['info'];
}

// Función para cargar configuraciones guardadas (simulado)
function loadSavedSettings() {
    // Simular carga de configuraciones desde localStorage
    const savedSettings = {
        defaultLocation: 'Palermo, Buenos Aires',
        searchRadius: 5,
        autoLocation: false,
        rememberFavorites: false,
        pushNotifications: false,
        emailNotifications: false,
        appTheme: '',
        compactView: false,
        showTips: false,
        autoUpdate: false,
        language: '',
        mapStyle: '',
        usageAnalysis: false,
        locationData: false,
        functionalCookies: false
    };
    
    // Aplicar configuraciones guardadas
    const defaultLocationInput = document.getElementById('default-location');
    if (defaultLocationInput) {
        defaultLocationInput.value = savedSettings.defaultLocation;
    }
    
    const searchRadiusSlider = document.getElementById('search-radius');
    const sliderValue = document.querySelector('.slider-value');
    if (searchRadiusSlider && sliderValue) {
        searchRadiusSlider.value = savedSettings.searchRadius;
        sliderValue.textContent = savedSettings.searchRadius + ' km';
    }
    
    // Aplicar estados de toggles
    const toggleIds = [
        'auto-location', 'remember-favorites', 'push-notifications', 
        'email-notifications', 'compact-view', 'show-tips', 'auto-update',
        'usage-analysis', 'location-data', 'functional-cookies'
    ];
    
    toggleIds.forEach(id => {
        const toggle = document.getElementById(id);
        if (toggle) {
            const settingKey = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            toggle.checked = savedSettings[settingKey] || false;
        }
    });
    
    // Aplicar selects
    const selectIds = ['app-theme', 'language', 'map-style'];
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const settingKey = id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            select.value = savedSettings[settingKey] || '';
        }
    });
}
