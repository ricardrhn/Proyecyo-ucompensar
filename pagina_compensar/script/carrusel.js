document.addEventListener('DOMContentLoaded', function() {
    // Verificar que los elementos existan
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicadores = document.querySelectorAll('.indicador');
    
    // Si no hay elementos del carrusel, salir
    if (!carrusel || slides.length === 0) {
        console.log('No se encontraron elementos del carrusel');
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    console.log('Carrusel inicializado con', totalSlides, 'slides de solo imágenes');
    
    // Función para actualizar el carrusel
    function updateCarrusel() {
        const translateX = -currentIndex * 100;
        carrusel.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores
        indicadores.forEach((indicador, index) => {
            indicador.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Función para ir al slide siguiente
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrusel();
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarrusel();
    }
    
    // Función para ir a un slide específico
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentIndex = index;
            updateCarrusel();
        }
    }
    
    // Iniciar auto-play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4000); // Más rápido para solo imágenes
    }
    
    // Detener auto-play
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Event listeners para indicadores
    indicadores.forEach(indicador => {
        indicador.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Pausar auto-play al hacer hover en el carrusel
    const carruselContainer = document.querySelector('.carrusel-container');
    if (carruselContainer) {
        carruselContainer.addEventListener('mouseenter', stopAutoPlay);
        carruselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Inicializar posición
    updateCarrusel();
    
    // Iniciar auto-play después de 1 segundo
    setTimeout(() => {
        startAutoPlay();
    }, 1000);
    
    // Para debugging
    window.carruselDebug = {
        next: nextSlide,
        prev: prevSlide,
        goTo: goToSlide,
        current: () => currentIndex
    };
});