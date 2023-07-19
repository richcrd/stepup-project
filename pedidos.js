// Función para enviar el pedido a través de WhatsApp
function submitOrder(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var products = document.getElementById('products').value;
    
    // Validar los datos
    if (!name || !email || !products) {
      alert('Por favor, complete todos los campos del formulario.');
      return;
    }
    
    // Enviar el pedido a través de la API de mensajería de WhatsApp
    var message = 'Nuevo pedido:\n\nNombre: ' + name + '\nCorreo electrónico: ' + email + '\nProductos:\n' + products;
    var encodedMessage = encodeURIComponent(message);
    var whatsappURL = 'https://api.whatsapp.com/send?text=' + encodedMessage;
    
    window.open(whatsappURL, '_blank');
    
    // Limpiar el formulario
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('products').value = '';
  }
  