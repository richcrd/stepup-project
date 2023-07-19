const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.querySelector('.navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// Agregar event listeners para los enlaces de la barra de navegación
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Obtener el ID del elemento al que se debe desplazar
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Cerrar la barra de navegación después de un breve retraso
    setTimeout(() => {
      nav.classList.remove('active');
    }, 300);

    // Desplazarse a la sección correspondiente
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});