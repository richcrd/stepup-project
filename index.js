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

// Esto es para enlaces de la barra de navegación
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Obtener el ID del elemento al que se debe desplazar
    const targetId = link.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // Aqui cierra la barra de navegación después de un breve retraso
    setTimeout(() => {
      nav.classList.remove('active');
    }, 300);

    // Desplaza a la sección correspondiente
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Carrito

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Abrir carrito
cartIcon.onclick = () => {
  cart.classList.add("active");
};

// Cerrar carrito
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Función del Carrito
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

//  Haciendo la funcion 

function ready(){
  // Remover items del carrito
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Cambios de Cantidad
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Anadir al carrito 
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener("click", addCartClicked);
  }
  // Boton de comprar
  document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click", buyButtonClicked);
}

// Boton Comprar

function buyButtonClicked() {
  alert("Tu pedido esta hecho");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()){
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

// Remover items del carrito
function removeCartItem(event){
  var buttonClicked = event.target 
  buttonClicked.parentElement.remove()
  updatetotal();
}

// Cambios De Cantidad
function quantityChanged(event){
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  updatetotal()
}
// Anadir al carrito
function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg){
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  // Verifica si el producto ya está en el carrito
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText === title) {
      alert("Ya has añadido este objeto al carrito");
      return;
    }
  }

  // Crea el elemento del carrito
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- remove -->
    <i class='bx bxs-trash-alt cart-remove'></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  // Agregar eventos a los botones del carrito
  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}



//  Actualiza Total

function updatetotal(){
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity); 
  }
  // Si el precio contiene algunos centavos de valor
  total = Math.round(total *100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}


// Filtrado de Productos

document.addEventListener("DOMContentLoaded", function () {
  const allCategoryButton = document.getElementById("all-category");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const subcategoryButtons = document.querySelectorAll(".subcategory-btn");
  const productItems = document.querySelectorAll(".product-item");

  function showAllProducts() {
    productItems.forEach((item) => {
      item.style.display = "block";
    });
  }

  function filterProducts(category, subcategory) {
    productItems.forEach((item) => {
      const dataCategory = item.getAttribute("data-category");
      const dataSubcategory = item.getAttribute("data-subcategory");

      if (
        (category === "all" || dataCategory === category) &&
        (subcategory === "all" || dataSubcategory === subcategory) ||
        (!dataCategory && !dataSubcategory)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function setActiveButton(buttons, selectedButton) {
    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
    selectedButton.classList.add("active");
  }

  // Event listener para el botón "Todos"
  allCategoryButton.addEventListener("click", function () {
    showAllProducts();
    setActiveButton(categoryButtons, this);
  });

  // Event listeners para botones de categoría y subcategoría
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      const subcategory = "all";
      filterProducts(category, subcategory);
      setActiveButton(categoryButtons, this);
    });
  });

  subcategoryButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      const subcategory = this.getAttribute("data-subcategory");
      filterProducts(category, subcategory);
      setActiveButton(subcategoryButtons, this);

      // Esto permitirá que al seleccionar una subcategoría se muestren los productos de esa subcategoría dentro de la categoría principal
      categoryButtons.forEach((btn) => {
        if (btn.getAttribute("data-category") === category) {
          setActiveButton(categoryButtons, btn);
        }
      });
    });
  });
});

// Obtiene el botón de "Registrarse" por su ID
const registerButton = document.getElementById('registerButton');

// Agregar el evento de clic al botón
registerButton.addEventListener('click', () => {
  // Mostrar la alerta con el mensaje
  alert('Hemos verificado tu correo electrónico, revisa tu bandeja');
});





