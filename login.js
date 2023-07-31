// Obtener los elementos del formulario
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); //Prevenir que el usuario envíe sin información

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Aquí están las credenciales ingresadas
    
    // Verificación simple
    if (username === 'admin' && password === '12345') {
      alert('Te has verificado correctamente, te has verificado correctamente');
      // Credenciales correctas, dirige al usuario a otra página
      window.location.href = 'home.html';
    } else {
      // Credenciales incorrectas, muestra un mensaje de error
      alert('Usuario o contraseña incorrectos. Por favor, inténtalo nuevamente.');
    }
  });
