// Filtrar productos según la categoría seleccionada
document.getElementById('category').addEventListener('change', function() {
    var category = this.value;
    var products = document.getElementsByClassName('product');
  
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if (category === 'todos' || product.classList.contains(category)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    }
  });
  
  